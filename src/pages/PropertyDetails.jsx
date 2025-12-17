import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "../data/propertiesData";

const PropertyDetails = () => {
  // 1. FIXED: Extract 'slug' from the URL (this must match path="/property/:slug" in App.jsx)
  const { slug } = useParams();

  // 2. FIXED: Find the property by matching the 'slug' string from your data
  const property = properties.find((p) => p.slug === slug);

  // Determine images (Fallback to cover image if no array)
  const propertyImages = property ? property.images || [property.img] : [];

  const [mainImage, setMainImage] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize
  useEffect(() => {
    window.scrollTo(0, 0);
    if (property) {
      setMainImage(property.img);
    }
  }, [slug, property]); // Dependency updated to slug

  // --- AUTO-CAROUSEL LOGIC ---
  useEffect(() => {
    if (propertyImages.length <= 1 || lightboxIndex !== null || isPaused)
      return;

    const interval = setInterval(() => {
      setMainImage((prev) => {
        const currentIndex = propertyImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % propertyImages.length;
        return propertyImages[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [propertyImages, lightboxIndex, isPaused]);

  // --- MANUAL NAVIGATION HANDLERS ---
  const handlePrevMain = (e) => {
    e.stopPropagation();
    setIsPaused(true);
    const currentIndex = propertyImages.indexOf(mainImage);
    const prevIndex =
      currentIndex <= 0 ? propertyImages.length - 1 : currentIndex - 1;
    setMainImage(propertyImages[prevIndex]);
  };

  const handleNextMain = (e) => {
    e.stopPropagation();
    setIsPaused(true);
    const currentIndex = propertyImages.indexOf(mainImage);
    const nextIndex = (currentIndex + 1) % propertyImages.length;
    setMainImage(propertyImages[nextIndex]);
  };

  if (!property) {
    return (
      <div className="text-center py-5 mt-5">
        <h2>Property Not Found</h2>
        <p className="text-muted small">Requested: {slug}</p>
        <Link to="/properties" className="btn btn-dark mt-3">
          Back to Listings
        </Link>
      </div>
    );
  }

  // SEO RECOMMENDATION: JSON-LD Schema Logic
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: property.title,
    image: window.location.origin + property.img,
    description: property.metaDescription || property.description,
    brand: {
      "@type": "Brand",
      name: "Fedha Land Ventures",
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "KES",
      price: property.price.replace(/,/g, ""),
      availability:
        property.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  // Lightbox Handlers
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextLightboxImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevLightboxImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  // 3. FIXED: Filter related properties using slugs to match new routing
  const relatedProperties = properties
    .filter((p) => p.slug !== property.slug)
    .slice(0, 4);

  return (
    <div className="property-details-page bg-light pb-5">
      {/* SEO rich snippet script */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>

      {/* HEADER */}
      <div className="container-md mb-4 pt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-danger text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to="/properties"
                className="text-danger text-decoration-none"
              >
                Properties
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {property.title}
            </li>
          </ol>
        </nav>
        <h1 className="fw-bold text-dark">{property.title}</h1>
        <div className="d-flex align-items-center gap-3 text-muted">
          <span>
            <i className="bi bi-geo-alt-fill text-danger"></i>{" "}
            {property.location}
          </span>
          <span>
            <i className="bi bi-aspect-ratio text-danger"></i> {property.size}
          </span>
          <span
            className={`badge ${
              property.status === "Available" ? "bg-success" : "bg-danger"
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>

      <div className="container-md">
        <div className="row g-4 align-items-stretch">
          {/* LEFT COLUMN */}
          <div className="col-lg-8 d-flex flex-column">
            {/* GALLERY SECTION */}
            <div
              className="property-gallery-wrapper bg-white p-1 rounded shadow-sm"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Main Image Container */}
              <div
                className="main-image-container position-relative overflow-hidden rounded"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  openLightbox(
                    propertyImages.indexOf(mainImage) !== -1
                      ? propertyImages.indexOf(mainImage)
                      : 0
                  )
                }
              >
                <img
                  src={mainImage}
                  alt={property.title}
                  loading="lazy"
                  className="w-100 object-fit-cover"
                  style={{
                    maxHeight: "500px",
                    minHeight: "300px",
                    transition: "opacity 0.5s ease-in-out",
                  }}
                />

                {/* NAVIGATION BUTTONS */}
                {propertyImages.length > 1 && (
                  <>
                    <button
                      className="img-nav-btn prev"
                      onClick={handlePrevMain}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                      className="img-nav-btn next"
                      onClick={handleNextMain}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </>
                )}

                <div className="position-absolute bottom-0 end-0 m-3">
                  <span className="badge bg-dark">
                    <i className="bi bi-arrows-fullscreen"></i> View Fullscreen
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="thumbnails-container d-flex gap-2 mt-2 overflow-auto py-2">
                {propertyImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`View ${index + 1}`}
                    loading="lazy"
                    className={`thumbnail-img rounded ${
                      mainImage === img ? "active-thumb" : ""
                    }`}
                    onClick={() => {
                      setMainImage(img);
                      setIsPaused(true);
                    }}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        mainImage === img
                          ? "2px solid red"
                          : "2px solid transparent",
                      opacity: mainImage === img ? 1 : 0.6,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white p-4 mt-4 rounded shadow-sm">
              <h4 className="fw-bold mb-3 border-bottom pb-2">Description</h4>
              <p className="text-secondary" style={{ lineHeight: "1.8" }}>
                {property.description}
              </p>
              <h5 className="fw-bold mt-4 mb-3">Property Features</h5>
              <div className="row g-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="col-md-6">
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-success"></i>
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP */}
            {property.mapSrc && (
              <div className="bg-white p-4 mt-4 rounded shadow-sm mt-auto">
                <h4 className="fw-bold mb-3 border-bottom pb-2">
                  Location Map
                </h4>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={property.mapSrc}
                    allowFullScreen=""
                    loading="lazy"
                    title="Property Location"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-4 d-flex flex-column">
            {/* PRICE CARD */}
            <div className="bg-white p-4 rounded shadow-lg">
              <h3 className="text-danger fw-bold mb-1">
                Ksh {property.price}/=
              </h3>
              <p className="text-muted small">
                Cash Price (Installment options available)
              </p>
              <hr />
              <div className="d-grid gap-3">
                <button
                  className="btn btn-dark py-3 fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#booking-Modal"
                >
                  Book Site Visit
                </button>
                <a
                  href={`https://wa.me/254715113103?text=Hi, I am interested in ${property.title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-success py-2 fw-bold"
                >
                  <i className="bi bi-whatsapp me-2"></i> WhatsApp Us
                </a>
              </div>
            </div>

            {/* RELATED PROPERTIES */}
            <div className="mt-4 mt-auto">
              <h5 className="fw-bold mb-3 text-dark">More Properties</h5>
              <div className="d-flex flex-column gap-3">
                {relatedProperties.map((rel) => (
                  <div
                    key={rel.slug}
                    className="card property-card h-100 border-0 shadow-sm"
                  >
                    <div className="position-relative">
                      <img
                        src={rel.img}
                        loading="lazy"
                        className="card-img-top"
                        alt={rel.title}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="card-title fw-bold">{rel.title}</h6>
                      {/* FIXED: Links must use slug to match new routing */}
                      <Link
                        to={`/property/${rel.slug}`}
                        className="btn btn-sm btn-outline-danger mt-2 stretched-link w-100"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX OVERLAY */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>
          <button className="lightbox-prev" onClick={prevLightboxImage}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={propertyImages[lightboxIndex]}
              alt="Fullscreen"
              className="lightbox-img"
            />
          </div>
          <button className="lightbox-next" onClick={nextLightboxImage}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
