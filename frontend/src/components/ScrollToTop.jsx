import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation(); // Get the current route path

  // 1. AUTOMATIC SCROLL RESET (The Fix)
  useEffect(() => {
    // Whenever the path changes (e.g. / -> /properties), scroll to top instantly
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. BUTTON VISIBILITY LOGIC
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 3. MANUAL BUTTON CLICK
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top-btn ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

export default ScrollToTop;
