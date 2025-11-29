import { useState } from "react";

const Gallery = () => {
  const [filter, setFilter] = useState("all");

  // Gallery Data
  const galleryData = [
    {
      id: 1,
      type: "property",
      img: "/img/properties/Fadhili Gardens.png",
      title: "Fadhili Gardens",
      desc: "Phase II - Makutano",
    },
    {
      id: 2,
      type: "team",
      img: "https://picsum.photos/id/1005/600/600",
      title: "John Kamau",
      desc: "Senior Sales Manager",
    },
    {
      id: 3,
      type: "property",
      img: "/img/properties/Amani Gardens.png",
      title: "Amani Gardens",
      desc: "Malindi",
    },
    {
      id: 4,
      type: "poster",
      img: "https://picsum.photos/id/1060/600/600",
      title: "Kitengela Open Day",
      desc: "August 2025",
    },
    {
      id: 5,
      type: "property",
      img: "/img/properties/Kijani Gardens.png",
      title: "Kithyoko Phase I",
      desc: "Masinga",
    },
    {
      id: 6,
      type: "team",
      img: "https://picsum.photos/id/1011/600/600",
      title: "Customer Care",
      desc: "Ruiru Office",
    },
    {
      id: 7,
      type: "property",
      img: "/img/properties/Unity Gardens.png",
      title: "Kijani Garden",
      desc: "Malindi",
    },
    {
      id: 8,
      type: "poster",
      img: "https://picsum.photos/id/1050/600/600",
      title: "Free Site Visits",
      desc: "Every Wednesday & Saturday",
    },
    {
      id: 9,
      type: "team",
      img: "https://picsum.photos/id/1025/600/600",
      title: "Site Engineer",
      desc: "Grading the Roads",
    },
  ];

  // Filtering Logic
  const filteredItems =
    filter === "all"
      ? galleryData
      : galleryData.filter((item) => item.type === filter);

  // LIMIT TO 6 ITEMS (Added this line)
  const displayItems = filteredItems.slice(0, 6);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container-md">
        <div className="row mb-5 align-items-center">
          <div className="col-lg-4">
            <span className="text-danger fw-bold text-uppercase small ls-2">
              Our Gallery
            </span>
            <h2 className="display-5 fw-bold text-white mt-1">
              Life at <span className="text-outline-red">Fedha</span>
            </h2>
          </div>

          <div className="col-lg-8">
            <div className="gallery-filters d-flex justify-content-lg-end justify-content-start gap-3 flex-wrap mt-3 mt-lg-0">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${
                  filter === "property" ? "active" : ""
                }`}
                onClick={() => setFilter("property")}
              >
                Properties
              </button>
              <button
                className={`filter-btn ${filter === "team" ? "active" : ""}`}
                onClick={() => setFilter("team")}
              >
                Our Team
              </button>
              <button
                className={`filter-btn ${filter === "poster" ? "active" : ""}`}
                onClick={() => setFilter("poster")}
              >
                Events & Posters
              </button>
            </div>
          </div>
        </div>

        <div className="row g-3 gallery-container">
          {/* Map through displayItems (which is limited to 6) instead of filteredItems */}
          {displayItems.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 gallery-item show">
              <div className="gallery-card">
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <h6 className="text-uppercase text-danger fw-bold ls-2 mb-1">
                      {item.type}
                    </h6>
                    <h4 className="text-white fw-bold">{item.title}</h4>
                    <p className="text-white-50 small">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <a href="#" className="btn btn-custom-red px-3 py-1">
              View All Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
