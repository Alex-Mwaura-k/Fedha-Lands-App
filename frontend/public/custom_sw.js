// public/custom_sw.js

self.addEventListener("push", function (event) {
  // 1. Receive the data from Django
  // We use .json() because Django is sending a JSON string now
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.log("Push parse error, using text", e);
      data = {
        head: "Fedha Update",
        body: event.data.text(),
        url: "/",
      };
    }
  }

  // 2. Define the Popup details
  const head = data.head || "Fedha Land Ventures";
  const body = data.body || "New Update Available";
  const icon = data.icon || "/static/images/fedha-logo-192.png";
  const url = data.url || "/";

  // 3. Show the Notification (The "Pop Up")
  event.waitUntil(
    self.registration.showNotification(head, {
      body: body,
      icon: icon,
      badge: "/static/images/fedha-badge-72.png",
      data: { url: url }, // Store URL to click later
    })
  );
});

// 4. Handle Click (Open the App)
self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Close the popup

  const urlToOpen = event.notification.data.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // If a tab is already open, focus it
        for (let client of windowClients) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // Otherwise, open a new tab
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
