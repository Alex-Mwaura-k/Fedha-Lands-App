import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// 1. CSS
import "bootstrap/dist/css/bootstrap.min.css";
// 2. ICONS
// Import directly from node_modules so Vite bundles it
import "bootstrap-icons/font/bootstrap-icons.css";
// 3. JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// 4. Custom CSS
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
