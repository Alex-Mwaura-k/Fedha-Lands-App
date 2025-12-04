import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "mask-icon.svg",
        "fonts/*.woff",
        "fonts/*.woff2",
      ],

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
            type: "image/png", // Note: 'purpose: any maskable' is good practice if you have a maskable icon
          },
        ],
      },

      workbox: {
        // 1. Force the Service Worker to update immediately
        skipWaiting: true,
        clientsClaim: true,

        // 2. Force all navigation to go to index.html (Fixes the "You're offline" screen)
        navigateFallback: "/index.html",

        // 3. Ensure fonts and large images are cached
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}",
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,

        runtimeCaching: [
          {
            // Cache Google Fonts (if any)
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
