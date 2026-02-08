import React, { useState } from "react";
import api from "../api/axios"; // ✅ UPDATED: Using centralized API
import { Link } from "react-router-dom";
import { COMPANY_DATA } from "../data/contactData";

const Contact = ({ showBreadcrumb }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  // ✅ NEW: Honeypot state to catch bots
  const [confirmEmail, setConfirmEmail] = useState("");

  const [status, setStatus] = useState("idle");
  const [btnText, setBtnText] = useState("Directions");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let key = id;

    if (id === "cName") key = "name";
    if (id === "cPhone") key = "phone";
    if (id === "cEmail") key = "email";
    if (id === "cSubject") key = "subject";
    if (id === "cMessage") key = "message";

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ NEW: Bot Check
    if (confirmEmail) {
      console.warn("Spam detected");
      return;
    }

    setStatus("sending");

    try {
      // ✅ UPDATED: Using centralized api helper
      await api.post("/contact/", formData);
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
    }
  };

  const handleDirections = (e) => {
    e.preventDefault();
    setBtnText("Locating...");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=Fedha+Land+Ventures&destination_place_id=ChIJ_-7HgEtHLxgRdfzVXqR5a8w`;

          window.open(url, "_blank");
          setBtnText("Directions");
        },
        (error) => {
          console.warn("Location access denied or error:", error);
          window.open(COMPANY_DATA.mapLink, "_blank");
          setBtnText("Directions");
        },
        { enableHighAccuracy: true },
      );
    } else {
      window.open(COMPANY_DATA.mapLink, "_blank");
      setBtnText("Directions");
    }
  };

  return (
    <section
      id="contact"
      className="contact-feature position-relative bg-white"
    >
      <div className="container-md h-100 position-relative z-2">
        {showBreadcrumb && (
          <nav aria-label="breadcrumb" className="pt-3 mb-2">
            <ol
              className="breadcrumb"
              style={{ backgroundColor: "transparent", padding: 0, margin: 0 }}
            >
              <li className="breadcrumb-item">
                <Link to="/" className="text-danger text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Contact Us
              </li>
            </ol>
          </nav>
        )}

        <div className="row h-100 align-items-stretch justify-content-center g-4">
          <div className="col-lg-6 col-md-10 d-flex flex-column">
            <div className="text-area-wrapper mb-4 pe-lg-4">
              <span className="text-danger fw-bold text-uppercase small ls-2">
                Connect With Us
              </span>
              <h2 className="display-5 fw-bold text-dark mt-2 mb-3">
                Get in <span className="text-stroke-red">Touch</span>
              </h2>
              <p className="text-muted mb-4">
                Ready to own your piece of Kenya? Visit our offices at
                <strong> {COMPANY_DATA.location}</strong> or reach out directly.
              </p>

              <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
                <div className="d-flex align-items-center mb-2 mb-md-0">
                  <i className="bi bi-telephone-fill text-danger fs-5 me-2"></i>
                  <span className="fw-bold text-dark small">
                    {COMPANY_DATA.phone}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope-at-fill text-danger fs-5 me-2"></i>
                  <span className="fw-bold text-dark small">
                    {COMPANY_DATA.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="map-standalone flex-grow-1 position-relative">
              <style>{`
                  .map-responsive-container iframe {
                    width: 100% !important;
                    height: 100% !important;
                    min-height: 300px;
                    border-radius: 12px;
                    display: block;
                    border: 0;
                  }
                `}</style>

              <div
                className="map-responsive-container h-100 w-100 shadow-sm rounded-4 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: COMPANY_DATA.mapEmbed }}
              />

              <div className="map-tag">
                <i className="bi bi-geo-alt-fill text-danger me-1"></i> Ruiru HQ
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-10">
            <div className="floating-card h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0">Send a Message</h4>
                <div className="live-indicator">
                  <span className="pulse-dot"></span> Online
                </div>
              </div>

              {status === "success" && (
                <div className="alert alert-success small mb-3">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Message sent! We'll contact you shortly.
                </div>
              )}
              {status === "error" && (
                <div className="alert alert-danger small mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Failed to send. Please try again or call us.
                </div>
              )}

              <form id="contactForm" onSubmit={handleSubmit}>
                {/* ✅ HIDDEN HONEYPOT FIELD */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="confirm_email_field"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <div className="input-float">
                      <input
                        type="text"
                        id="cName"
                        className="form-control-float"
                        placeholder="Name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        aria-label="Full Name"
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        aria-label="Phone Number"
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
                        value={formData.email}
                        onChange={handleInputChange}
                        aria-label="Email Address"
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
                        value={formData.subject}
                        onChange={handleInputChange}
                        aria-label="Contact Subject"
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
                        value={formData.message}
                        onChange={handleInputChange}
                        aria-label="Message"
                      ></textarea>
                      <i className="bi bi-chat-dots text-muted icon-float"></i>
                    </div>
                  </div>

                  <div className="col-12 mt-2">
                    <button
                      type="submit"
                      className="btn btn-dark w-100 rounded-pill py-2 fw-bold text-uppercase small shadow-sm btn-lift"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <span>Sending...</span>
                      ) : (
                        <span>
                          Send Message <i className="bi bi-send-fill ms-2"></i>
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="col-12 text-center my-0">
                    <span className="text-muted x-small text-uppercase ls-2">
                      Or Contact Directly
                    </span>
                  </div>

                  <div className="col-6">
                    <a
                      href={`tel:${COMPANY_DATA.phoneLink}`}
                      className="btn btn-outline-secondary w-100 rounded-pill py-2 small fw-bold"
                    >
                      <i className="bi bi-telephone-fill me-2"></i> Call
                    </a>
                  </div>

                  <div className="col-6">
                    <button
                      onClick={handleDirections}
                      className="btn btn-outline-danger w-100 rounded-pill py-2 small fw-bold btn-lift"
                    >
                      <i className="bi bi-cursor-fill me-2"></i> {btnText}
                    </button>
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
