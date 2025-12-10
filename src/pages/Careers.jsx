import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { careersData } from "../data/careersData";

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // All, Available, Expired
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper to check if a job is expired
  const isJobExpired = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    // Reset time parts for accurate date comparison
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    return today > deadlineDate;
  };

  // Filter Logic
  useEffect(() => {
    let results = careersData;

    // 1. Search Filter
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerTerm) ||
          job.location.toLowerCase().includes(lowerTerm) ||
          job.department.toLowerCase().includes(lowerTerm)
      );
    }

    // 2. Status Filter
    if (filterStatus !== "All") {
      results = results.filter((job) => {
        const expired = isJobExpired(job.deadline);
        return filterStatus === "Expired" ? expired : !expired;
      });
    }

    setFilteredJobs(results);
  }, [searchTerm, filterStatus]);

  return (
    <div className="careers-page bg-light pb-5">
      {/* HERO SECTION */}
      <div className="bg-black text-white py-5 mb-5 text-center">
        <div className="container">
          <span className="text-danger fw-bold text-uppercase small ls-2">
            Join Our Team
          </span>
          <h1 className="display-4 fw-bold mt-2">
            Build Your <span className="text-stroke-white">Career</span> With Us
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            At Fedha Land Ventures, we don't just sell land we build futures. If
            you are passionate, driven, and ready to make an impact, we want to
            hear from you.
          </p>
        </div>
      </div>

      {/* FILTERS & LISTINGS */}
      <div className="container-md">
        <div className="row mb-4 align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <h3 className="fw-bold text-dark border-start border-4 border-danger ps-3 mb-0">
              Open Positions
            </h3>
          </div>
          <div className="col-md-6">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search job title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="form-select w-auto"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
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
              <div key={job.id} className="col-md-6 col-lg-4">
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

                    <h5 className="card-title fw-bold text-dark">
                      {job.title}
                    </h5>

                    <div className="text-muted small mb-4 mt-2">
                      <p className="mb-1">
                        <i className="bi bi-geo-alt-fill text-secondary me-2"></i>
                        {job.location}
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-clock-fill text-secondary me-2"></i>
                        {job.type}
                      </p>
                      <p
                        className={`mb-0 fw-bold ${
                          expired ? "text-danger" : "text-success"
                        }`}
                      >
                        <i className="bi bi-calendar-event me-2"></i>
                        Deadline: {job.deadline}
                      </p>
                    </div>

                    <p className="card-text text-secondary small mb-4 flex-grow-1">
                      {job.description.substring(0, 100)}...
                    </p>

                    <Link
                      to={`/careers/${job.id}`}
                      className={`btn w-100 fw-bold mt-auto ${
                        expired
                          ? "btn-secondary disabled"
                          : "btn-outline-danger"
                      }`}
                      style={{ pointerEvents: expired ? "none" : "auto" }} // Prevent click if disabled
                    >
                      {expired ? "Applications Closed" : "View Details & Apply"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="col-12 text-center py-5">
              <div className="text-muted mb-3">
                <i className="bi bi-search display-1 opacity-25"></i>
              </div>
              <h4 className="text-dark">No jobs found.</h4>
              <p className="text-secondary">
                Try adjusting your search or filter settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;
