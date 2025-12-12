import { useState } from "react";
import { Link } from "react-router-dom";
import { galleryData } from "../data/galleryData";

const Gallery = ({ limit }) => {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null); // Null means closed

  // 1. Filter Data
  const filteredItems =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.type === filter);

  // 2. Limit Data (If on Home Page)
  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  // --- LIGHTBOX HANDLERS ---
  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
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
      <section id="gallery" className="gallery-section">
        <div className="container-md">
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
              <div className="gallery-filters d-flex justify-content-lg-end justify-content-start gap-3 flex-wrap mt-3 mt-lg-0">
                <button
                  className={`filter-btn ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`filter-btn ${
                    filter === "property" ? "active" : ""
                  }`}
                  onClick={() => setFilter("property")}
                >
                  Properties
                </button>
                <button
                  className={`filter-btn ${filter === "team" ? "active" : ""}`}
                  onClick={() => setFilter("team")}
                >
                  Team
                </button>
                <button
                  className={`filter-btn ${
                    filter === "poster" ? "active" : ""
                  }`}
                  onClick={() => setFilter("poster")}
                >
                  Events
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="row g-3 gallery-container">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className="col-lg-4 col-md-6 gallery-item show"
              >
                <div
                  className="gallery-card"
                  onClick={() => openLightbox(index)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <h6 className="text-uppercase text-danger fw-bold ls-2 mb-1">
                        {item.type}
                      </h6>
                      <h4 className="text-white fw-bold">{item.title}</h4>
                      <p className="text-white-50 small">Click to View</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button (Only show if limited) */}
          {limit && (
            <div className="row mt-4">
              <div className="col-12 text-center">
                <Link to="/gallery" className="btn btn-custom-red px-3 py-1">
                  View Full Gallery
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>

          <button className="lightbox-prev" onClick={prevImage}>
            <i className="bi bi-chevron-left"></i>
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayItems[lightboxIndex].img}
              alt={displayItems[lightboxIndex].title}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <h4 className="fw-bold mb-1">
                {displayItems[lightboxIndex].title}
              </h4>
              <p className="text-white-50 small mb-0">
                {displayItems[lightboxIndex].desc}
              </p>
            </div>
          </div>

          <button className="lightbox-next" onClick={nextImage}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
