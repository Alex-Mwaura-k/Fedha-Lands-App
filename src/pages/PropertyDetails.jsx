import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "../data/propertiesData";

const PropertyDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const property = properties.find((p) => p.id === parseInt(id));

  // Auto-scroll to top when opening a new property
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="text-center py-5 mt-5">
        <h2>Property Not Found</h2>
      </div>
    );
  }

  return (
    <div
      className="property-details-page bg-light pb-5"
      style={{ paddingTop: "80px" }}
    >
      {/* 1. Header / Breadcrumb */}
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
        <div className="row g-4">
          {/* Left Column: Image, Description, Map */}
          <div className="col-lg-8">
            <div className="rounded-3 overflow-hidden shadow-sm bg-white p-1">
              <img
                src={property.img}
                alt={property.title}
                className="w-100 object-fit-cover"
                style={{ maxHeight: "500px" }}
              />
            </div>

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

            {/* Map Section */}
            {property.mapSrc && (
              <div className="bg-white p-4 mt-4 rounded shadow-sm">
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

          {/* Right Column: Sticky Price Card */}
          <div className="col-lg-4">
            <div
              className="bg-white p-4 rounded shadow-lg sticky-top"
              style={{ top: "100px", zIndex: 900 }}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
