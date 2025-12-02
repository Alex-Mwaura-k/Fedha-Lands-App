import Properties from "../components/Properties";

const AllProperties = () => {
  return (
    <div style={{ paddingTop: "80px", paddingBottom: "50px" }}>
      <div className="container-md mb-4">
        <h1 className="fw-bold text-dark">Our Prime Properties</h1>
        <p className="text-muted">
          Browse our complete portfolio of prime land in Kenya.
        </p>
      </div>

      {/* Render Properties WITHOUT the limit prop */}
      <Properties />
    </div>
  );
};

export default AllProperties;
