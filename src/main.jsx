import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";

// 1. CSS
import "bootstrap/dist/css/bootstrap.min.css";

// 2. ICONS
import "bootstrap-icons/font/bootstrap-icons.css";

// 3. JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 4. Custom CSS
import "./styles/index.css";

// --- SERVICE WORKER REGISTRATION ---
// This registers your custom sw.js to enable offline caching and installability
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Service Worker registered successfully!", reg);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
