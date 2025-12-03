import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container-md text-center d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh", paddingTop: "80px" }}
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4 text-dark">Page Not Found</h2>
      <p className="text-muted mb-5">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-dark px-4 py-2 rounded-0">
        <i className="bi bi-house-door-fill me-2"></i> Go Home
      </Link>
    </div>
  );
};

export default NotFound;
