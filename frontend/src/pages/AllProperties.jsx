import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Properties from "../components/Properties";
import api from "../api/axios"; // Secure API

const AllProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Data State
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data from Django API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/properties/");
        setAllProperties(response.data);
        setFilteredProperties(response.data); // Initial load
      } catch (error) {
        console.error("Error loading properties", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Maintain original filtering logic (Applied to fetched data)
  useEffect(() => {
    let results = allProperties;

    if (filterStatus !== "All") {
      results = results.filter((item) => item.status === filterStatus);
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerTerm) ||
          item.location.toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredProperties(results);
  }, [searchTerm, filterStatus, allProperties]);

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
      <Helmet>
        <title>Our Properties</title>
        <meta
          name="description"
          content="Browse our complete portfolio of prime land for sale in Kenya. Verified plots with ready title deeds in Machakos, Malindi, and Mwea."
        />
        <link rel="canonical" href="https://fedha.netlify.app/properties" />
      </Helmet>

      {/* --- HEADER CONTAINER (Boxed content) --- */}
      <div className="container-md mb-4">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-danger text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Properties
            </li>
          </ol>
        </nav>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h1 className="fw-bold text-dark mb-1">Our Prime Properties</h1>
            <p className="text-muted mb-0">
              Browse our complete portfolio of prime land in Kenya.
            </p>
          </div>

          <div className="d-flex gap-2">
            <select
              className="form-select shadow-sm"
              style={{ width: "auto", minWidth: "130px" }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>

            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search location or title..."
              style={{ maxWidth: "200px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* --- END OF CONTAINER --- */}

      <hr className="mt-0 mb-4" />

      {/* --- PROPERTIES LIST --- */}
      {loading ? (
        <div className="container text-center">Loading properties...</div>
      ) : (
        <Properties customData={filteredProperties} />
      )}
    </div>
  );
};

export default AllProperties;
