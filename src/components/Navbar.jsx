import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Ref to programmatically click the close button
  const closeButtonRef = useRef(null);

  const toggleSubmenu = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  // FUNCTION: Closes mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (closeButtonRef.current) {
      // This simulates clicking the 'X' button
      closeButtonRef.current.click();
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top site-navbar"
      data-bs-theme="dark"
    >
      <div className="container-md">
        {/* LOGO - Close menu on click */}
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img
            src="/icons/logo.png"
            alt="Fedha Land Ventures"
            width="150"
            className="d-inline-block align-text-top"
          />
        </Link>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i className="bi bi-list"></i>
        </button>

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
              ref={closeButtonRef} // ATTACH REF HERE
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>

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
                        <Link
                          className="dropdown-item"
                          to="/property/1"
                          onClick={handleLinkClick}
                        >
                          Phase V
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/property/4"
                          onClick={handleLinkClick}
                        >
                          Phase IV
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/property/2"
                      onClick={handleLinkClick}
                    >
                      Kijani Garden Malindi
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/property/3"
                      onClick={handleLinkClick}
                    >
                      Unity Garden
                    </Link>
                  </li>

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
                        <Link
                          className="dropdown-item"
                          to="/property/1"
                          onClick={handleLinkClick}
                        >
                          Phase I
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/property/1"
                          onClick={handleLinkClick}
                        >
                          Phase II
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/about"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/blogs"
                  onClick={handleLinkClick}
                >
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/gallery"
                  onClick={handleLinkClick}
                >
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contact"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="phone d-flex flex-column align-items-end mt-lg-0">
              <div className="p-number d-flex align-items-center gap-2">
                <a
                  href="tel:+254715113103"
                  className="nav-link p-0 contact-link"
                >
                  +254715113103
                </a>

                {/* Updated Social Links */}
                <a
                  href="https://www.instagram.com/fedhalandventures/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none social-icon"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://web.facebook.com/fedhalandventures"
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none social-icon"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@fedhalandventures"
                  target="_blank"
                  rel="noreferrer"
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
