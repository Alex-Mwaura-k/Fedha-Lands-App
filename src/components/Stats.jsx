import { useEffect, useState, useRef } from "react";

const Stats = () => {
  const [counts, setCounts] = useState({
    locations: 0,
    investors: 0,
    assurance: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateNumbers();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000; // Animation takes 2 seconds
    const steps = 50;
    const interval = duration / steps;

    // Targets
    const targetLocations = 20;
    const targetInvestors = 500;
    const targetAssurance = 100;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      setCounts({
        locations: Math.min(
          targetLocations,
          Math.ceil((targetLocations / steps) * currentStep)
        ),
        investors: Math.min(
          targetInvestors,
          Math.ceil((targetInvestors / steps) * currentStep)
        ),
        assurance: Math.min(
          targetAssurance,
          Math.ceil((targetAssurance / steps) * currentStep)
        ),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, interval);
  };

  return (
    <div className="row g-4" ref={sectionRef}>
      <div className="col-md-4">
        <div className="stat-box d-flex align-items-center">
          <i className="bi bi-geo-alt text-danger fs-1 me-3 opacity-50"></i>
          <div>
            <h3 className="text-white fw-bold mb-0">{counts.locations}+</h3>
            <span className="text-secondary small text-uppercase ls-2">
              Prime Locations
            </span>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="stat-box d-flex align-items-center">
          <i className="bi bi-people text-danger fs-1 me-3 opacity-50"></i>
          <div>
            <h3 className="text-white fw-bold mb-0">{counts.investors}+</h3>
            <span className="text-secondary small text-uppercase ls-2">
              Happy Investors
            </span>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="stat-box d-flex align-items-center">
          <i className="bi bi-file-earmark-check text-danger fs-1 me-3 opacity-50"></i>
          <div>
            <h3 className="text-white fw-bold mb-0">{counts.assurance}%</h3>
            <span className="text-secondary small text-uppercase ls-2">
              Title Assurance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
