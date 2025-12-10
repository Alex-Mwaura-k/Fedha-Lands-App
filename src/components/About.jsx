import Stats from "./Stats";

const About = () => {
  return (
    <section id="about-us" className="about-section py-5">
      <div className="container-md">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="section-header">
              <span className="text-danger fw-bold text-uppercase small ls-2">
                About us
              </span>
              <h2 className="display-5 fw-bold text-white mt-1">
                Building Your <span className="text-stroke-white">Future</span>
              </h2>
              <p className="text-secondary mw-600">
                Located at Nyongo Plaza, Ruiru. We bridge the gap between dream
                and reality with title-deed-inclusive pricing and transparent
                processes.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision + Values */}
        <div className="row g-5 align-items-center mb-5 pb-5 border-bottom-dark">
          <div className="col-lg-6">
            <div className="info-block mb-5">
              <h4 className="text-white d-flex align-items-center">
                <i className="bi bi-rocket-takeoff text-danger me-3 fs-4"></i>
                Our Mission
              </h4>
              <p className="text-grey ps-5 border-start-custom">
                To enable every investor to own property and empower
                livelihoods. We make land ownership smooth, transparent, and
                accessible.
              </p>
            </div>

            <div className="info-block">
              <h4 className="text-white d-flex align-items-center">
                <i className="bi bi-eye text-danger me-3 fs-4"></i>
                Our Vision
              </h4>
              <p className="text-grey ps-5 border-start-custom">
                To be the most credible land selling company within Kenya. We
                envision a future where every investment guarantees security and
                growth.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="values-container p-4">
              <h5 className="text-danger text-uppercase mb-4 ls-2 small">
                Core Values
              </h5>

              <div className="value-item d-flex align-items-center mb-4">
                <span className="num text-outline-red2 me-4">01</span>
                <div>
                  <h6 className="text-white fw-bold mb-0">Integrity</h6>
                  <small className="text-secondary">
                    No hidden fees. Genuine Title Deeds.
                  </small>
                </div>
              </div>

              <div className="value-item d-flex align-items-center mb-4">
                <span className="num text-outline-red2 me-4">02</span>
                <div>
                  <h6 className="text-white fw-bold mb-0">Innovation</h6>
                  <small className="text-secondary">
                    Modern value addition (Fencing, Grading).
                  </small>
                </div>
              </div>

              <div className="value-item d-flex align-items-center">
                <span className="num text-outline-red2 me-4">03</span>
                <div>
                  <h6 className="text-white fw-bold mb-0">Empowerment</h6>
                  <small className="text-secondary">
                    Plots designed for immediate settlement.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ownership Process */}
        <div className="row mb-5">
          <div className="col-12 mb-4">
            <h3 className="text-white h4">
              Ownership <span className="text-danger">Process</span>
            </h3>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <div className="process-step d-flex align-items-start d-md-block">
              <h2
                className="text-outline-red me-3 me-md-0 mb-0 mb-md-2"
                style={{ lineHeight: 1 }}
              >
                01
              </h2>
              <div>
                <h6 className="text-white fw-bold mb-1">Select</h6>
                <p className="text-secondary small mb-0">
                  Identify your preferred plot from our portfolio.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <div className="process-step d-flex align-items-start d-md-block">
              <h2
                className="text-outline-red me-3 me-md-0 mb-0 mb-md-2"
                style={{ lineHeight: 1 }}
              >
                02
              </h2>
              <div>
                <h6 className="text-white fw-bold mb-1">Visit</h6>
                <p className="text-secondary small mb-0">
                  We offer free site visits. See the beacons yourself.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-4">
            <div className="process-step d-flex align-items-start d-md-block">
              <h2
                className="text-outline-red me-3 me-md-0 mb-0 mb-md-2"
                style={{ lineHeight: 1 }}
              >
                03
              </h2>
              <div>
                <h6 className="text-white fw-bold mb-1">Secure</h6>
                <p className="text-secondary small mb-0">
                  Pay a deposit to book. Flexible payment plans available.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 mb-2">
            <div className="process-step d-flex align-items-start d-md-block">
              <h2
                className="text-outline-red me-3 me-md-0 mb-0 mb-md-2"
                style={{ lineHeight: 1 }}
              >
                04
              </h2>
              <div>
                <h6 className="text-white fw-bold mb-1">Own</h6>
                <p className="text-secondary small mb-0">
                  Complete payment. We process and deliver your Title Deed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Stats />
      </div>
    </section>
  );
};

export default About;
