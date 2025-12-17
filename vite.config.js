import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",

      // 1. ENABLE DEV MODE
      devOptions: {
        enabled: true,
      },

      // 2. Keep this false since you have the file in /public
      manifest: false,

      workbox: {
        // 3. FONT FIX: Added 'woff' and 'woff2' to the list
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],

        // 4. SIZE LIMIT FIX: Allow files up to 10MB (important for bundled fonts)
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,

        runtimeCaching: [
          {
            // Match ALL images (including external ones like YouTube)
            urlPattern: ({ request }) => request.destination === "image",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
              // Allow "Opaque" (Status 0) responses for YouTube thumbnails
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
