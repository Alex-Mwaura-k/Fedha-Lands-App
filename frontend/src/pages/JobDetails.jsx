import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios"; // ✅ UPDATED: Use your centralized API helper
import { Helmet } from "react-helmet-async";
import { COMPANY_DATA } from "../data/contactData";

const JobDetails = () => {
  const { slug } = useParams();

  // 1. STATE
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. FETCH
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      try {
        // ✅ UPDATED: Now uses environment-aware api instance
        const response = await api.get(`/careers/${slug}/`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  if (loading)
    return (
      <div className="text-center py-5 mt-5" aria-live="polite">
        Loading Details...
      </div>
    );

  if (!job) {
    return (
      <div className="text-center py-5 mt-5">
        <h2 className="text-danger">Job Not Found</h2>
        <Link to="/careers" className="btn btn-dark mt-3">
          Back to Careers
        </Link>
      </div>
    );
  }

  // --- EXPIRATION LOGIC ---
  const today = new Date();
  const deadlineDate = new Date(job.deadline);
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);

  const isExpired = today > deadlineDate;

  // --- EMAIL LOGIC ---
  const mailtoLink = isExpired
    ? "#"
    : `mailto:${COMPANY_DATA.email}?subject=${encodeURIComponent(
        `Application for ${job.title}`,
      )}&body=${encodeURIComponent(
        `Dear Hiring Manager,\n\nI am writing to apply for the position of ${job.title} as advertised on your website.\n\nPlease find my CV and Portfolio attached.\n\nSincerely,\n[Your Name]`,
      )}`;

  // --- HELPER: Ensure website has https:// for Schema ---
  const siteUrl = COMPANY_DATA.website.startsWith("http")
    ? COMPANY_DATA.website
    : `https://${COMPANY_DATA.website}`;

  // --- SEO SCHEMA ---
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedDate || new Date().toISOString(),
    validThrough: job.deadline,
    employmentType: job.type,
    hiringOrganization: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
      sameAs: siteUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "KE",
      },
    },
  };

  return (
    <main className="job-details-page bg-light pb-5">
      <Helmet>
        <title>
          {job.title} | Careers at {COMPANY_DATA.name}
        </title>
        <meta
          name="description"
          content={`We are hiring a ${job.title} in ${job.location}. Apply now at ${COMPANY_DATA.name}.`}
        />
        <script type="application/ld+json">{JSON.stringify(jobSchema)}</script>
      </Helmet>

      {/* HEADER */}
      <header className="bg-white border-bottom py-4 mb-4">
        <div className="container-md">
          <Link
            to="/careers"
            className="text-decoration-none text-secondary small mb-3 d-block"
            aria-label="Back to careers list"
          >
            <i className="bi bi-arrow-left me-1"></i> Back to Jobs
          </Link>
          <div className="row align-items-center">
            <div className="col-lg-8 text-lg-start mb-4 mb-lg-0">
              <h1 className="fw-bold text-dark mb-2">
                {job.title}
                {isExpired && (
                  <span className="badge bg-secondary ms-3 fs-6 align-middle">
                    Closed
                  </span>
                )}
              </h1>
              <div className="d-flex flex-wrap gap-3 text-muted small justify-content-center justify-content-lg-start">
                <span>
                  <i className="bi bi-briefcase-fill text-danger me-1"></i>{" "}
                  {job.department}
                </span>
                <span>
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i>{" "}
                  {job.location}
                </span>
                <span>
                  <i className="bi bi-clock-fill text-danger me-1"></i>{" "}
                  {job.type}
                </span>
              </div>
            </div>

            <div className="col-lg-4">
              {isExpired ? (
                <div className="d-flex justify-content-center justify-content-lg-end">
                  <button
                    className="btn btn-secondary btn-lg px-5 fw-bold shadow-sm"
                    disabled
                    aria-disabled="true"
                  >
                    Applications Closed <i className="bi bi-lock-fill ms-2"></i>
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center align-items-lg-end">
                  <a
                    href={mailtoLink}
                    className="btn btn-primary-red btn-lg px-5 fw-bold shadow-sm"
                    aria-label={`Apply for ${job.title} via email`}
                  >
                    Apply Now <i className="bi bi-send-fill ms-2"></i>
                  </a>

                  <small
                    className="text-muted mt-2 text-center text-lg-end"
                    style={{ fontSize: "0.75rem" }}
                  >
                    or email:
                    <strong className="text-dark user-select-all text-break">
                      {" "}
                      {COMPANY_DATA.email}
                    </strong>
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="container-md">
        {isExpired && (
          <div
            className="alert alert-warning mb-4 shadow-sm border-warning"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <strong>Notice:</strong> This job position accepted applications
            until {new Date(job.deadline).toLocaleDateString()} and is now
            closed.
          </div>
        )}

        <div className="row g-3 g-lg-5">
          <article className="col-lg-8">
            <div className="bg-white p-3 p-md-5 rounded shadow-sm">
              <h5 className="fw-bold mb-3">About the Role</h5>
              <p className="text-secondary mb-5" style={{ lineHeight: "1.8" }}>
                {job.description}
              </p>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h5 className="fw-bold mb-3">Key Responsibilities</h5>
                  <ul
                    className="text-secondary mb-5"
                    style={{ lineHeight: "1.8" }}
                  >
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <h5 className="fw-bold mb-3">Requirements</h5>
                  <ul
                    className="text-secondary mb-5"
                    style={{ lineHeight: "1.8" }}
                  >
                    {job.requirements.map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <>
                  <h5 className="fw-bold mb-3">What We Offer</h5>
                  <ul
                    className="text-secondary mb-0"
                    style={{ lineHeight: "1.8" }}
                  >
                    {job.benefits.map((item, index) => (
                      <li key={index} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </article>

          <aside className="col-lg-4">
            <div
              className="bg-dark text-white p-4 rounded shadow sticky-top"
              style={{ top: "100px", zIndex: 10 }}
            >
              <h5 className="fw-bold mb-4 text-white">Job Overview</h5>

              <div className="mb-3">
                <small
                  className="text-secondary text-uppercase fw-bold"
                  style={{ fontSize: "0.7rem" }}
                >
                  Date Posted
                </small>
                <p className="mb-0">
                  {new Date(job.postedDate || Date.now()).toLocaleDateString()}
                </p>
              </div>
              <hr className="border-secondary opacity-25" />

              <div className="mb-3">
                <small
                  className="text-secondary text-uppercase fw-bold"
                  style={{ fontSize: "0.7rem" }}
                >
                  Application Deadline
                </small>
                <p
                  className={`mb-0 fw-bold ${
                    isExpired ? "text-danger" : "text-success"
                  }`}
                >
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
              <hr className="border-secondary opacity-25" />

              <div className="mb-3">
                <small
                  className="text-secondary text-uppercase fw-bold"
                  style={{ fontSize: "0.7rem" }}
                >
                  Employment Type
                </small>
                <p className="mb-0">{job.type}</p>
              </div>
              <hr className="border-secondary opacity-25" />

              <div className="mb-4">
                <small
                  className="text-secondary text-uppercase fw-bold"
                  style={{ fontSize: "0.7rem" }}
                >
                  Location
                </small>
                <p className="mb-0">{job.location}</p>
              </div>

              {isExpired ? (
                <button className="btn btn-secondary w-100 fw-bold" disabled>
                  Closed
                </button>
              ) : (
                <div className="text-center">
                  <a
                    href={mailtoLink}
                    className="btn btn-light w-100 fw-bold"
                    aria-label="Apply via Email"
                  >
                    Apply via Email
                  </a>
                  <p
                    className="text-secondary small mt-3 mb-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Or send CV to:
                    <br />
                    <strong className="text-white user-select-all text-break">
                      {COMPANY_DATA.email}
                    </strong>
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default JobDetails;
