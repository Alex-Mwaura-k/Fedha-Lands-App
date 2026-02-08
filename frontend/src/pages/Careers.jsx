import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // ✅ UPDATED: Using centralized API instance
import { Helmet } from "react-helmet-async";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState([]);

  // 1. FETCH JOBS
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        // ✅ UPDATED: Using api.get with relative path
        const response = await api.get("/careers/");
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 2. HELPER: Check Expiration
  const isJobExpired = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    return today > deadlineDate;
  };

  // 3. FILTER LOGIC
  useEffect(() => {
    let results = jobs;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerTerm) ||
          job.location.toLowerCase().includes(lowerTerm) ||
          job.department.toLowerCase().includes(lowerTerm),
      );
    }

    if (filterStatus !== "All") {
      results = results.filter((job) => {
        const expired = isJobExpired(job.deadline);
        return filterStatus === "Expired" ? expired : !expired;
      });
    }

    setFilteredJobs(results);
  }, [jobs, searchTerm, filterStatus]);

  // 4. GENERATE STRUCTURED DATA (Schema.org) for Google Jobs
  const generateJobSchema = () => {
    return {
      "@context": "https://schema.org",
      "@graph": filteredJobs.map((job) => ({
        "@type": "JobPosting",
        title: job.title,
        datePosted: job.created_at || new Date().toISOString(),
        validThrough: job.deadline,
        description: job.description,
        employmentType: job.type,
        hiringOrganization: {
          "@type": "Organization",
          name: "Fedha Land Ventures",
          sameAs: "https://fedhalandventures.co.ke",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
            addressCountry: "KE",
          },
        },
      })),
    };
  };

  if (loading)
    return (
      <div className="text-center py-5" aria-live="polite">
        Loading Careers...
      </div>
    );

  return (
    <main className="careers-page bg-light pb-5">
      <Helmet>
        <title>Careers</title>
        <meta
          name="description"
          content="Explore exciting career opportunities at Fedha Land Ventures. We are hiring for multiple positions. Help us build futures in real estate."
        />
        <meta
          name="keywords"
          content="Real Estate Jobs, Careers Kenya, Fedha Land Ventures Jobs, Hiring"
        />
        <link rel="canonical" href="https://fedhalandventures.co.ke/careers" />

        <script type="application/ld+json">
          {JSON.stringify(generateJobSchema())}
        </script>
      </Helmet>

      <header className="bg-black text-white py-5 mb-5 text-center">
        <div className="container">
          <span className="text-danger fw-bold text-uppercase small ls-2">
            Join Our Team
          </span>
          <h1 className="display-4 fw-bold mt-2">
            Build Your <span className="text-stroke-white">Career</span> With Us
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            At Fedha Land Ventures, we don't just sell land we build futures.
          </p>
        </div>
      </header>

      <section
        className="container-md"
        aria-labelledby="open-positions-heading"
      >
        <div className="row mb-4 align-items-center" role="search">
          <div className="col-md-6 mb-3 mb-md-0">
            <h2
              id="open-positions-heading"
              className="fw-bold text-dark border-start border-4 border-danger ps-3 mb-0 h3"
            >
              Open Positions
            </h2>
          </div>
          <div className="col-md-6">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search job openings by title, location, or department"
              />
              <select
                className="form-select w-auto"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Filter jobs by status"
              >
                <option value="All">All Jobs</option>
                <option value="Available">Available</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {filteredJobs.map((job) => {
            const expired = isJobExpired(job.deadline);

            return (
              <article key={job.id} className="col-md-6 col-lg-4">
                <div
                  className={`card h-100 border-0 shadow-sm hover-shadow transition-all ${
                    expired ? "opacity-75 bg-light" : ""
                  }`}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className="badge bg-danger-subtle text-danger">
                        {job.department}
                      </span>
                      {expired && (
                        <span className="badge bg-secondary">Closed</span>
                      )}
                    </div>

                    <h3 className="card-title fw-bold text-dark h5">
                      {job.title}
                    </h3>

                    <div className="text-muted small mb-4 mt-2">
                      <p className="mb-1">
                        <i
                          className="bi bi-geo-alt-fill text-secondary me-2"
                          aria-hidden="true"
                        ></i>
                        {job.location}
                      </p>
                      <p className="mb-1">
                        <i
                          className="bi bi-clock-fill text-secondary me-2"
                          aria-hidden="true"
                        ></i>
                        {job.type}
                      </p>
                      <p
                        className={`mb-0 fw-bold ${
                          expired ? "text-danger" : "text-success"
                        }`}
                      >
                        <i
                          className="bi bi-calendar-event me-2"
                          aria-hidden="true"
                        ></i>
                        Deadline:{" "}
                        <time dateTime={job.deadline}>{job.deadline}</time>
                      </p>
                    </div>

                    <p className="card-text text-secondary small mb-4 flex-grow-1">
                      {job.description
                        ? job.description.substring(0, 100) + "..."
                        : ""}
                    </p>

                    <Link
                      to={`/careers/${job.slug}`}
                      className={`btn w-100 fw-bold mt-auto ${
                        expired
                          ? "btn-secondary disabled"
                          : "btn-outline-danger"
                      }`}
                      style={{ pointerEvents: expired ? "none" : "auto" }}
                      aria-label={
                        expired
                          ? `Applications closed for ${job.title}`
                          : `View details and apply for ${job.title}`
                      }
                      tabIndex={expired ? -1 : 0}
                    >
                      {expired ? "Applications Closed" : "View Details & Apply"}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="col-12 text-center py-5">
              <h4 className="text-dark">
                No jobs found matching your criteria.
              </h4>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Careers;
