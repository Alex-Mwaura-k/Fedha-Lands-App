import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // <--- Import this
import App from "./App.jsx";

// 1. CSS
import "bootstrap/dist/css/bootstrap.min.css";

// 2. ICONS
import "bootstrap-icons/font/bootstrap-icons.css";

// 3. JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 4. Custom CSS
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Wrap everything in HelmetProvider so SEO tags work
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
