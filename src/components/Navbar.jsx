import { useState } from "react";

const Navbar = () => {
  // State to manage mobile nested dropdowns (Royal Garden & Kitengela)
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    // Toggle: if clicking the same one, close it. If new one, open it.
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top site-navbar"
      data-bs-theme="dark"
    >
      <div className="container-md">
        <a className="navbar-brand" href="#">
          <img
            src="/icons/logo.png"
            alt="Fedha Land Ventures"
            width="150"
            className="d-inline-block align-text-top"
          />
        </a>

        {/* Offcanvas Toggle Button (Mobile) */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Offcanvas Menu Content */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>

              {/* Properties Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Properties
                </a>
                <ul className="dropdown-menu mt-2">
                  {/* Nested Dropdown 1: Royal Garden */}
                  <li className="dropdown-submenu">
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="#"
                      onClick={(e) => toggleSubmenu(e, "royal")}
                    >
                      Royal Garden Kithyoko
                    </a>
                    <ul
                      className={`dropdown-menu ${
                        activeSubmenu === "royal" ? "show" : ""
                      }`}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Phase V
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Phase IV
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a className="dropdown-item" href="#">
                      Kijani Garden Malindi
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Unity Garden
                    </a>
                  </li>

                  {/* Nested Dropdown 2: Kitengela */}
                  <li className="dropdown-submenu">
                    <a
                      className="dropdown-item dropdown-toggle"
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
                        <a className="dropdown-item" href="#">
                          Phase I
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Phase II
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about-us">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>

            {/* Contact Info Right Side */}
            <div className="phone d-flex flex-column align-items-end mt-lg-0">
              <div className="p-number d-flex align-items-center gap-2">
                <a
                  href="tel:+254715113103"
                  className="nav-link p-0 contact-link"
                >
                  +254715113103
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  className="text-decoration-none social-icon"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="text-decoration-none social-icon"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  className="text-decoration-none social-icon"
                >
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
