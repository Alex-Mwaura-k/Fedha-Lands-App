import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios"; // Secure API

const PropertyDetails = () => {
  const { slug } = useParams();

  // State
  const [property, setProperty] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carousel State
  const [mainImage, setMainImage] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // --- 1. CRASH-PROOF URL FIXER ---
  const getImageUrl = (path) => {
    if (!path) return null;

    // Handle object inputs (backend might send {image: "..."})
    if (typeof path === "object") {
      path = path.image || path.url || "";
    }

    // Clean string
    if (typeof path === "string") {
      path = path.trim();
    }

    if (!path || path === "null" || path === "undefined") return null;

    // If it's already a full link (Cloudinary/AWS), use it
    if (path.startsWith("http")) return path;

    // SAFEGUARD: Define Base URL safely to prevent White Screen Crash
    let baseUrl = "http://127.0.0.1:8000"; // Default Fallback

    // Check if Env variable exists before using it
    if (import.meta.env && import.meta.env.VITE_MEDIA_URL) {
      baseUrl = import.meta.env.VITE_MEDIA_URL;
    }

    // Format: Remove trailing slash from domain, ensure leading slash on path
    baseUrl = baseUrl.replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`;
  };

  // 2. FETCH DATA
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPropertyData = async () => {
      try {
        const response = await api.get("/properties/");
        const allProps = response.data;

        const foundProperty = allProps.find((p) => p.slug === slug);
        setProperty(foundProperty);

        if (foundProperty) {
          // Set initial main image using the smart fixer
          setMainImage(getImageUrl(foundProperty.img));
          setRelatedProperties(
            allProps.filter((p) => p.slug !== slug).slice(0, 4)
          );
        }
      } catch (error) {
        console.error("Error fetching details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyData();
  }, [slug]);

  // --- 3. ERROR-PROOF IMAGE LIST ---
  const propertyImages = useMemo(() => {
    if (!property) return [];

    // 1. Get Cover Image
    const cover = getImageUrl(property.img);

    // 2. Get Gallery Images
    let gallery = [];
    if (Array.isArray(property.images)) {
      gallery = property.images.map((item) => getImageUrl(item));
    }

    // 3. Combine -> Filter Nulls -> Remove Duplicates
    const allImages = [cover, ...gallery].filter((url) => url);
    return [...new Set(allImages)];
  }, [property]);

  // --- AUTO-CAROUSEL ---
  useEffect(() => {
    if (propertyImages.length <= 1 || lightboxIndex !== null || isPaused)
      return;

    const interval = setInterval(() => {
      setMainImage((prev) => {
        const currentIndex = propertyImages.indexOf(prev);
        if (currentIndex === -1) return propertyImages[0];
        const nextIndex = (currentIndex + 1) % propertyImages.length;
        return propertyImages[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [propertyImages, lightboxIndex, isPaused]);

  // --- MANUAL NAVIGATION ---
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

  // --- LIGHTBOX ---
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

  if (loading)
    return <div className="text-center mt-5">Loading Details...</div>;
  if (!property) {
    return (
      <div className="text-center py-5 mt-5">
        <h2>Property Not Found</h2>
        <Link to="/properties" className="btn btn-dark mt-3">
          Back to Listings
        </Link>
      </div>
    );
  }

  // UPDATED: Schema now uses raw numeric string, display uses formatted commas
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: property.title,
    image: getImageUrl(property.img),
    description: property.metaDescription || property.description,
    brand: { "@type": "Brand", name: "Fedha Land Ventures" },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "KES",
      // Keep price as a clean number string for Google
      price: property.price ? property.price.toString() : "0",
      availability:
        property.status === "Available"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return (
    <div className="property-details-page bg-light pb-5">
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>

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
            <li className="breadcrumb-item active">{property.title}</li>
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
            {/* GALLERY WRAPPER */}
            <div
              className="property-gallery-wrapper bg-white p-1 rounded shadow-sm"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* MAIN IMAGE */}
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
                  src={mainImage || propertyImages[0]}
                  alt={property.title}
                  className="w-100 object-fit-cover"
                  style={{
                    maxHeight: "500px",
                    minHeight: "300px",
                    transition: "opacity 0.5s ease",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

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

              {/* THUMBNAILS */}
              {propertyImages.length > 1 && (
                <div className="thumbnails-container d-flex gap-2 mt-2 overflow-auto py-2">
                  {propertyImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`View ${index + 1}`}
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
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* DESC & FEATURES */}
            <div className="bg-white p-4 mt-4 rounded shadow-sm">
              <h4 className="fw-bold mb-3 border-bottom pb-2">Description</h4>
              <p className="text-secondary" style={{ lineHeight: "1.8" }}>
                {property.description}
              </p>

              {property.features && property.features.length > 0 && (
                <>
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
                </>
              )}
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
                    title="Location"
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-lg-4 d-flex flex-column">
            <div className="bg-white p-4 rounded shadow-lg">
              {/* UPDATED: Price now formatted with commas */}
              <h3 className="text-danger fw-bold mb-1">
                Ksh{" "}
                {property.price ? Number(property.price).toLocaleString() : "0"}
                /=
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
                  href="tel:+254715113103"
                  className="btn btn-outline-dark py-2 fw-bold"
                >
                  <i className="bi bi-telephone-fill me-2"></i> Call Us
                </a>
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
                        src={getImageUrl(rel.img)}
                        loading="lazy"
                        className="card-img-top"
                        alt={rel.title}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="card-title fw-bold">{rel.title}</h6>
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
      {lightboxIndex !== null && propertyImages[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>
          {propertyImages.length > 1 && (
            <button className="lightbox-prev" onClick={prevLightboxImage}>
              <i className="bi bi-chevron-left"></i>
            </button>
          )}
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
          {propertyImages.length > 1 && (
            <button className="lightbox-next" onClick={nextLightboxImage}>
              <i className="bi bi-chevron-right"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
