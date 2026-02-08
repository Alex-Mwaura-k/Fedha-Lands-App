import React, { useEffect, useState } from "react";

const Toast = ({ status, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status === "success" || status === "error") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (status === "idle" || status === "sending") return null;

  const bgColor = status === "success" ? "#13ab31ff" : "#dc3545";
  const icon =
    status === "success"
      ? "bi-check-circle-fill"
      : "bi-exclamation-triangle-fill";

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
          }
          .toast-modern {
            background-color: ${bgColor};
            color: white;
            border-radius: 8px; /* Slightly reduced radius for slimmer look */
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
            /* --- EDIT 1: REDUCED PADDING HERE --- */
            padding: 10px 15px; 
            min-width: 280px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            animation: ${
              isVisible
                ? "slideIn 0.5s ease-out forwards"
                : "slideOut 0.5s ease-in forwards"
            };
            backdrop-filter: blur(10px);
            border-left: 4px solid rgba(255,255,255,0.3);
          }
          .toast-modern i {
            font-size: 1.1rem; /* Slightly smaller icon */
          }
          .btn-close-custom {
            background: none;
            border: none;
            color: rgba(255,255,255,0.7);
            font-size: 1.1rem;
            cursor: pointer;
            transition: color 0.2s;
            padding: 0;
            margin-left: 10px;
          }
          .btn-close-custom:hover {
            color: white;
          }
        `}
      </style>

      {/* --- EDIT 2: ADJUST 'top' VALUE HERE TO CLEAR NAVBAR --- */}
      <div
        className="position-fixed end-0 p-3"
        style={{
          zIndex: 10000,
          pointerEvents: "none",
          top: "55px" /* <--- Push it down (adjust this number if needed) */,
        }}
      >
        <div className="toast-modern" style={{ pointerEvents: "auto" }}>
          <div className="d-flex align-items-center">
            <i className={`bi ${icon} me-2`}></i>
            <div>
              {/* Optional: Removed the "SUCCESS/ERROR" label to make it even slimmer */}
              <span className="fw-medium small">{message}</span>
            </div>
          </div>
          <button
            type="button"
            className="btn-close-custom"
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 500);
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Toast;
