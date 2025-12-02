// FILE: /sw.js

const CACHE_NAME = "fedha-static-v1";

// 1. ASSET LIST
// I have updated this list to match the files linked in your HTML.
// Note: I included the Bootstrap CDN links so the app keeps its style offline.
const assets = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/script.js",
  "/js/functional.js",
  "/manifest.json",
  "/icons/favicon.ico",
  "/icons/icon.png",
  "/icons/logo.png",
  // Carousel Images (Essential for the homepage look)
  "/img/carousels/slide_1.webp",
  "/img/carousels/slide_2.webp",
  "/img/carousels/slide_3.webp",
  // External Libraries (Bootstrap) - Cached so styling doesn't break offline
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js",
];

// 2. INSTALL EVENT
// This runs once when the browser detects a new service worker.
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Installed");
  // Skip waiting allows the new SW to take over immediately
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching all files");
      return Promise.all(
        assets.map((url) => {
          return cache.add(url).catch((err) => {
            // This helps us identify exactly which file path is wrong if caching fails
            console.warn("[Service Worker] Failed to cache:", url, err);
          });
        })
      );
    })
  );
});

// 3. ACTIVATE EVENT
// This runs after the SW is installed. We use it to clean up old caches.
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activated");
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          // If the cache name doesn't match the current one, delete it.
          if (key !== CACHE_NAME && key.startsWith("fedha-")) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // Takes control of the clients immediately so you don't have to refresh twice
  return self.clients.claim();
});

// 4. FETCH EVENT (Stale-While-Revalidate Strategy)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // A. Create a network request to update the cache in the background
      const networkFetch = fetch(e.request)
        .then((networkResponse) => {
          // Clone the response because it can only be consumed once
          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Update the cache with the fresh file from the server
            cache.put(e.request, responseClone);
          });

          return networkResponse;
        })
        .catch((err) => console.log("Network fetch failed", err));

      // B. Return the cached response immediately if we have it (Speed!)
      //    If not, return the network response (First time load)
      return cachedResponse || networkFetch;
    })
  );
});
