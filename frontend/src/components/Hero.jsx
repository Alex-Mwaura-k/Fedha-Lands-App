import { useState, useEffect } from "react";
// import axios from "axios";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const staticData = [
          {
            id: 0,
            image: "/img/carousels/slide_1.webp",
            alt: "Royal Garden",
            slug: "royal-garden-kithyoko-phase-5", // Necessary for routing
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
        setSlides(staticData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching carousel slides:", error);
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, slides.length]);

  if (loading) {
    return <div className="bg-dark" style={{ height: "500px" }}></div>;
  }

  if (slides.length === 0) return null;

  return (
    <div id="heroCarousel" className="carousel slide">
      {/* INDICATORS (Bottom Dots) */}
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
            <img
              src={slide.image}
              className="d-block w-100 css-img"
              alt={slide.alt}
              loading="lazy"
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

      {/* CONTROLS (Arrows) */}
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
