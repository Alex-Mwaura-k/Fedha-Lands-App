import { useState, useEffect } from "react";

const InstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. CHECK IF ALREADY INSTALLED
    // If the app is already running in standalone mode (installed), do not show the banner.
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    if (isStandalone) {
      return;
    }

    // 2. CHECK 5-MINUTE COOLDOWN
    const dismissedTime = localStorage.getItem("pwaDismissTimestamp");
    if (dismissedTime) {
      const timePassed = Date.now() - parseInt(dismissedTime, 10);
      const fiveMinutes = 2 * 60 * 1000; // 5 minutes in milliseconds

      if (timePassed < fiveMinutes) {
        return; // Stop here if it hasn't been 5 minutes
      }
    }

    // 3. DETECT IOS (iPhones need special handling)
    const isDeviceIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    setIsIOS(isDeviceIOS);

    // 4. LISTEN FOR INSTALL EVENT (PC / Android)
    // This is the critical part. We ONLY show the banner when Chrome/Edge fires this event.
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // NOW we show the button. Since we have the event ('e'), the install WILL work.
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. IOS FALLBACK
    // iOS never fires the event above, so we use a timer ONLY for iOS.
    let iosTimer;
    if (isDeviceIOS) {
      iosTimer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    // A. PC & ANDROID: Trigger the native prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);

      // We can only use the prompt once
      setDeferredPrompt(null);
      setIsVisible(false);
    }
    // B. iOS: Show instructions
    else if (isIOS) {
      alert(
        "To install on iPhone:\n1. Tap the 'Share' button below 🛫\n2. Select 'Add to Home Screen' ➕"
      );
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Save the current time. The banner won't show again for 5 minutes.
    localStorage.setItem("pwaDismissTimestamp", Date.now().toString());
  };

  if (!isVisible) return null;

  return (
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
