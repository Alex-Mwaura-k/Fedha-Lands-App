import React from "react";
import ReactDOM from "react-dom/client";
// 1. Import BrowserRouter
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // 2. Wrap App inside BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
