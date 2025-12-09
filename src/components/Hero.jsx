import { useState, useEffect } from "react";
// import axios from "axios"; // TODO: Uncomment this when backend is ready

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]); // State to hold dynamic slides
  const [loading, setLoading] = useState(true);

  // FETCH SLIDES (Simulated for now, ready for Backend)
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // --- BACKEND INTEGRATION PLAN ---
        // On Monday, we will replace the code below with:
        // const response = await axios.get("http://localhost:8000/api/carousel/");
        // setSlides(response.data);

        // --- CURRENT STATIC DATA (Simulating an API response) ---
        const staticData = [
          {
            id: 0,
            image: "/img/carousels/slide_1.webp", // Backend will send a full URL here
            alt: "Royal Garden",
          },
          {
            id: 1,
            image: "/img/carousels/slide_2.webp",
            alt: "Kijani Garden",
          },
          {
            id: 2,
            image: "/img/carousels/slide_3.webp",
            alt: "Unity Garden",
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

  // Logic to move to the next slide
  const nextSlide = () => {
    if (slides.length === 0) return;
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Logic to move to the previous slide
  const prevSlide = () => {
    if (slides.length === 0) return;
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
    if (slides.length === 0) return; // Don't auto-play if no slides
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, slides.length]); // Depend on slides.length too

  // Render a placeholder or nothing while loading
  if (loading) {
    return <div className="bg-dark" style={{ height: "500px" }}></div>;
  }

  // If no slides exist (e.g. backend has 0 images), don't break the app
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
