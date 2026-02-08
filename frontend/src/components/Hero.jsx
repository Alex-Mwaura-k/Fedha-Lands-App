import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Don't forget this import!

// 1. Static data with JUST your original images
const slides = [
  {
    id: 0,
    image: "/img/carousels/slide_1.webp",
    alt: "Royal Garden",
    slug: "royal-garden-kithyoko-phase-5",
  },
  {
    id: 1,
    image: "/img/carousels/slide_2.webp",
    alt: "Kijani Garden",
    slug: "kijani-garden-malindi",
  },
  {
    id: 2,
    image: "/img/carousels/slide_3.webp",
    alt: "Unity Garden",
    slug: "unity-gardens",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper to handle manual navigation
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  // --- OPTIMIZED TIMER ---
  // This runs ONCE on mount, preventing layout thrashing (Reflow)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []); // <--- Empty dependency array is the secret sauce

  return (
    <div
      id="fedhaHero"
      className="carousel slide"
      // Stops Bootstrap JS from interfering with React
      data-bs-interval="false"
      data-bs-ride="false"
    >
      <Helmet>
        <title>Fedha Land Ventures</title>
        <meta
          name="description"
          content="Secure your future from the best land sellers in Kenya. We provide prime, titled plots in all over the country with flexible payment plans and transparent ownership processes."
        />
      </Helmet>

      {/* INDICATORS */}
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === activeIndex ? "active" : ""}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* SLIDES */}
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item css-item ${
              index === activeIndex ? "active" : ""
            }`}
          >
            {/* Standard Image Tag */}
            <img
              src={slide.image}
              className="d-block w-100 css-img"
              alt={slide.alt}
              // Tells browser the shape of the image to prevent jumping
              width={1920}
              height={785}
              // Performance Optimization
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />

            <div className="carousel-caption d-md-block p-0">
              <button
                type="button"
                className="btn btn-outline-light px-3 py-1"
                data-bs-toggle="modal"
                data-bs-target="#booking-Modal"
              >
                Book Site Visit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <button
        className="carousel-control-prev"
        type="button"
        onClick={prevSlide}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        onClick={nextSlide}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Hero;
