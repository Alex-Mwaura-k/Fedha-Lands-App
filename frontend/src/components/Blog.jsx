import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Toast from "../components/Toast";
import { COMPANY_DATA } from "../data/contactData";

const Blog = ({ limit, customData }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!customData) {
      const fetchBlogs = async () => {
        try {
          const response = await api.get("/blog/");
          setBlogs(response.data.results || response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blogs:", error);
          setLoading(false);
        }
      };
      fetchBlogs();
    }
  }, [customData]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("sending");

    try {
      await api.post("/subscribe/", { email });
      setSubStatus("success");
      setToastMessage("Successfully subscribed to updates!");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setSubStatus("error");

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setToastMessage(error.response.data.message);
      } else {
        setToastMessage("Subscription failed. Please try again.");
      }
    }
  };

  let displayItems = customData || blogs;

  if (limit && !customData) {
    displayItems = blogs.slice(0, limit);
  }

  if (loading && !customData) {
    return <div className="text-center py-5">Loading Updates...</div>;
  }

  return (
    <section id="blog" className="blog-section bg-white">
      <Toast
        status={subStatus}
        message={toastMessage}
        onClose={() => setSubStatus("idle")}
      />

      <div className="container-md">
        {limit && !customData && (
          <div className="row mb-4 align-items-end">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <span className="text-danger fw-bold text-uppercase small ls-2">
                Media Center
              </span>
              <h2 className="display-5 fw-bold text-dark mt-1">
                Blogs & <span className="text-stroke-red">Updates</span>
              </h2>
            </div>

            <div className="col-lg-7">
              <div className="d-flex flex-column flex-md-row justify-content-lg-end align-items-md-center gap-3 mb-3">
                <div className="d-flex flex-column">
                  <form
                    className="newsletter-form d-flex"
                    onSubmit={handleSubscribe}
                  >
                    <input
                      type="email"
                      id="blogEmail"
                      className="form-control rounded-0"
                      placeholder="Email Subscribe..."
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Email address for subscription"
                    />
                    <button
                      type="submit"
                      className="btn btn-dark rounded-0 px-3"
                      disabled={subStatus === "sending"}
                      aria-label="Subscribe to newsletter"
                    >
                      {subStatus === "sending" ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <i className="bi bi-envelope-fill"></i>
                      )}
                    </button>
                  </form>
                </div>

                <a
                  href={COMPANY_DATA.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-danger rounded-0 px-4 text-nowrap"
                >
                  <i className="bi bi-youtube me-2"></i> Subscribe
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-9">
            <div className="row g-4">
              {displayItems.length === 0 && (
                <div className="col-12 text-center py-5">
                  <h4 className="text-muted">No results found.</h4>
                </div>
              )}

              {displayItems.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4">
                  {item.post_type === "video" ? (
                    <div className="media-card video-card h-100 d-flex flex-column">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={item.video_url}
                          title={item.title}
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                      <div className="media-body flex-grow-1 d-flex flex-column">
                        <div className="badge bg-danger mb-2 align-self-start rounded-0">
                          {item.category_name}
                        </div>
                        <h6 className="fw-bold text-dark mb-2">{item.title}</h6>
                        <p className="text-muted small mb-3 flex-grow-1 text-truncate-3">
                          {item.description}
                        </p>
                        <a
                          href={item.video_url}
                          target="_blank"
                          rel="noreferrer"
                          className="arrow-link mt-auto"
                          aria-label={`Watch video: ${item.title}`}
                        >
                          Watch Video <i className="bi bi-play-circle-fill"></i>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <article className="media-card article-card h-100 d-flex flex-column">
                      <Link to={`/article/${item.slug}`}>
                        <div className="ratio ratio-16x9 img-wrapper border-bottom-red">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-fit-cover"
                            loading="lazy"
                          />
                          <div className="hover-overlay">
                            <span className="read-btn">Read Article</span>
                          </div>
                        </div>
                      </Link>
                      <div className="media-body flex-grow-1 d-flex flex-column">
                        <span className="text-danger small fw-bold text-uppercase">
                          {item.category_name}
                        </span>
                        <h5 className="fw-bold text-dark mt-2 text-truncate-2">
                          <Link
                            to={`/article/${item.slug}`}
                            className="text-dark text-decoration-none"
                          >
                            {item.title}
                          </Link>
                        </h5>
                        <p className="text-muted small mt-2 mb-3 flex-grow-1 text-truncate-3">
                          {item.description}
                        </p>
                        <Link
                          to={`/article/${item.slug}`}
                          className="arrow-link mt-auto"
                        >
                          Read More{" "}
                          <span className="visually-hidden">
                            {" "}
                            about {item.title}
                          </span>{" "}
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </article>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-3">
            <div className="sidebar-sticky" style={{ top: "100px" }}>
              <h5 className="fw-bold text-dark mb-3 border-start border-4 border-danger ps-2">
                Recommended
              </h5>
              <div className="list-group list-group-flush mb-4">
                {blogs
                  .filter((i) => i.post_type === "article")
                  .slice(0, 4)
                  .map((item, index) => (
                    <Link
                      to={`/article/${item.slug}`}
                      key={item.id}
                      className="list-group-item bg-transparent border-0 px-0 py-3 border-bottom"
                      aria-label={`Read article: ${item.title}`}
                    >
                      <div className="d-flex align-items-center">
                        <span className="text-danger fw-bold fs-4 me-3">
                          0{index + 1}
                        </span>
                        <div>
                          <h6 className="mb-1 text-dark fw-bold small text-truncate-2">
                            {item.title}
                          </h6>
                          <small className="text-muted">Read Article</small>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              <div className="mt-4 p-3 bg-dark text-white text-center">
                <p className="small mb-2">Ready to visit?</p>
                <button
                  className="btn btn-outline-danger btn-sm w-100 rounded-0"
                  data-bs-toggle="modal"
                  data-bs-target="#booking-Modal"
                >
                  Book Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>

        {limit && !customData && (
          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link to="/blogs" className="btn btn-custom-red px-3 py-1">
                View All Articles
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
