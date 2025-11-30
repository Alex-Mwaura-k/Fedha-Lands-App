import { useState, useEffect } from "react";

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIosDevice = /iPhone|iPad|iPod/.test(navigator.userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const timer = setTimeout(() => {
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
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      setDeferredPrompt(null);
      setIsVisible(false);
    } else if (isIOS) {
      alert(
        "To install on iPhone:\n1. Tap the 'Share' button below 🛫\n2. Select 'Add to Home Screen' ➕"
      );
    } else {
      alert("To install, look for the (+) icon in your browser address bar.");
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("pwaBannerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    // WRAPPER: This aligns the component with the 1300px grid
    <div className="install-banner-wrapper">
      <div className="container-md d-flex justify-content-end">
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
      </div>
    </div>
  );
};

export default InstallBanner;
