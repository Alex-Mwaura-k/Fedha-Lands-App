const Properties = () => {
  // Property Data Array
  const properties = [
    {
      id: 1,
      title: "Royal Garden Kithyoko - 5",
      location: "Kithyoko",
      size: "50x100",
      desc: "Prime 50x100 plots located just 9 mins off Thika-Garissa highway, offering serene environment and excellent investment opportunities.",
      price: "Ksh 160,000/-",
      status: "Available",
      img: "/img/properties/Royal Gardens 5.png",
    },
    {
      id: 2,
      title: "Kijani Garden Malindi",
      location: "Malindi",
      size: "1 Acre",
      desc: "Beautiful Serene and scenic views in Malindi, perfect for your dream holiday home, farming or speculation investment.",
      price: "Ksh 385,000/-",
      status: "Available",
      img: "/img/properties/Kijani Gardens.png",
    },
    {
      id: 3,
      title: "Unity Garden Makutano",
      location: "Makutano",
      size: "50x100",
      desc: "Affordable plots in Makutano(ya Mwea) with ready title deeds, lush greenery and convenient access roads.",
      price: "Ksh 530,000/-",
      status: "Available",
      img: "/img/properties/Unity Gardens.png",
    },
    {
      id: 4,
      title: "Royal Garden Kithyoko - 4",
      location: "Kithyoko",
      size: "1/8 Acre",
      desc: "Located 10 minutes from Kavaini shopping center, Water & electricity on site.",
      price: "Ksh 120,000/-",
      status: "Available",
      img: "/img/properties/Royal Gardens 4.png",
    },
    {
      id: 5,
      title: "Amani Garden Malindi",
      location: "Malindi",
      size: "100x100",
      desc: "Located just 45 minutes from Malindi town along the Sala Gate bypass near Jilore shopping center.",
      price: "Ksh 250,000/-",
      status: "Sold Out",
      img: "/img/properties/Amani Gardens.png",
    },
    {
      id: 6,
      title: "Fadhili Garden Makutano - II",
      location: "Makutano",
      size: "50x100",
      desc: "Located near Kamweli shopping center with schools, dispensaries and places of worship.",
      price: "Ksh 480,000/-",
      status: "Sold Out",
      img: "/img/properties/Fadhili Gardens.png",
    },
  ];

  return (
    <section id="properties" className="container-md mt-2 mb-3">
      <h1 className="text-start mb-3 h4">Featured Properties</h1>
      <div className="row g-4 mb-3">
        {/* Map through the data to create cards */}
        {properties.map((prop) => (
          <div key={prop.id} className="col-lg-4 col-md-6 col-sm-12">
            <a href="#" className="text-decoration-none text-dark">
              <div className="card property-card h-100 border-0 fixed-height">
                <div className="position-relative overflow-hidden">
                  <img
                    src={prop.img}
                    className="card-img-top property-img"
                    alt={prop.title}
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
                  <p className="card-text small">{prop.desc}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-danger">{prop.price}</span>
                    <span className="btn btn-custom-red btn-sm">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* View All Button (Small Style) */}
      <div className="text-center mt-4 mb-3">
        <a href="#" className="btn btn-custom-red px-3 py-1">
          View All Properties
        </a>
      </div>
    </section>
  );
};

export default Properties;
