const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh", width: "100%" }}
    >
      <div className="text-center">
        <div
          className="spinner-border text-danger"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted small fw-bold text-uppercase ls-2">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
