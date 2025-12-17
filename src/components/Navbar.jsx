import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { properties } from "../data/propertiesData"; // Import properties data for dynamic links

const Navbar = () => {
  // STATE MANAGEMENT
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // REFS
  const closeButtonRef = useRef(null); // To close mobile menu
  const dropdownRef = useRef(null); // To detect clicks outside properties dropdown

  const location = useLocation();

  // --- DYNAMIC DROPDOWN LOGIC ---
  // Helper function to truncate title to maximum of two words
  const formatTitle = (title) => {
    const words = title.split(" ");
    return words.length > 2 ? `${words[0]} ${words[1]}` : title;
  };

  // 1. Get 2 newest Available plots
  const recentAvailable = properties
    .filter((p) => p.status === "Available")
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  // 2. Get 2 newest Sold Out plots
  const recentSold = properties
    .filter((p) => p.status === "Sold Out")
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  // 1. CLOSE MENUS ON ROUTE CHANGE
  useEffect(() => {
    setIsPropertiesOpen(false);
    setActiveSubmenu(null);
    if (closeButtonRef.current) closeButtonRef.current.click();
  }, [location]);

  // 2. CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPropertiesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsPropertiesOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPropertiesOpen]);

  // HANDLERS
  const toggleProperties = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPropertiesOpen(!isPropertiesOpen);
  };

  const toggleSubmenu = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const closeMenu = () => {
    if (closeButtonRef.current) closeButtonRef.current.click();
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top site-navbar"
      data-bs-theme="dark"
    >
      {/* MOBILE LAYOUT FIX: Reduced padding for tighter fit on mobile screens */}
      <style>{`
        @media (max-width: 991px) {
          .dropdown-item {
            white-space: nowrap !important; /* Keep 2-word title on one line */
            line-height: 1.2 !important;
            padding: 6px 0 !important; /* Reduced padding from 12px for tighter fit */
          }
          .dropdown-menu {
            border: none !important;
            background: transparent !important;
            padding-left: 10px !important; /* Reduced from 15px */
          }
          .dropdown-submenu .dropdown-menu {
            padding-left: 12px !important;
          }
        }
      `}</style>

      <div className="container-md">
        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img
            src="/icons/logo.png"
            alt="Fedha Land Ventures"
            width="150"
            className="d-inline-block align-text-top"
          />
        </Link>

        {/* TOGGLE BUTTON */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
        >
          <i className="bi bi-list"></i>
        </button>

        {/* SIDEBAR (OFFCANVAS) */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              ref={closeButtonRef}
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {/* === PROPERTIES DROPDOWN === */}
              <li className="nav-item dropdown" ref={dropdownRef}>
                <a
                  className={`nav-link dropdown-toggle ${
                    isPropertiesOpen ? "show" : ""
                  }`}
                  href="#"
                  role="button"
                  onClick={toggleProperties}
                >
                  Properties
                </a>

                <ul
                  className={`dropdown-menu mt-2 ${
                    isPropertiesOpen ? "show" : ""
                  }`}
                >
                  {/* LINK 1: VIEW ALL */}
                  <li>
                    <Link
                      className="dropdown-item fw-bold small"
                      to="/properties"
                      style={{ color: "#a1a1a1" }}
                    >
                      View All Properties
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1" />
                  </li>

                  {/* DYNAMIC SUBMENU: NEWEST LISTINGS (Max 2 words) */}
                  {recentAvailable.length > 0 && (
                    <li className="dropdown-submenu">
                      <a
                        className={`dropdown-item dropdown-toggle ${
                          activeSubmenu === "new" ? "show" : ""
                        }`}
                        href="#"
                        onClick={(e) => toggleSubmenu(e, "new")}
                      >
                        Latest Properties
                      </a>
                      <ul
                        className={`dropdown-menu ${
                          activeSubmenu === "new" ? "show" : ""
                        }`}
                      >
                        {recentAvailable.map((p) => (
                          <li key={p.id}>
                            <Link
                              className="dropdown-item"
                              to={`/property/${p.slug}`}
                            >
                              {formatTitle(p.title)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}

                  {/* DYNAMIC SUBMENU: SOLD OUT (Max 2 words) */}
                  {recentSold.length > 0 && (
                    <li className="dropdown-submenu">
                      <a
                        className={`dropdown-item dropdown-toggle ${
                          activeSubmenu === "sold" ? "show" : ""
                        }`}
                        href="#"
                        onClick={(e) => toggleSubmenu(e, "sold")}
                      >
                        Sold Out
                      </a>
                      <ul
                        className={`dropdown-menu ${
                          activeSubmenu === "sold" ? "show" : ""
                        }`}
                      >
                        {recentSold.map((p) => (
                          <li key={p.id}>
                            <Link
                              className="dropdown-item text-muted"
                              to={`/property/${p.slug}`}
                            >
                              {formatTitle(p.title)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {/* CONTACT INFO */}
            <div className="phone d-flex flex-column align-items-end mt-lg-0">
              <div className="p-number d-flex align-items-center gap-2">
                <a
                  href="tel:+254715113103"
                  className="nav-link p-0 contact-link"
                >
                  +254715113103
                </a>
                <a href="#" className="text-decoration-none social-icon">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-decoration-none social-icon">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-decoration-none social-icon">
                  <i className="bi bi-tiktok"></i>
                </a>
              </div>
              <div className="email small">
                <a
                  href="mailto:fedhalandventures@gmail.com"
                  className="nav-link p-0 contact-link"
                >
                  fedhalandventures@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
