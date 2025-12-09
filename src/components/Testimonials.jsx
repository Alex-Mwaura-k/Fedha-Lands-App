import { useState, useEffect } from "react";

const Testimonials = () => {
  // 1. MOCK DATABASE
  const soldTitlesDB = [
    "FEDHA-001",
    "KJI-550",
    "RYL-102",
    "UNT-300",
    "TEST-123",
  ];

  // 2. EXISTING REVIEWS (Initial 6 items)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "James Mwangi",
      role: "Investor",
      location: "Kithyoko",
      text: "I was skeptical at first, but Fedha Land delivered my title deed in just 35 days. The site visit was transparent and professional. Highly recommended!",
      rating: 5,
      img: "https://ui-avatars.com/api/?name=James+Mwangi&background=0D6EFD&color=fff",
      date: new Date("2025-01-10"),
    },
    {
      id: 2,
      name: "Sarah Ochieng",
      role: "Home Owner",
      location: "Malindi",
      text: "Bought a 1-acre block in Kijani Gardens. The fencing was done exactly as promised. Highly recommend them for diaspora investors.",
      rating: 5,
      img: "https://ui-avatars.com/api/?name=Sarah+Ochieng&background=DC3545&color=fff",
      date: new Date("2025-01-05"),
    },
    {
      id: 3,
      name: "David Kimutai",
      role: "Business Owner",
      location: "Makutano",
      text: "The installment plan helped me acquire land without straining my finances. Great customer service from the Ruiru team. Will buy again soon.",
      rating: 4,
      img: "https://ui-avatars.com/api/?name=David+Kimutai&background=198754&color=fff",
      date: new Date("2024-12-28"),
    },
    {
      id: 4,
      name: "Alice Wanjiku",
      role: "Diaspora Client",
      location: "Kithyoko",
      text: "Managing this process from the UK was seamless. They sent me video updates of the beacons and fencing. Trustworthy partner indeed.",
      rating: 5,
      img: "https://ui-avatars.com/api/?name=Alice+Wanjiku&background=ffc107&color=000",
      date: new Date("2024-12-15"),
    },
    {
      id: 5,
      name: "Peter Kamau",
      role: "Partner",
      location: "Ruiru",
      text: "Collaborating with Fedha has been a breeze. Their transparency in land dealings makes them stand out in the crowded real estate market.",
      rating: 5,
      img: "https://ui-avatars.com/api/?name=Peter+Kamau&background=6f42c1&color=fff",
      date: new Date("2024-11-30"),
    },
    {
      id: 6,
      name: "Grace Mutua",
      role: "Investor",
      location: "Masinga",
      text: "The value appreciation in Masinga is real. I bought my plot last year and its value has already gone up.",
      rating: 4,
      img: "https://ui-avatars.com/api/?name=Grace+Mutua&background=20c997&color=fff",
      date: new Date("2024-11-10"),
    },
  ]);

  // --- RESPONSIVE LOGIC ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- CAROUSEL LOGIC ---
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Show 6 items on Desktop, 1 on Mobile
  const itemsPerPage = isMobile ? 1 : 6;

  const isCarouselMode = reviews.length > itemsPerPage;

  // AUTO-SCROLL LOGIC
  useEffect(() => {
    if (!isCarouselMode || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, reviews.length, isCarouselMode, isPaused]);

  const nextSlide = () => {
    if (activeIndex >= reviews.length - itemsPerPage) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      setActiveIndex(reviews.length - itemsPerPage);
    } else {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const togglePause = () => setIsPaused(!isPaused);

  const displayReviews = isCarouselMode
    ? reviews.slice(activeIndex, activeIndex + itemsPerPage)
    : reviews;

  // --- FORM STATES ---
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    titleNumber: "",
    role: "",
    location: "",
    message: "",
    rating: 5,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATED IMAGE HANDLER
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate File Size (2MB Limit)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit. Please choose a smaller image.");
        e.target.value = ""; // Clear the input field visually
        setFormData({ ...formData, image: null }); // Clear data state
        setImagePreview(null); // Clear preview
        return;
      }
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("checking");
    setTimeout(() => {
      const isValid = soldTitlesDB.includes(
        formData.titleNumber.trim().toUpperCase()
      );
      if (isValid) {
        const newReview = {
          id: Date.now(),
          name: formData.name,
          role: formData.role || "Verified Client",
          location: formData.location,
          text: formData.message,
          rating: parseInt(formData.rating),
          img:
            imagePreview ||
            `https://ui-avatars.com/api/?name=${formData.name}&background=random`,
          date: new Date(),
        };
        // Add to TOP (Recent first)
        setReviews([newReview, ...reviews]);
        setStatus("success");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus("idle");
    setFormData({
      name: "",
      titleNumber: "",
      role: "",
      location: "",
      message: "",
      rating: 5,
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <section className="testimonials-section pt-3 pb-3 bg-white position-relative">
      <div className="container-md">
        {/* HEADER */}
        <div className="row align-items-end mb-3">
          <div className="col-lg-8">
            <span className="text-danger fw-bold text-uppercase small ls-2">
              Testimonials
            </span>
            <h2 className="display-6 fw-bold text-dark mt-2">
              What Our Clients{" "}
              <span className="text-outline-red-dark">Say</span>
            </h2>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <button
              className="btn btn-dark px-4 py-2 rounded-0 shadow"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-pencil-square me-2"></i> Write a Review
            </button>
          </div>
        </div>

        {/* REVIEWS CONTAINER */}
        <div className="position-relative">
          <div className="row g-4 justify-content-center transition-all">
            {displayReviews.length > 0 ? (
              displayReviews.map((review) => (
                <div key={review.id} className="col-md-4 fade-in-animation">
                  <div className="card h-100 border-0 shadow-sm p-4 bg-light position-relative">
                    <div className="position-absolute top-0 end-0 p-3 opacity-25 text-danger">
                      <i className="bi bi-quote fs-1"></i>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="rounded-circle me-3 object-fit-cover"
                        width="50"
                        height="50"
                        style={{
                          width: "50px",
                          height: "50px",
                          minWidth: "50px",
                          border: "2px solid white",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">
                          {review.name}
                        </h6>
                        <small
                          className="text-danger fw-bold text-uppercase"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {review.role}
                        </small>
                        <span className="text-muted small d-block">
                          {review.location}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3 text-warning small">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${
                            i < review.rating ? "bi-star-fill" : "bi-star"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <p
                      className="text-secondary small fst-italic mb-4"
                      style={{ lineHeight: "1.6" }}
                    >
                      "{review.text}"
                    </p>
                    <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill small">
                        <i className="bi bi-patch-check-fill me-1"></i> Verified
                      </span>
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {review.date
                          ? review.date.toLocaleDateString()
                          : "Recent"}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <p>No reviews yet. Be the first!</p>
              </div>
            )}
          </div>

          {/* Carousel Controls */}
          {isCarouselMode && (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                className="btn btn-outline-danger"
                onClick={prevSlide}
                title="Previous"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className={`btn ${
                  isPaused ? "btn-danger" : "btn-outline-danger"
                }`}
                onClick={togglePause}
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? (
                  <i className="bi bi-play-fill"></i>
                ) : (
                  <i className="bi bi-pause-fill"></i>
                )}
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={nextSlide}
                title="Next"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg">
              {/* UPDATED HEADER: BG-BLACK */}
              <div className="modal-header bg-black text-white">
                <h5 className="modal-title fw-bold text-white">
                  Share Your Experience
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body p-4 p-lg-5">
                {status === "success" ? (
                  <div className="text-center py-4">
                    <div className="mb-3">
                      <i className="bi bi-check-circle-fill text-success display-1"></i>
                    </div>
                    <h4 className="fw-bold text-success">
                      Verification Successful!
                    </h4>
                    <p className="text-muted">
                      Thank you, <strong>{formData.name}</strong>. Your review
                      has been submitted.
                    </p>
                    <button
                      className="btn btn-dark mt-3 px-4"
                      onClick={closeModal}
                    >
                      Close & View
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {status === "error" && (
                      <div
                        className="alert alert-danger mb-4 shadow-sm"
                        role="alert"
                      >
                        <strong>Verification Failed:</strong> Title Number not
                        found.
                      </div>
                    )}
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold small">
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            required
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-bold small text-danger">
                            Title Deed / Plot No.{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control border-danger"
                            name="titleNumber"
                            value={formData.titleNumber}
                            placeholder="e.g. FEDHA-001"
                            required
                            onChange={handleInputChange}
                          />
                          <div className="form-text x-small">
                            Used for verification only. Hidden from public.
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 mb-3">
                            <label className="form-label fw-bold small">
                              Your Role
                            </label>
                            <select
                              className="form-select"
                              name="role"
                              value={formData.role}
                              required
                              onChange={handleInputChange}
                            >
                              <option value="" disabled>
                                Select...
                              </option>
                              <option value="Investor">Investor</option>
                              <option value="Home Owner">Home Owner</option>
                              <option value="Diaspora Client">
                                Diaspora Client
                              </option>
                              <option value="Business Owner">
                                Business Owner
                              </option>
                              <option value="Partner">Partner</option>
                            </select>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label fw-bold small">
                              Location (Optional)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="location"
                              value={formData.location}
                              placeholder="e.g. Malindi"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold small">
                            Upload Photo (Max 2MB)
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <div className="mt-2">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="rounded-circle"
                                width="60"
                                height="60"
                              />
                              <span className="ms-2 small text-success">
                                <i className="bi bi-check"></i> Ready
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-bold small">
                            Your Message <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows="4"
                            name="message"
                            value={formData.message}
                            placeholder="Tell us about your experience..."
                            required
                            minLength="100"
                            maxLength="150"
                            onChange={handleInputChange}
                          ></textarea>
                          <div className="d-flex justify-content-between form-text x-small">
                            <span>Min: 100 chars</span>
                            <span
                              className={
                                formData.message.length > 120
                                  ? "text-danger"
                                  : ""
                              }
                            >
                              {formData.message.length}/150
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label fw-bold small">
                            Rating
                          </label>
                          <div className="d-flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className="form-check form-check-inline m-0"
                              >
                                <input
                                  className="form-check-input d-none"
                                  type="radio"
                                  name="rating"
                                  id={`star${star}`}
                                  value={star}
                                  onChange={handleInputChange}
                                  checked={parseInt(formData.rating) === star}
                                />
                                <label
                                  className={`form-check-label fs-4 ${
                                    parseInt(formData.rating) >= star
                                      ? "text-warning"
                                      : "text-muted"
                                  }`}
                                  htmlFor={`star${star}`}
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="bi bi-star-fill"></i>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-danger py-2 px-5 fw-bold shadow-sm rounded-pill"
                        disabled={status === "checking"}
                      >
                        {status === "checking" ? (
                          <span>
                            <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                            Verifying...
                          </span>
                        ) : (
                          "Verify & Submit Review"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
