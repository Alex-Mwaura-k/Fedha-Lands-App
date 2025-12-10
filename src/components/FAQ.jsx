import React from "react";
// Import the data
import { faqData } from "../data/faqData";

const FAQ = () => {
  return (
    <section id="faq" className="pt-3 pb-5 bg-black overflow-hidden">
      {/* The internal <style> block is gone. Styles are now in index.css */}

      <div className="container-md">
        {/* HEADER */}
        <div className="mb-2">
          <span className="text-danger fw-bold text-uppercase small ls-2">
            Common Questions
          </span>
          <h2 className="display-6 fw-bold text-white mt-2">
            <span className="text-stroke-white">FAQs</span>
          </h2>
          <p className="text-secondary" style={{ maxWidth: "600px" }}>
            Everything you need to know about buying land with Fedha Land
            Ventures.
          </p>
        </div>

        <div className="row g-5 align-items-stretch">
          {/* LEFT COLUMN: Image */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="h-100 position-relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Happy Clients"
                className="img-fluid rounded shadow-lg w-100 h-100"
                style={{ objectFit: "fit" }}
              />
              <div className="bg-danger position-absolute bottom-0 start-0 p-2 text-white m-4 rounded shadow">
                <h3 className="fw-bold mb-0">100%</h3>
                <small>Transparent Process</small>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Accordion */}
          <div className="col-lg-6">
            <div className="accordion custom-accordion" id="faqAccordion">
              {faqData.map((faq, index) => (
                <div
                  className={`accordion-item border-0 shadow-sm rounded overflow-hidden bg-dark ${
                    index === faqData.length - 1 ? "mb-0" : "mb-3"
                  }`}
                  key={index}
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold text-white bg-dark py-4"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                      style={{ boxShadow: "none" }}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-secondary bg-dark border-top border-secondary">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
