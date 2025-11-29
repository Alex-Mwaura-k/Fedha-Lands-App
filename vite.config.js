import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the app when you deploy changes
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      // THIS IS YOUR MANIFEST (App Details)
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
            src: "icons/icon.png", // Ensure you have this file in public/icons/
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

      // CACHING STRATEGY (Offline Capability)
      workbox: {
        // Cache images, fonts, and scripts so they work offline
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
        runtimeCaching: [
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
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
