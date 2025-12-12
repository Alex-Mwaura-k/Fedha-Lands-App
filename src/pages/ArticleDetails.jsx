import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogData } from "../data/blogData";

const ArticleDetails = () => {
  const { id } = useParams();
  const article = blogData.find((item) => item.id === parseInt(id));

  // Scroll to top when opening
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="text-center py-5 mt-5">
        <h2>Article Not Found</h2>
      </div>
    );
  }

  return (
    <div
      className="article-details-page bg-light pb-4"
      style={{ paddingTop: "20px" }}
    >
      <div className="container-md">
        {/* Breadcrumb */}
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
            <span className="badge bg-danger mb-2">{article.category}</span>
            <h1 className="fw-bold text-dark mb-1 text-center">
              {article.title}
            </h1>
            <p className="text-muted small mb-2 text-center">
              Posted on {article.date} by Admin
            </p>

            {/* --- IMAGE ADJUSTMENT START --- */}
            {/* Added 'text-center' to parent to align the image */}
            <div className="text-center mb-2">
              <img
                src={article.img}
                alt={article.title}
                // Removed 'w-100' behavior by handling width in style
                className="img-fluid rounded shadow-sm"
                style={{
                  maxHeight: "500px",
                  width: "auto",
                  maxWidth: "85%",
                  objectFit: "cover",
                }}
              />
            </div>
            {/* --- IMAGE ADJUSTMENT END --- */}

            {/* Injects the HTML content from data file */}
            <div
              className="article-content bg-white p-3 p-md-5 rounded shadow-sm"
              dangerouslySetInnerHTML={{ __html: article.content }}
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
