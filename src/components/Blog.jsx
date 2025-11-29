const Blog = () => {
  return (
    <section id="blog" className="blog-section bg-white">
      <div className="container-md">
        {/* Header */}
        <div className="row mb-2 align-items-end">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <span className="text-danger fw-bold text-uppercase small ls-2">
              Media Center
            </span>
            <h2 className="display-5 fw-bold text-dark mt-1">
              Blogs & <span className="text-outline-red-dark">Updates</span>
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
                  className="form-control rounded-0"
                  placeholder="Email Subscribe Newsletter..."
                  required
                />
                <button type="submit" className="btn btn-dark rounded-0 px-3">
                  <i className="bi bi-envelope-fill"></i>
                </button>
              </form>

              <a
                href="https://www.youtube.com/@fedhalandventures"
                target="_blank"
                className="btn btn-outline-danger rounded-0 px-4 text-nowrap"
              >
                <i className="bi bi-youtube me-2"></i> Subscribe
              </a>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Main Content Area */}
          <div className="col-lg-9">
            <div className="row g-4">
              {/* Video Card 1 */}
              <div className="col-md-6 col-lg-4">
                <div className="media-card video-card h-100 d-flex flex-column">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src="https://www.youtube.com/embed/4MR3tvUfbuY?rel=0"
                      title="Fadhili Gardens"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="media-body flex-grow-1 d-flex flex-column">
                    <div className="badge bg-danger mb-2 align-self-start rounded-0">
                      Virtual Tour
                    </div>
                    <h6 className="fw-bold text-dark mb-2">
                      Fadhili Gardens Phase II
                    </h6>
                    <p className="text-muted small mb-3 flex-grow-1 text-truncate-3">
                      Explore the beacons, access roads, and the serene
                      environment of our Makutano project.
                    </p>
                    <a
                      href="https://www.youtube.com/@fedhalandventures"
                      target="_blank"
                      className="arrow-link mt-auto"
                    >
                      Watch Video <i className="bi bi-play-circle-fill"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Article Card 1 */}
              <div className="col-md-6 col-lg-4">
                <article className="media-card article-card h-100 d-flex flex-column">
                  <div className="ratio ratio-16x9 img-wrapper border-bottom-red">
                    <img
                      src="https://picsum.photos/id/48/600/400"
                      alt="Investment"
                      className="object-fit-cover"
                    />
                    <div className="hover-overlay">
                      <span className="read-btn">Read Article</span>
                    </div>
                  </div>
                  <div className="media-body flex-grow-1 d-flex flex-column">
                    <span className="text-danger small fw-bold text-uppercase">
                      Investment
                    </span>
                    <h5 className="fw-bold text-dark mt-2 text-truncate-2">
                      Why 50x100 Plots are the Best Starter Investment
                    </h5>
                    <p className="text-muted small mt-2 mb-3 flex-grow-1 text-truncate-3">
                      Understanding the ROI on standard plot sizes in developing
                      satellite towns like Kitengela.
                    </p>
                    <a href="#" className="arrow-link mt-auto">
                      Read More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </article>
              </div>

              {/* Video Card 2 */}
              <div className="col-md-6 col-lg-4">
                <div className="media-card video-card h-100 d-flex flex-column">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src="https://www.youtube.com/embed/7nbOFYnpG3o?rel=0"
                      title="Testimonial"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="media-body flex-grow-1 d-flex flex-column">
                    <div className="badge bg-dark mb-2 align-self-start rounded-0">
                      Testimonial
                    </div>
                    <h6 className="fw-bold text-dark mb-2">
                      Client Success Story
                    </h6>
                    <p className="text-muted small mb-3 flex-grow-1 text-truncate-3">
                      "I received my Title Deed in just 30 days." Hear from our
                      happy investors.
                    </p>
                    <a
                      href="https://www.youtube.com/@fedhalandventures"
                      target="_blank"
                      className="arrow-link mt-auto"
                    >
                      Watch Video <i className="bi bi-play-circle-fill"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Article 2 */}
              <div className="col-md-6 col-lg-4">
                <article className="media-card article-card h-100 d-flex flex-column">
                  <div className="ratio ratio-16x9 img-wrapper border-bottom-red">
                    <img
                      src="/img/Blogs/Title Deeds.png"
                      alt="Legal"
                      className="object-fit-cover"
                    />
                    <div className="hover-overlay">
                      <span className="read-btn">Read Article</span>
                    </div>
                  </div>
                  <div className="media-body flex-grow-1 d-flex flex-column">
                    <span className="text-danger small fw-bold text-uppercase">
                      Legal
                    </span>
                    <h5 className="fw-bold text-dark mt-2 text-truncate-2">
                      How to Verify a Title Deed Search Online
                    </h5>
                    <p className="text-muted small mt-2 mb-3 flex-grow-1 text-truncate-3">
                      A step-by-step guide to using the e-Citizen portal for
                      land searches.
                    </p>
                    <a href="#" className="arrow-link mt-auto">
                      Read More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </article>
              </div>

              {/* Video 3 */}
              <div className="col-md-6 col-lg-4">
                <div className="media-card video-card h-100 d-flex flex-column">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src="https://www.youtube.com/embed/m9aMmy6gaMk?si=CuSdK8_tXfKMJHD2"
                      title="Launch"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="media-body flex-grow-1 d-flex flex-column">
                    <div className="badge bg-danger mb-2 align-self-start rounded-0">
                      Event
                    </div>
                    <h6 className="fw-bold text-dark mb-2">
                      Ufanisi Haven Launch
                    </h6>
                    <p className="text-muted small mb-3 flex-grow-1 text-truncate-3">
                      Highlights from our grand opening event in Kitengela. See
                      the turnout!
                    </p>
                    <a
                      href="https://www.youtube.com/@fedhalandventures"
                      target="_blank"
                      className="arrow-link mt-auto"
                    >
                      Watch Video <i className="bi bi-play-circle-fill"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Article 3 */}
              <div className="col-md-6 col-lg-4">
                <article className="media-card article-card h-100 d-flex flex-column">
                  <div className="ratio ratio-16x9 img-wrapper border-bottom-red">
                    <img
                      src="https://picsum.photos/id/60/600/400"
                      alt="Construction"
                      className="object-fit-cover"
                    />
                    <div className="hover-overlay">
                      <span className="read-btn">Read Article</span>
                    </div>
                  </div>
                  <div className="media-body flex-grow-1 d-flex flex-column">
                    <span className="text-danger small fw-bold text-uppercase">
                      Tips
                    </span>
                    <h5 className="fw-bold text-dark mt-2 text-truncate-2">
                      Fencing Materials Guide
                    </h5>
                    <p className="text-muted small mt-2 mb-3 flex-grow-1 text-truncate-3">
                      Choosing between concrete poles and treated timber for
                      longevity.
                    </p>
                    <a href="#" className="arrow-link mt-auto">
                      Read More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="sidebar-sticky">
              <h5 className="fw-bold text-dark mb-3 border-start border-4 border-danger ps-2">
                Recommended
              </h5>
              <div className="list-group list-group-flush">
                {[
                  "Land Appreciation Rates 2025",
                  "Diaspora Investment Guide",
                  "Understanding Freehold vs Leasehold",
                  "Top 3 Locations for Agribusiness",
                ].map((item, index) => (
                  <a
                    href="#"
                    key={index}
                    className="list-group-item list-group-item-action bg-transparent border-0 px-0 py-3 border-bottom"
                  >
                    <div className="d-flex align-items-center">
                      <span className="text-danger fw-bold fs-4 me-3">
                        0{index + 1}
                      </span>
                      <div>
                        <h6 className="mb-1 text-dark fw-bold small">{item}</h6>
                        <small className="text-muted">Read Article</small>
                      </div>
                    </div>
                  </a>
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

        {/* View All Button (Small Style) */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <a href="#" className="btn btn-custom-red px-3 py-1">
              View All Articles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
