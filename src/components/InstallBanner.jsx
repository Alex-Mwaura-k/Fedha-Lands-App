import { useState, useEffect } from "react";

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Check if user is on iOS (iPhone/iPad)
    const isIosDevice = /iPhone|iPad|iPod/.test(navigator.userAgent);
    setIsIOS(isIosDevice);

    // 2. Listen for the Android/Desktop 'install' event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true); // Show banner when browser says "Ready to install"
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 3. FALLBACK: If the event doesn't fire (like on iOS), show banner anyway after 3 seconds
    const timer = setTimeout(() => {
      // Only show if we haven't already dismissed it
      const hasDismissed = localStorage.getItem("pwaBannerDismissed");
      if (!hasDismissed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    // A. ANDROID/CHROME: Use the native prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      setDeferredPrompt(null);
      setIsVisible(false);
    }
    // B. iOS: Show instructions (iOS doesn't allow programatic install)
    else if (isIOS) {
      alert(
        "To install on iPhone:\n1. Tap the 'Share' button below 🛫\n2. Select 'Add to Home Screen' ➕"
      );
    }
    // C. DESKTOP/OTHER: Just dismiss
    else {
      alert("To install, look for the (+) icon in your browser address bar.");
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember the user's choice so we don't annoy them
    localStorage.setItem("pwaBannerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="install-card" id="install-banner">
      <div className="install-buttons">
        <button id="install-btn" onClick={handleInstallClick}>
          Install App
        </button>
        <button id="dismiss-btn" onClick={handleDismiss}>
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default InstallBanner;
