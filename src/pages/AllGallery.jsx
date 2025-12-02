import Gallery from "../components/Gallery";

const AllGallery = () => {
  return (
    <div
      style={{
        paddingTop: "80px",
        paddingBottom: "50px",
        backgroundColor: "#0f0f0f",
      }}
    >
      <div className="container-md mb-4 text-white">
        <h1 className="fw-bold">Full Gallery</h1>
        <p className="text-white-50">
          Explore all our events, properties, and team moments.
        </p>
      </div>

      {/* Render Gallery WITHOUT the limit prop to show everything */}
      <Gallery />
    </div>
  );
};

export default AllGallery;
