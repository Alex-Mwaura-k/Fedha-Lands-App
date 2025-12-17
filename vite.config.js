import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",

      // Removed the strict 'includeAssets' line to prevent "404" crashes
      // includeAssets: ["favicon.ico", "icons/*.png"],

      // 1. ENABLE DEV MODE
      devOptions: {
        enabled: true,
      },

      // 2. Keep this false since you have the file in /public
      manifest: false,

      workbox: {
        // Reduced glob patterns to just the essentials to avoid "missing file" crashes
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        navigateFallback: "/index.html",

        // Force Immediate Control
        skipWaiting: true,
        clientsClaim: true,

        // Ignore "404" errors if an old file version is missing
        cleanupOutdatedCaches: true,

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
              // 3. CRITICAL FIX: Allow "Opaque" (Status 0) responses
              // This lets the SW cache YouTube thumbnails without throwing errors
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
