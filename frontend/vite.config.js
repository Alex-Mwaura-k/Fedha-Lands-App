import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto", // "auto" is usually safer than "inline"

      devOptions: {
        enabled: true,
      },

      // If you HAVE a manifest.json in /public, keep this false.
      // If NOT, remove this line so the plugin generates one for you.
      manifest: false,

      workbox: {
        // Only keep this if you actually created this file in /public
        // importScripts: ["/custom_sw.js"],

        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,

        runtimeCaching: [
          // 1. CLOUDINARY IMAGES (The Critical Fix)
          {
            // Match Cloudinary URLs specifically
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,

            // "CacheFirst" = Check phone storage first. Only go online if missing.
            // This SAVES bandwidth and makes loading instant.
            handler: "CacheFirst",

            options: {
              cacheName: "fedha-cloudinary-images",
              expiration: {
                maxEntries: 100, // Keep last 100 property images
                maxAgeSeconds: 60 * 60 * 24 * 30, // Keep for 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // 2. OTHER EXTERNAL IMAGES (Optional generic fallback)
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "StaleWhileRevalidate", // For other random images, check for updates
            options: {
              cacheName: "other-images",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    }),
  ],
});
