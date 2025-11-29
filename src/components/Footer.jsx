// src/components/Footer.jsx

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscription feature coming soon!");
  };

  return (
    <footer className="footer-section">
      <div className="container-md">
        {/* TOP ROW: Brand, Links, & Newsletter */}
        <div className="row g-5 mb-2">
          {/* COLUMN 1: Brand & Socials */}
          <div className="col-lg-4 col-md-6">
            <a href="#" className="footer-brand mb-4 d-block">
              <img
                src="/icons/logo.png"
                alt="Fedha Land Ventures"
                width="180"
              />
            </a>
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
                href="https://www.facebook.com"
                target="_blank"
                className="social-btn"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="social-btn"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                className="social-btn"
              >
                <i className="bi bi-tiktok"></i>
              </a>
              <a
                href="https://www.youtube.com/@fedhalandventures"
                target="_blank"
                className="social-btn"
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href="https://wa.me/+254715113103"
                target="_blank"
                className="social-btn"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* COLUMN 2: Featured Properties */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="text-white fw-bold mb-4">Projects</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="#">Royal Gardens Phase 5</a>
              </li>
              <li>
                <a href="#">Kijani Gardens Malindi</a>
              </li>
              <li>
                <a href="#">Unity Gardens Makutano</a>
              </li>
              <li>
                <a href="#">Amani Gardens Malindi</a>
              </li>
              <li>
                <a href="#">View All Plots</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Company */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="text-white fw-bold mb-4">Company</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <a href="#about-us">About Us</a>
              </li>
              <li>
                <a href="#blog">Media Center</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Newsletter */}
          <div className="col-lg-4 col-md-6 text-center text-md-start mx-auto mx-md-0 mt-1 mt-md-5">
            <h5 className="text-white fw-bold mb-4">Newsletter</h5>
            <p className="text-secondary small mb-3">
              Subscribe to get the latest land deals and market insights. No
              spam, just value.
            </p>

            <form className="footer-form mb-3" onSubmit={handleSubscribe}>
              <div className="input-group">
                <input
                  type="email"
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

            <div className="d-flex align-items-center gap-2 text-secondary small justify-content-center justify-content-md-start">
              <i className="bi bi-lock-fill"></i> Secure subscription.
            </div>
          </div>
        </div>

        {/* DIVIDER LINE */}
        <div className="footer-divider mt-0 mt-md-5"></div>

        {/* BOTTOM ROW: Copyright & Legal */}
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
                <a
                  href="#"
                  className="text-secondary text-decoration-none hover-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item text-secondary mx-2">•</li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-secondary text-decoration-none hover-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
