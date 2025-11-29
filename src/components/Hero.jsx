import { useState, useEffect } from "react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 0,
      image: "/img/carousels/slide_1.png",
      alt: "Royal Garden",
    },
    {
      id: 1,
      image: "/img/carousels/slide_2.png",
      alt: "Kijani Garden",
    },
    {
      id: 2,
      image: "/img/carousels/slide_3.png",
      alt: "Unity Garden",
    },
  ];

  // Logic to move to the next slide
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Logic to move to the previous slide
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Logic to jump to a specific slide (dots)
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Auto-play Effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 seconds

    // Clear timer if user clicks manual buttons (prevents double jumps)
    return () => clearInterval(interval);
  }, [activeIndex]);

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
            // Logic: We dynamically add the 'active' class based on React State
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
            <div className="carousel-caption d-md-block p-0 mb-3">
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
