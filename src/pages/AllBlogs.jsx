import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Blog from "../components/Blog";
import { blogData } from "../data/blogData";

const AllBlogs = () => {
  // STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);

  // Categories
  const categories = ["All", ...new Set(blogData.map((item) => item.category))];

  // FILTER LOGIC
  useEffect(() => {
    let results = blogData;

    if (selectedCategory !== "All") {
      results = results.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      results = results.filter((item) =>
        item.title.toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredBlogs(results);
  }, [searchTerm, selectedCategory]);

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
      <Helmet>
        <title>Blogs Center</title>
        <meta name="description" content="Latest real estate news." />
        <link rel="canonical" href="https://fedha.netlify.app/blogs" />
      </Helmet>

      <div className="container-md mb-4">
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-danger text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Blogs Center
            </li>
          </ol>
        </nav>

        {/* HEADER & FILTERS */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <h1 className="fw-bold text-dark mb-1">Blogs Center</h1>
            <p className="text-muted mb-0">
              Stay updated with the latest news, guides, and videos.
            </p>
          </div>

          <div className="d-flex gap-2">
            <select
              className="form-select shadow-sm"
              style={{ width: "auto", minWidth: "130px" }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Search..."
              style={{ maxWidth: "200px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* IMPORTANT: Pass the filtered data to the component */}
      <Blog customData={filteredBlogs} />
    </div>
  );
};

export default AllBlogs;
