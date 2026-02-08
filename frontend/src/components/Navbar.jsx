import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api/axios";
import { COMPANY_DATA } from "../data/contactData";

const Navbar = () => {
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [properties, setProperties] = useState([]);

  const closeButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await api.get("/properties/");
        setProperties(response.data);
      } catch (error) {
        console.error("Menu Load Error:", error);
      }
    };
    fetchMenuData();
  }, []);

  const formatTitle = (title) => {
    const words = title.split(" ");
    return words.length > 2 ? `${words[0]} ${words[1]}` : title;
  };

  const recentAvailable = properties
    .filter((p) => p.status === "Available")
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  const recentSold = properties
    .filter((p) => p.status === "Sold Out")
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  useEffect(() => {
    setIsPropertiesOpen(false);
    setActiveSubmenu(null);
    if (closeButtonRef.current) closeButtonRef.current.click();
  }, [location]);

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

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top site-navbar"
      data-bs-theme="dark"
    >
      <style>{`
        @media (max-width: 991px) {
          .dropdown-item {
            white-space: nowrap !important;
            line-height: 1.2 !important;
            padding: 6px 0 !important;
          }
          .dropdown-menu {
            border: none !important;
            background: transparent !important;
            padding-left: 10px !important;
          }
          .dropdown-submenu .dropdown-menu {
            padding-left: 12px !important;
          }
        }
      `}</style>

      <div className="container-md">
        <Link className="navbar-brand" to="/">
          <img
            src="/icons/logo.png"
            alt={COMPANY_DATA.name}
            width="150"
            className="d-inline-block align-text-top"
          />
        </Link>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-label="Toggle navigation" // Added helpful label here too
        >
          <i className="bi bi-list"></i>
        </button>

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
              aria-label="Close menu"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown" ref={dropdownRef}>
                <a
                  className={`nav-link dropdown-toggle ${
                    isPropertiesOpen ? "show" : ""
                  }`}
                  href="#"
                  role="button"
                  onClick={toggleProperties}
                  aria-expanded={isPropertiesOpen}
                >
                  Properties
                </a>

                <ul
                  className={`dropdown-menu mt-2 ${
                    isPropertiesOpen ? "show" : ""
                  }`}
                >
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

            <div className="phone d-flex flex-column align-items-end mt-lg-0">
              <div className="p-number d-flex align-items-center gap-2">
                <a
                  href={`tel:${COMPANY_DATA.phoneLink}`}
                  className="nav-link p-0 contact-link"
                >
                  {COMPANY_DATA.phone}
                </a>

                {/* --- FIX 1: INSTAGRAM --- */}
                {COMPANY_DATA.socials.instagram && (
                  <a
                    href={COMPANY_DATA.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none social-icon"
                    aria-label="Visit our Instagram page"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                )}

                {/* --- FIX 2: FACEBOOK --- */}
                {COMPANY_DATA.socials.facebook && (
                  <a
                    href={COMPANY_DATA.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none social-icon"
                    aria-label="Visit our Facebook page"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                )}

                {/* --- FIX 3: TIKTOK --- */}
                {COMPANY_DATA.socials.tiktok && (
                  <a
                    href={COMPANY_DATA.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none social-icon"
                    aria-label="Visit our TikTok page"
                  >
                    <i className="bi bi-tiktok"></i>
                  </a>
                )}
              </div>

              <div className="email small">
                <a
                  href={`mailto:${COMPANY_DATA.email}`}
                  className="nav-link p-0 contact-link"
                >
                  {COMPANY_DATA.email}
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
