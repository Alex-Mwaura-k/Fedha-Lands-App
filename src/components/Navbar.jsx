import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // STATE MANAGEMENT
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // REFS
  const closeButtonRef = useRef(null); // To close mobile menu
  const dropdownRef = useRef(null); // To detect clicks outside properties dropdown

  const location = useLocation();

  // 1. CLOSE MENUS ON ROUTE CHANGE
  useEffect(() => {
    setIsPropertiesOpen(false);
    setActiveSubmenu(null);
    if (closeButtonRef.current) closeButtonRef.current.click();
  }, [location]);

  // 2. CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If dropdown is open AND click is NOT inside the dropdownRef element
      if (
        isPropertiesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsPropertiesOpen(false);
        setActiveSubmenu(null);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind on cleanup
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
              {/* Added ref={dropdownRef} to the parent LI so we know where the boundary is */}
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

                  {/* SUBMENU: ROYAL GARDEN */}
                  <li className="dropdown-submenu">
                    <a
                      className={`dropdown-item dropdown-toggle ${
                        activeSubmenu === "royal" ? "show" : ""
                      }`}
                      href="#"
                      onClick={(e) => toggleSubmenu(e, "royal")}
                    >
                      Royal Gardens
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeSubmenu === "royal" ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link className="dropdown-item" to="/property/1">
                          Phase V
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/property/4">
                          Phase IV
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* DIRECT LINKS */}
                  <li>
                    <Link className="dropdown-item" to="/property/2">
                      Kijani Gardens
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/property/3">
                      Unity Garden
                    </Link>
                  </li>

                  {/* SUBMENU: KITENGELA */}
                  <li className="dropdown-submenu">
                    <a
                      className={`dropdown-item dropdown-toggle ${
                        activeSubmenu === "kitengela" ? "show" : ""
                      }`}
                      href="#"
                      onClick={(e) => toggleSubmenu(e, "kitengela")}
                    >
                      Kitengela
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeSubmenu === "kitengela" ? "show" : ""
                      }`}
                    >
                      <li>
                        <Link className="dropdown-item" to="/property/1">
                          Phase I
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/property/1">
                          Phase II
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              {/* === END PROPERTIES === */}

              <li className="nav-item">
                <a className="nav-link" href="/#about-us" onClick={closeMenu}>
                  About
                </a>
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
