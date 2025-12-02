import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      manifest: {
        name: "Fedha Land Ventures",
        short_name: "Fedha Land",
        description: "Prime, affordable land for sale in Kenya.",
        theme_color: "#ff0000",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "icons/icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        // 1. This tells the Service Worker to open index.html for ANY route (like /gallery)
        navigateFallback: "/index.html",

        // 2. Ensure all file types are cached
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}",
        ],

        // 3. Allow large images
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
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
