import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { careersData } from "../data/careersData";

const JobDetails = () => {
  // FIXED: Destructure 'slug' to match App.jsx route
  const { slug } = useParams();

  // FIXED: Find job by comparing slug strings
  const job = careersData.find((j) => j.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  // Pre-filled Email Link
  const mailtoLink = isExpired
    ? "#"
    : `mailto:fedhalandventures@gmail.com?subject=${encodeURIComponent(
        `Application for ${job.title}`
      )}&body=${encodeURIComponent(
        `Dear Hiring Manager,\n\nI am writing to apply for the position of ${job.title} as advertised on your website.\n\nPlease find my CV and Portfolio attached.\n\nSincerely,\n[Your Name]`
      )}`;

  return (
    // FIX 1: Removed 'overflowX: hidden' so Sticky works again
    <div className="job-details-page bg-light pb-5">
      {/* HEADER */}
      <div className="bg-white border-bottom py-4 mb-4">
        <div className="container-md">
          <Link
            to="/careers"
            className="text-decoration-none text-secondary small mb-3 d-block"
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
                  >
                    Applications Closed <i className="bi bi-lock-fill ms-2"></i>
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center align-items-lg-end">
                  <a
                    href={mailtoLink}
                    className="btn btn-primary-red btn-lg px-5 fw-bold shadow-sm"
                  >
                    Apply Now <i className="bi bi-send-fill ms-2"></i>
                  </a>

                  <small
                    className="text-muted mt-2 text-center text-lg-end"
                    style={{ fontSize: "0.75rem" }}
                  >
                    or email:{" "}
                    <strong className="text-dark user-select-all text-break">
                      fedhalandventures@gmail.com
                    </strong>
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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

        {/* FIX 2: Changed 'g-5' to 'g-3 g-lg-5'. 
            'g-3' is smaller and fits on mobile without overflow. 
            'g-lg-5' keeps it spacious on laptops. */}
        <div className="row g-3 g-lg-5">
          {/* LEFT: Details */}
          <div className="col-lg-8">
            <div className="bg-white p-3 p-md-5 rounded shadow-sm">
              <h5 className="fw-bold mb-3">About the Role</h5>
              <p className="text-secondary mb-5" style={{ lineHeight: "1.8" }}>
                {job.description}
              </p>

              <h5 className="fw-bold mb-3">Key Responsibilities</h5>
              <ul className="text-secondary mb-5" style={{ lineHeight: "1.8" }}>
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>

              <h5 className="fw-bold mb-3">Requirements</h5>
              <ul className="text-secondary mb-5" style={{ lineHeight: "1.8" }}>
                {job.requirements.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>

              <h5 className="fw-bold mb-3">What We Offer</h5>
              <ul className="text-secondary mb-0" style={{ lineHeight: "1.8" }}>
                {job.benefits.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Summary Sidebar */}
          <div className="col-lg-4">
            <div
              className="bg-dark text-white p-4 rounded shadow sticky-top"
              // Adjusted 'top' to allow for navbar height
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
                  {new Date(job.postedDate).toLocaleDateString()}
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
                  <a href={mailtoLink} className="btn btn-light w-100 fw-bold">
                    Apply via Email
                  </a>
                  <p
                    className="text-secondary small mt-3 mb-0"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Or send CV to:
                    <br />
                    <strong className="text-white user-select-all text-break">
                      fedhalandventures@gmail.com
                    </strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
