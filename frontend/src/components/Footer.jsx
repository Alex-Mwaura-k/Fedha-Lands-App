import React, { useState, useEffect } from "react"; // ✅ Added imports
import { Link } from "react-router-dom";
import api from "../api/axios"; // ✅ CHANGED: Import API

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [properties, setProperties] = useState([]);

  // ✅ NEW: Fetch Properties for Footer Links
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await api.get("/properties/");
        setProperties(response.data);
      } catch (error) {
        console.error("Footer Load Error:", error);
      }
    };
    fetchFooterData();
  }, []);

  // --- DYNAMIC LOGIC: Truncate to maximum of two words ---
  const formatTitle = (title) => {
    const words = title.split(" ");
    return words.length > 2 ? `${words[0]} ${words[1]}` : title;
  };

  const availableProps = properties
    .filter((p) => p.status === "Available")
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  const soldProps = properties
    .filter((p) => p.status === "Sold Out")
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscription feature coming soon!");
  };

  const subscribeToNotifications = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      alert("You are already subscribed to notifications!");
    } else if (Notification.permission === "denied") {
      alert(
        "You previously blocked notifications. Please go to your Browser Settings to 'Allow' notifications for this app manually."
      );
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          alert("Thanks! You will be notified of new properties.");
          new Notification("Welcome!", {
            body: "You are now subscribed to Fedha Land alerts.",
            icon: "/icons/icon.png",
          });
        }
      });
    }
  };

  return (
    <footer className="footer-section">
      <div className="container-md">
        <div className="row g-5 mb-2">
          {/* COLUMN 1: Brand & Socials */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="footer-brand mb-4 d-block">
              <img
                src="/icons/logo.png"
                alt="Fedha Land Ventures"
                width="180"
              />
            </Link>
            <p className="text-secondary small mb-4 pe-lg-4">
              Your trusted partner in real estate. We bridge the gap between
              dream and reality with transparent, title-deed-ready land
              investments in Kenya.
            </p>
            <h6 className="text-white text-uppercase fw-bold small ls-1 mb-3 text-center text-md-start">
              Follow Us
            </h6>
            <div className="d-flex gap-2 justify-content-center justify-content-md-start">
              <a
                href="https://web.facebook.com/fedhalandventures"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/fedhalandventures/"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.tiktok.com/@fedhalandventures"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <i className="bi bi-tiktok"></i>
              </a>
              <a
                href="https://www.youtube.com/@fedhalandventures"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href="https://wa.me/254715113103"
                target="_blank"
                rel="noreferrer"
                className="social-btn"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* COLUMN 2: Projects (RESTORED ORIGINAL STYLING WITH 2-WORD LIMIT) */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="text-white fw-bold mb-4">Projects</h5>
            <ul className="list-unstyled footer-links">
              {/* Dynamic Available (Max 2 words) */}
              {availableProps.map((prop) => (
                <li key={prop.id}>
                  <Link to={`/property/${prop.slug}`}>
                    {formatTitle(prop.title)}
                  </Link>
                </li>
              ))}
              {/* Dynamic Sold (Max 2 words) */}
              {soldProps.map((prop) => (
                <li key={prop.id}>
                  <Link to={`/property/${prop.slug}`}>
                    {formatTitle(prop.title)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/properties">View All Plots</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Company */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="text-white fw-bold mb-4">Company</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs Center</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Newsletter */}
          <div className="col-lg-4 col-md-6 text-center text-md-start mx-auto mx-md-0 mt-1 mt-md-5">
            <h5 className="text-white fw-bold mb-4">News Letter</h5>
            <p className="text-secondary small mb-3">
              Subscribe to get the latest land deals and market insights.
            </p>
            <form className="footer-form mb-3" onSubmit={handleSubscribe}>
              <div className="input-group">
                <input
                  type="email"
                  id="cEmail"
                  className="form-control rounded-0 bg-dark border-secondary text-white"
                  placeholder="Email Address"
                  required
                />
                <button
                  className="btn btn-danger rounded-0 text-uppercase fw-bold small px-3"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <button
              className="btn btn-outline-secondary btn-sm w-100 rounded-0"
              onClick={subscribeToNotifications}
            >
              Enable Push Alerts
            </button>
            <div className="d-flex align-items-center gap-2 text-secondary small justify-content-center justify-content-md-start mt-3">
              <i className="bi bi-lock-fill"></i> Secure subscription.
            </div>
          </div>
        </div>
        <div className="footer-divider mt-0 mt-md-5"></div>
        <div className="row align-items-center py-4">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-secondary small mb-0">
              © <span>{currentYear}</span>{" "}
              <strong>Fedha Land Ventures Ltd</strong>. All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <ul className="list-inline mb-0 small">
              <li className="list-inline-item">
                <Link
                  to="/privacy-policy"
                  className="text-secondary text-decoration-none hover-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="list-inline-item text-secondary mx-2">•</li>
              <li className="list-inline-item">
                <Link
                  to="/terms"
                  className="text-secondary text-decoration-none hover-white"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
