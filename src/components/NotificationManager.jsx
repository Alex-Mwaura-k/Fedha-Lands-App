import { useEffect } from "react";

const NotificationManager = () => {
  useEffect(() => {
    // 1. Check if the browser supports notifications
    if (!("Notification" in window)) {
      return;
    }

    // 2. CHECK IF INSTALLED (Standalone Mode)
    // This ensures the prompt ONLY appears if the user has installed the PWA
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const isIOSStandalone = window.navigator.standalone === true; // For older iOS

    // If not installed, stop here. Do not ask for permission.
    if (!isStandalone && !isIOSStandalone) {
      console.log("App not installed.");
      return;
    }

    // 3. Check current permission status
    if (Notification.permission === "default") {
      // Ask only if the app is installed
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("User accepted notifications!");

          // Optional: Send a welcome test notification
          new Notification("Welcome to Fedha Land!", {
            body: "You will now receive alerts for new properties directly on your phone.",
            icon: "/icons/icon.png",
          });
        }
      });
    }
  }, []);

  return null;
};

export default NotificationManager;
