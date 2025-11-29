import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Import Bootstrap CSS and JS globally
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/index.css";

// Note: No <React.StrictMode> wrapper here
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
