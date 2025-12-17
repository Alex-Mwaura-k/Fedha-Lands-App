import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // Secure API

const Properties = ({ limit, customData }) => {
  const [fetchedProperties, setFetchedProperties] = useState([]);
  const [loading, setLoading] = useState(!customData);

  // --- CRASH-PROOF URL FIXER (Consistent with Details Page) ---
  const getImageUrl = (path) => {
    if (!path) return null;

    // Handle object inputs
    if (typeof path === "object") {
      path = path.image || path.url || "";
    }

    // Clean string
    if (typeof path === "string") {
      path = path.trim();
    }

    if (!path || path === "null" || path === "undefined") return null;

    // If it's already a full link, use it
    if (path.startsWith("http")) return path;

    // SAFEGUARD: Define Base URL safely
    let baseUrl = "http://127.0.0.1:8000";
    if (import.meta.env && import.meta.env.VITE_MEDIA_URL) {
      baseUrl = import.meta.env.VITE_MEDIA_URL;
    }

    baseUrl = baseUrl.replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    return `${baseUrl}${cleanPath}`;
  };

  useEffect(() => {
    // Only fetch if customData is NOT provided (e.g., Home Page)
    if (!customData) {
      const fetchProperties = async () => {
        try {
          const response = await api.get("/properties/");
          setFetchedProperties(response.data);
        } catch (error) {
          console.error("Error fetching properties:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProperties();
    }
  }, [customData]);

  // LOGIC: Use customData if exists, otherwise use fetched data
  const allProps = customData || fetchedProperties;

  const displayProperties = limit ? allProps.slice(0, limit) : allProps;

  if (loading && !customData)
    return <div className="text-center py-5">Loading properties...</div>;

  return (
    <section id="properties" className="container-md mt-2 mb-3">
      {/* Only show title on Home Page */}
      {limit && !customData && (
        <h1 className="text-start mb-3 h4">Featured Properties</h1>
      )}

      {/* Show "No Results" Message if list is empty */}
      {!loading && displayProperties.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No properties found.</h4>
        </div>
      )}

      <div className="row g-4 mb-3">
        {displayProperties.map((prop) => (
          <div key={prop.id} className="col-lg-4 col-md-6 col-sm-12">
            <Link
              to={`/property/${prop.slug}`}
              className="text-decoration-none text-dark"
            >
              <div className="card property-card h-100 border-0 fixed-height">
                <div className="position-relative overflow-hidden">
                  <img
                    src={getImageUrl(prop.img)}
                    className="card-img-top property-img"
                    alt={prop.title}
                    loading="lazy"
                    width="400"
                    height="300"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span
                    className={`badge position-absolute top-0 start-0 m-2 px-2 py-2 text-white ${
                      prop.status === "Available"
                        ? "bg-deep-green"
                        : "bg-deep-red"
                    }`}
                  >
                    {prop.status}
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{prop.title}</h5>
                  <div className="d-flex justify-content-end gap-3 text-muted small mb-2">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill me-1"></i>{" "}
                      {prop.location}
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-arrows-angle-expand me-1"></i>{" "}
                      {prop.size}
                    </div>
                  </div>

                  <p className="card-text small">
                    {prop.description.length > 100
                      ? `${prop.description.substring(0, 125)}...`
                      : prop.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    {/* UPDATED: Numeric price with automatic comma formatting */}
                    <span className="fw-bold text-danger">
                      Ksh{" "}
                      {prop.price ? Number(prop.price).toLocaleString() : "0"}/-
                    </span>
                    <span className="btn btn-custom-red btn-sm">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Show View All Button only on Home Page */}
      {limit && !customData && (
        <div className="text-center mt-4">
          <Link to="/properties" className="btn btn-custom-red px-3 py-1">
            View All Properties
          </Link>
        </div>
      )}
    </section>
  );
};

export default Properties;
