import React from "react";
import { Link } from "react-router-dom";
import { blogData } from "../data/blogData";

const Blog = ({ limit, customData }) => {
  let displayItems = customData || blogData;

  if (limit && !customData) {
    displayItems = blogData.slice(0, limit);
  }

  return (
    <section id="blog" className="blog-section bg-white">
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
                <form
                  className="newsletter-form d-flex"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    id="cEmail"
                    className="form-control rounded-0"
                    placeholder="Email Subscribe..."
                    required
                  />
                  <button type="submit" className="btn btn-dark rounded-0 px-3">
                    <i className="bi bi-envelope-fill"></i>
                  </button>
                </form>
                <a
                  href="https://www.youtube.com/@fedhalandventures"
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
                  {item.type === "video" ? (
                    <div className="media-card video-card h-100 d-flex flex-column">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={item.videoUrl}
                          title={item.title}
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                      <div className="media-body flex-grow-1 d-flex flex-column">
                        <div className="badge bg-danger mb-2 align-self-start rounded-0">
                          {item.category}
                        </div>
                        <h6 className="fw-bold text-dark mb-2">{item.title}</h6>
                        <p className="text-muted small mb-3 flex-grow-1 text-truncate-3">
                          {item.desc}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="arrow-link mt-auto"
                        >
                          Watch Video <i className="bi bi-play-circle-fill"></i>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <article className="media-card article-card h-100 d-flex flex-column">
                      {/* FIXED: Link uses slug */}
                      <Link to={`/article/${item.slug}`}>
                        <div className="ratio ratio-16x9 img-wrapper border-bottom-red">
                          <img
                            src={item.img}
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
                          {item.category}
                        </span>
                        <h5 className="fw-bold text-dark mt-2 text-truncate-2">
                          {/* FIXED: Link uses slug */}
                          <Link
                            to={`/article/${item.slug}`}
                            className="text-dark text-decoration-none"
                          >
                            {item.title}
                          </Link>
                        </h5>
                        <p className="text-muted small mt-2 mb-3 flex-grow-1 text-truncate-3">
                          {item.desc}
                        </p>
                        {/* FIXED: Link uses slug */}
                        <Link
                          to={`/article/${item.slug}`}
                          className="arrow-link mt-auto"
                        >
                          Read More <i className="bi bi-arrow-right"></i>
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
                {blogData
                  .filter((i) => i.type === "article")
                  .slice(0, 4)
                  .map((item, index) => (
                    /* FIXED: Link uses slug */
                    <Link
                      to={`/article/${item.slug}`}
                      key={item.id}
                      className="list-group-item bg-transparent border-0 px-0 py-3 border-bottom"
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
