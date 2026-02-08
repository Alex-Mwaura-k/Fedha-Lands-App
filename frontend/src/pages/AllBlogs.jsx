import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Blog from "../components/Blog";
import api from "../api/axios";

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [blogRes, catRes] = await Promise.all([
          api.get("/blog/"),
          api.get("/categories/"),
        ]);

        const fetchedBlogs = blogRes.data.results
          ? blogRes.data.results
          : blogRes.data;
        const fetchedCategories = catRes.data.results
          ? catRes.data.results
          : catRes.data;

        const safeBlogs = Array.isArray(fetchedBlogs) ? fetchedBlogs : [];
        const safeCategories = Array.isArray(fetchedCategories)
          ? fetchedCategories
          : [];

        setBlogs(safeBlogs);
        setCategories(["All", ...safeCategories.map((c) => c.name)]);
        setFilteredBlogs(safeBlogs);
        setLoading(false);
      } catch (err) {
        console.error("Connection error:", err);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    let results = blogs;

    if (selectedCategory !== "All") {
      results = results.filter(
        (item) => item.category_name === selectedCategory
      );
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerTerm) ||
          item.description.toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredBlogs(results);
  }, [searchTerm, selectedCategory, blogs]);

  if (loading) return <div className="text-center py-5 mt-5">Loading...</div>;

  return (
    <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
      <Helmet>
        <title>Blogs Center</title>
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
              id="blog-category"
              name="category"
              aria-label="Filter blogs by category"
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
              id="blog-search"
              name="search"
              autoComplete="off"
              aria-label="Search blogs"
            />
          </div>
        </div>
      </div>

      <Blog customData={filteredBlogs} />
    </div>
  );
};

export default AllBlogs;
