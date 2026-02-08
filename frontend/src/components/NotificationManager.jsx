import { useEffect } from "react";

// ⚠️ YOUR SPECIFIC PUBLIC KEY
const VAPID_PUBLIC_KEY =
  "BId4sFnWWyommzc--8xia05Y18OpmBuQ1iPoDlW7UNIVj6b23rAm_K9vxquSja-6_mPa-_Ea2EDVS1Mpjx3hbsk";

// ✅ UPDATED: Centralized URL logic for production deployment
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// --- HELPERS ---

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Advanced Device Fingerprinting
function getDeviceDetails() {
  const userAgent = navigator.userAgent;

  // 1. Detect Browser
  let browser = "Unknown Browser";
  if (userAgent.match(/chrome|chromium|crios/i)) browser = "Chrome";
  else if (userAgent.match(/firefox|fxios/i)) browser = "Firefox";
  else if (userAgent.match(/safari/i)) browser = "Safari";
  else if (userAgent.match(/opr\//i)) browser = "Opera";
  else if (userAgent.match(/edg/i)) browser = "Edge";

  // 2. Detect OS (Operating System)
  let os = "Unknown OS";
  if (userAgent.indexOf("Win") !== -1) os = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (userAgent.indexOf("Android") !== -1) os = "Android";
  else if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

  // 3. Detect Screen Resolution
  const screenRes = `${window.screen.width}x${window.screen.height}`;

  // 4. Detect Timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Combine into one string
  return `${browser} (${os}) | ${screenRes} | ${timezone}`;
}

const NotificationManager = () => {
  useEffect(() => {
    const initSubscription = async () => {
      // 🛑 PWA CHECK: Only ask if installed (Standalone)
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      if (!isStandalone) {
        return;
      }

      // 1. Feature Check
      if (!("Notification" in window) || !("serviceWorker" in navigator)) {
        return;
      }

      // 2. Permission Check
      let permission = Notification.permission;
      if (permission === "default") {
        permission = await Notification.requestPermission();
      }

      if (permission === "granted") {
        // 3. Optimization: Check if already synced
        const alreadySynced = localStorage.getItem("push_notification_synced");
        if (alreadySynced === "true") {
          return;
        }

        subscribeUserToDjango();
      }
    };

    const subscribeUserToDjango = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        // Prepare clean data
        const subData = subscription.toJSON();
        const cleanSubscription = {
          endpoint: subData.endpoint,
          keys: subData.keys,
        };

        // Capture device data
        const deviceInfo = getDeviceDetails();

        // Send to backend (Uses dynamic BACKEND_URL)
        const response = await fetch(
          `${BACKEND_URL}/webpush/save_information`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status_type: "subscribe",
              subscription: cleanSubscription,
              browser: deviceInfo,
              group: "all",
            }),
          },
        );

        if (response.ok) {
          console.log("✅ Subscribed successfully:", deviceInfo);
          localStorage.setItem("push_notification_synced", "true");
        } else {
          console.warn("⚠️ Push Server Error:", response.status);
          localStorage.removeItem("push_notification_synced");
        }
      } catch (error) {
        console.error("❌ Push Subscription Error:", error);
      }
    };

    initSubscription();
  }, []);

  return null;
};

export default NotificationManager;
