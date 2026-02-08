import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify"; // The only new import
import api from "../api/axios";

const ArticleDetails = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (typeof path === "object") path = path.image || path.url || "";
    if (typeof path === "string") path = path.trim();
    if (!path) return null;
    if (path.startsWith("http")) return path;

    // Logic change: Using Environment Variable instead of hardcoded IP
    let baseUrl = import.meta.env.VITE_MEDIA_URL || "http://127.0.0.1:8000";
    baseUrl = baseUrl.replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/blog/?slug=${slug}`);
        let data = res.data.results ? res.data.results : res.data;
        if (Array.isArray(data) && data.length > 0) {
          setArticle(data[0]);
        } else {
          setArticle(null);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching article:", err);
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div className="text-center py-5 mt-5">Loading...</div>;
  if (!article)
    return (
      <div className="text-center py-5 mt-5">
        <h2>Article Not Found</h2>
        <Link to="/blogs" className="btn btn-dark mt-3">
          Back to Blogs
        </Link>
      </div>
    );

  return (
    <div
      className="article-details-page bg-light pb-4"
      style={{ paddingTop: "20px" }}
    >
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        {article.image && (
          <meta property="og:image" content={getImageUrl(article.image)} />
        )}
      </Helmet>

      <div className="container-md">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-danger text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/blogs" className="text-danger text-decoration-none">
                Blogs Center
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-lg-12">
            <span className="badge bg-danger mb-2">
              {article.category_name}
            </span>
            <h1 className="fw-bold text-dark mb-1 text-center">
              {article.title}
            </h1>
            <p className="text-muted small mb-2 text-center">
              Posted on {formatDate(article.date_published)} by Admin
            </p>

            {getImageUrl(article.image) && (
              <div className="text-center mb-2">
                <img
                  src={getImageUrl(article.image)}
                  alt={article.title}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    maxHeight: "500px",
                    width: "auto",
                    maxWidth: "85%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {article.post_type === "video" && article.video_url && (
              <div
                className="ratio ratio-16x9 mb-5 mx-auto"
                style={{ maxWidth: "85%" }}
              >
                <iframe
                  src={article.video_url}
                  title={article.title}
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Added Sanitizer here */}
            <div
              className="article-content bg-white p-3 p-md-5 rounded shadow-sm"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content),
              }}
            />

            <div className="mt-4 text-center">
              <Link to="/blogs" className="btn btn-outline-dark px-4">
                <i className="bi bi-arrow-left me-2"></i> Back to Blogs Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
