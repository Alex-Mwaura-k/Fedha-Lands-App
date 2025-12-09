import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "../data/propertiesData";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (property) {
      setMainImage(property.img);
    }
  }, [id, property]);

  if (!property) {
    return (
      <div className="text-center py-5 mt-5">
        <h2>Property Not Found</h2>
      </div>
    );
  }

  const propertyImages = property.images || [property.img];

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  // Limit to 4 related properties as requested
  const relatedProperties = properties
    .filter((p) => p.id !== property.id)
    .slice(0, 4);

  return (
    <div
      className="property-details-page bg-light pb-5"
      style={{ paddingTop: "20px" }}
    >
      {/* HEADER */}
      <div className="container-md mb-4">
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
        {/* 'align-items-stretch' ensures both columns are equal height */}
        <div className="row g-4 align-items-stretch">
          {/* LEFT COLUMN */}
          {/* 'd-flex flex-column' allows us to push the Map to the bottom */}
          <div className="col-lg-8 d-flex flex-column">
            {/* 1. GALLERY */}
            <div className="property-gallery-wrapper bg-white p-1 rounded shadow-sm">
              <div
                className="main-image-container"
                style={{
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
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
                  className="w-100 object-fit-cover"
                  style={{
                    maxHeight: "500px",
                    minHeight: "300px",
                    transition: "0.3s",
                  }}
                />
                <div className="position-absolute bottom-0 end-0 m-3">
                  <span className="badge bg-dark">
                    <i className="bi bi-arrows-fullscreen"></i> View Fullscreen
                  </span>
                </div>
              </div>

              <div className="thumbnails-container d-flex gap-2 mt-2 overflow-auto py-2">
                {propertyImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`View ${index + 1}`}
                    className={`thumbnail-img rounded ${
                      mainImage === img ? "active-thumb" : ""
                    }`}
                    onClick={() => setMainImage(img)}
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
                  />
                ))}
              </div>
            </div>

            {/* 2. DESCRIPTION */}
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

            {/* 3. MAP (mt-auto pushes this to the bottom of the left column) */}
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
          {/* 'd-flex flex-column' allows us to push Related Properties to the bottom */}
          <div className="col-lg-4 d-flex flex-column">
            {/* 1. PRICE CARD (Static, not sticky) */}
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
                <a
                  href="tel:+254715113103"
                  className="btn btn-outline-secondary py-2 fw-bold"
                >
                  <i className="bi bi-telephone me-2"></i> Call Now
                </a>
              </div>
            </div>

            {/* 2. RELATED PROPERTIES (mt-auto pushes this to the bottom of the right column) */}
            <div className="mt-4 mt-auto">
              <h5 className="fw-bold mb-3 text-dark">More Properties</h5>
              <div className="d-flex flex-column gap-3">
                {relatedProperties.map((rel) => (
                  <div
                    key={rel.id}
                    className="card property-card h-100 border-0 shadow-sm"
                  >
                    <div className="position-relative">
                      <img
                        src={rel.img}
                        className="card-img-top"
                        alt={rel.title}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                        Ksh {rel.price}
                      </span>
                    </div>
                    <div className="card-body">
                      <h6 className="card-title fw-bold">{rel.title}</h6>
                      <Link
                        to={`/property/${rel.id}`}
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

      {/* --- LIGHTBOX OVERLAY --- */}
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
              src={propertyImages[lightboxIndex]}
              alt={`View ${lightboxIndex}`}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <p className="mb-0">
                {lightboxIndex + 1} / {propertyImages.length}
              </p>
            </div>
          </div>
          <button className="lightbox-next" onClick={nextImage}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
