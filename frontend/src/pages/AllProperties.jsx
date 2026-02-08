import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Properties from "../components/Properties";
import api from "../api/axios";
// Optional: Import your constant if you want to use COMPANY_DATA.name
// import { COMPANY_DATA } from "../data/contactData";

const AllProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/properties/");
        setAllProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error("Error loading properties", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
          item.location.toLowerCase().includes(lowerTerm),
      );
    }

    setFilteredProperties(results);
  }, [searchTerm, filterStatus, allProperties]);

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
      {/* --- FIXED SEO SECTION --- */}
      <Helmet>
        <title>Our Properties</title>
        <meta
          name="description"
          // Updated to be country-wide as requested
          content="Browse our complete portfolio of prime land for sale across Kenya. Verified plots with ready title deeds and flexible payment plans."
        />
        {/* Fixed: Uses your actual domain */}
        <link
          rel="canonical"
          href="https://fedhalandventures.co.ke/properties"
        />
        <meta
          property="og:title"
          content="Prime Properties for Sale in Kenya"
        />
        <meta
          property="og:url"
          content="https://fedhalandventures.co.ke/properties"
        />
      </Helmet>
      {/* ------------------------- */}

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
              id="status-filter"
              name="status"
              aria-label="Filter properties by status"
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
              id="property-search"
              name="search"
              autoComplete="off"
              aria-label="Search properties"
            />
          </div>
        </div>
      </div>

      <hr className="mt-0 mb-4" />

      {loading ? (
        <div className="container text-center">Loading properties...</div>
      ) : (
        <Properties customData={filteredProperties} />
      )}
    </div>
  );
};

export default AllProperties;
