import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { galleryData } from "../data/galleryData";

const Gallery = ({ limit }) => {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // 1. Filter Data logic
  const filteredItems =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.type === filter);

  // 2. Limit Data (If on Home Page)
  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  // Ensure scroll position is reset when opening the full page
  useEffect(() => {
    if (!limit) window.scrollTo(0, 0);
  }, [limit]);

  // --- LIGHTBOX HANDLERS ---
  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === displayItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? displayItems.length - 1 : prev - 1
    );
  };

  return (
    <>
      <section id="gallery" className="gallery-section bg-black py-5">
        <div className="container-md">
          {/* --- BREADCRUMB --- */}
          {!limit && (
            <nav aria-label="breadcrumb" className="mb-4 pt-2">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-danger text-decoration-none">
                    Home
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active text-white"
                  aria-current="page"
                >
                  Gallery
                </li>
              </ol>
            </nav>
          )}

          {/* Header */}
          <div className="row mb-4 align-items-center">
            <div className="col-lg-4">
              <span className="text-danger fw-bold text-uppercase small ls-2">
                Our Gallery
              </span>
              <h2 className="display-5 fw-bold text-white mt-1">
                Life at <span className="text-stroke-white">Fedha</span>
              </h2>
            </div>

            <div className="col-lg-8">
              <div className="gallery-filters d-flex justify-content-lg-end justify-content-start gap-2 flex-wrap mt-3 mt-lg-0">
                {["all", "property", "team", "poster"].map((type) => (
                  <button
                    key={type}
                    className={`filter-btn ${filter === type ? "active" : ""}`}
                    onClick={() => setFilter(type)}
                    aria-pressed={filter === type}
                  >
                    {type === "poster"
                      ? "Events"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="row g-3 gallery-container">
            {displayItems.length > 0 ? (
              displayItems.map((item, index) => (
                <div
                  key={item.id}
                  className="col-lg-4 col-md-6 gallery-item show"
                >
                  <div
                    className="gallery-card"
                    onClick={() => openLightbox(index)}
                    style={{ cursor: "pointer" }}
                    role="button"
                    aria-label={`View ${item.title}`}
                    tabIndex="0"
                    onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                  >
                    <img
                      src={item.img}
                      alt={item.alt || item.title}
                      loading="lazy"
                      className="img-fluid w-100"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="gallery-overlay">
                      <div className="overlay-content p-3">
                        <h6 className="text-uppercase text-danger fw-bold ls-2 mb-1">
                          {item.type}
                        </h6>
                        <h4 className="text-white fw-bold">{item.title}</h4>
                        <p className="text-white-50 small mb-0">
                          Click to Enlarge
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-white-50">
                  No images found in this category.
                </p>
              </div>
            )}
          </div>

          {/* View All Button */}
          {limit && (
            <div className="row mt-5">
              <div className="col-12 text-center">
                <Link
                  to="/gallery"
                  className="btn btn-custom-red px-5 py-2 fw-bold text-uppercase small"
                >
                  View Full Gallery
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>

          <button
            className="lightbox-prev"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayItems[lightboxIndex].img}
              alt={
                displayItems[lightboxIndex].alt ||
                displayItems[lightboxIndex].title
              }
              className="lightbox-img shadow-lg"
            />
            <div className="lightbox-caption p-3">
              <h4 className="fw-bold text-white mb-1">
                {displayItems[lightboxIndex].title}
              </h4>
              <p className="text-white-50 small mb-0">
                {displayItems[lightboxIndex].desc}
              </p>
            </div>
          </div>

          <button
            className="lightbox-next"
            onClick={nextImage}
            aria-label="Next image"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
