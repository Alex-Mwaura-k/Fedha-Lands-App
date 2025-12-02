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
      className="article-details-page bg-light pb-5"
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
                Media Center
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <span className="badge bg-danger mb-2">{article.category}</span>
            <h1 className="fw-bold text-dark mb-3">{article.title}</h1>
            <p className="text-muted small mb-4">
              Posted on {article.date} by Admin
            </p>

            <div className="rounded-3 overflow-hidden shadow-sm mb-5">
              <img
                src={article.img}
                alt={article.title}
                className="w-100 object-fit-cover"
                style={{ maxHeight: "450px" }}
              />
            </div>

            {/* Injects the HTML content from data file */}
            <div
              className="article-content bg-white p-5 rounded shadow-sm"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-5 text-center">
              <Link to="/blogs" className="btn btn-outline-dark px-4">
                <i className="bi bi-arrow-left me-2"></i> Back to Media Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
