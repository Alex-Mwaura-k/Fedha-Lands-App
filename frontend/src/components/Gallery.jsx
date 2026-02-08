import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Gallery = ({ limit }) => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // --- 1. FETCH DATA (Moved inside the component) ---
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Using the centralized api helper
        const response = await api.get("/gallery/");
        setGalleryItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // --- 2. FILTER & LIMIT ---
  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.type === filter);

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  useEffect(() => {
    if (!limit) {
      window.scrollTo(0, 0);
    }
  }, [limit]);

  // --- 3. LIGHTBOX LOGIC ---
  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === displayItems.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? displayItems.length - 1 : prev - 1,
    );
  };

  if (loading) return null; // Or a small spinner

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
                {["all", "property", "team", "poster"].map((type) => (
                  <button
                    key={type}
                    className={`filter-btn ${filter === type ? "active" : ""}`}
                    onClick={() => setFilter(type)}
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
            {displayItems.map((item, index) => (
              <div
                key={item.unique_id || index}
                className="col-lg-4 col-md-6 gallery-item show"
              >
                <div
                  className="gallery-card"
                  onClick={() => openLightbox(index)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={item.img}
                    alt={item.alt || item.title}
                    loading="lazy"
                  />
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <h6 className="text-uppercase text-danger fw-bold ls-2 mb-1">
                        {item.type === "poster" ? "Event" : item.type}
                      </h6>
                      <h4 className="text-white fw-bold">{item.title}</h4>
                      <p className="text-white-50 small">Click to View</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
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

      {/* Lightbox */}
      {lightboxIndex !== null && displayItems[lightboxIndex] && (
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
