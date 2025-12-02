import { Link } from "react-router-dom";
import { properties } from "../data/propertiesData"; // Import the data

const Properties = ({ limit }) => {
  // Logic: If a limit is provided, slice the array. Otherwise, show everything.
  const displayProperties = limit ? properties.slice(0, limit) : properties;

  return (
    <section id="properties" className="container-md mt-2 mb-3">
      {/* Only show title on Home Page or if specifically desired */}
      {limit && <h1 className="text-start mb-3 h4">Featured Properties</h1>}

      <div className="row g-4 mb-3">
        {displayProperties.map((prop) => (
          <div key={prop.id} className="col-lg-4 col-md-6 col-sm-12">
            {/* Wrap the whole card in a Link to the Detail Page */}
            <Link
              to={`/property/${prop.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card property-card h-100 border-0 fixed-height">
                <div className="position-relative overflow-hidden">
                  <img
                    src={prop.img}
                    className="card-img-top property-img"
                    alt={prop.title}
                    loading="lazy"
                    width="400"
                    height="300"
                  />
                  <span
                    className={`badge position-absolute top-0 start-0 m-2 px-2 py-2 text-white ${
                      prop.status === "Available"
                        ? "bg-deep-green"
                        : "bg-deep-red"
                    }`}
                  >
                    {prop.status}
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{prop.title}</h5>
                  <div className="d-flex justify-content-end gap-3 text-muted small mb-2">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill me-1"></i>{" "}
                      {prop.location}
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-arrows-angle-expand me-1"></i>{" "}
                      {prop.size}
                    </div>
                  </div>
                  {/* Truncate description for the card view */}
                  <p className="card-text small">
                    {prop.description.substring(0, 80)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-danger">
                      Ksh {prop.price}/-
                    </span>
                    <span className="btn btn-custom-red btn-sm">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Show "View All" button ONLY if we are limiting the list (Home Page) */}
      {limit && (
        <div className="text-center mt-4 mb-3">
          <Link to="/properties" className="btn btn-custom-red px-3 py-1">
            View All Properties
          </Link>
        </div>
      )}
    </section>
  );
};

export default Properties;
