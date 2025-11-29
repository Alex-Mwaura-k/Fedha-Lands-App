const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This is a demo)");
  };

  return (
    <section id="contact" className="contact-feature position-relative">
      {/* Background Squares */}
      <div className="tech-grid-bg"></div>

      <div className="container-md h-100 position-relative z-2">
        <div className="row h-100 align-items-stretch justify-content-center g-4">
          {/* LEFT COLUMN: Info (Top) + Map (Bottom) */}
          <div className="col-lg-6 col-md-10 d-flex flex-column">
            {/* 1. TEXT AREA */}
            <div className="text-area-wrapper mb-4 pe-lg-4">
              <span className="text-danger fw-bold text-uppercase small ls-2">
                Connect With Us
              </span>
              <h2 className="display-5 fw-bold text-dark mt-2 mb-3">
                Get in <span className="text-outline-red-dark">Touch</span>
              </h2>
              <p className="text-muted mb-4">
                Ready to own your piece of Kenya? Visit our offices at
                <strong> Nyongo House, Ruiru</strong> or reach out directly.
              </p>

              {/* Contact Details */}
              <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center mb-2 mb-md-0">
                  <i className="bi bi-telephone-fill text-danger fs-5 me-2"></i>
                  <span className="fw-bold text-dark small">
                    +254 715 113 103
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope-at-fill text-danger fs-5 me-2"></i>
                  <span className="fw-bold text-dark small">
                    fedhalandventures@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* 2. MAP AREA */}
            <div className="map-standalone flex-grow-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127649.24669159995!2d36.81621878964839!3d-1.1324982396298195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f474b80c7eeff%3A0xcc6b79a45ed5fc75!2sFedha%20Land%20Ventures!5e0!3m2!1sen!2ske!4v1764347923584!5m2!1sen!2ske"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="map-tag">
                <i className="bi bi-geo-alt-fill text-danger me-1"></i> Ruiru HQ
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Card */}
          <div className="col-lg-6 col-md-10">
            <div className="floating-card h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0">Send a Message</h4>
                <div className="live-indicator">
                  <span className="pulse-dot"></span> Online
                </div>
              </div>

              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="input-float">
                      <input
                        type="text"
                        id="cName"
                        className="form-control-float"
                        placeholder="Name"
                        required
                      />
                      <i className="bi bi-person text-muted icon-float"></i>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="input-float">
                      <input
                        type="tel"
                        id="cPhone"
                        className="form-control-float"
                        placeholder="Phone"
                        required
                      />
                      <i className="bi bi-phone text-muted icon-float"></i>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="input-float">
                      <input
                        type="email"
                        id="cEmail"
                        className="form-control-float"
                        placeholder="Email"
                        required
                      />
                      <i className="bi bi-envelope text-muted icon-float"></i>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="input-float">
                      <select
                        id="cSubject"
                        className="form-control-float text-muted"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Interested in...
                        </option>
                        <option value="Buy">Buying Property</option>
                        <option value="Visit">Site Visit</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="input-float">
                      <textarea
                        id="cMessage"
                        rows="3"
                        className="form-control-float"
                        placeholder="Message..."
                        required
                      ></textarea>
                      <i className="bi bi-chat-dots text-muted icon-float"></i>
                    </div>
                  </div>

                  {/* Send Button */}
                  <div className="col-12 mt-2">
                    <button
                      type="submit"
                      className="btn btn-dark w-100 rounded-pill py-2 fw-bold text-uppercase small shadow-sm btn-lift"
                    >
                      Send Message <i className="bi bi-send-fill ms-2"></i>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="col-12 text-center my-0">
                    <span className="text-muted x-small text-uppercase ls-2">
                      Or Contact Directly
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="col-6">
                    <a
                      href="tel:+254715113103"
                      className="btn btn-outline-secondary w-100 rounded-pill py-2 small fw-bold"
                    >
                      <i className="bi bi-telephone-fill me-2"></i> Call
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Nyongo+House,+Ruiru"
                      target="_blank"
                      className="btn btn-outline-danger w-100 rounded-pill py-2 small fw-bold btn-lift"
                    >
                      <i className="bi bi-cursor-fill me-2"></i> Directions
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
