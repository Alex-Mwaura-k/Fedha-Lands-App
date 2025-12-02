import Blog from "../components/Blog";

const AllBlogs = () => {
  return (
    <div style={{ paddingTop: "20px", paddingBottom: "50px" }}>
      <div className="container-md mb-4">
        <h1 className="fw-bold text-dark">Blogs Center</h1>
        <p className="text-muted">
          Stay updated with the latest news, guides, and videos from Fedha Land.
        </p>
      </div>

      {/* Renders Blog without a limit, so it shows everything */}
      <Blog />
    </div>
  );
};

export default AllBlogs;
