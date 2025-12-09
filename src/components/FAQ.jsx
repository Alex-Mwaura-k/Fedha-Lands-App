import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take to get my Title Deed?",
      answer:
        "For cash buyers, the transfer process takes 30-45 days. For installment buyers, the process begins immediately after you complete your final payment.",
    },
    {
      question: "Do you offer free site visits?",
      answer:
        "Yes! We offer free transport to our projects every Wednesday and Saturday. Pickup is at our Ruiru office (Nyongo House) at 8:00 AM.",
    },
    {
      question: "Can I pay for the land in installments?",
      answer:
        "Absolutely. We have flexible payment plans of up to 6 months. You can book a plot with a deposit (e.g., Ksh 50,000) and pay the balance monthly.",
    },
    {
      question: "Are the title deeds freehold or leasehold?",
      answer:
        "All our agricultural and residential plots (Kithyoko, Malindi, Makutano) come with Freehold Title Deeds, meaning you own the land indefinitely.",
    },
    {
      question: "What happens if I cannot complete payment?",
      answer:
        "We understand that financial situations change. Contact us immediately to restructure your payment plan. In worst-case scenarios, we can offer a refund as per the terms signed in your Sale Agreement.",
    },
  ];

  return (
    // ADDED: 'overflow-hidden' here prevents the g-5 row from causing scrollbars
    <section id="faq" className="pt-3 pb-5 bg-black overflow-hidden">
      {/* Internal Style to turn the blue Accordion Icon WHITE */}
      <style>
        {`
          .accordion-button::after {
            filter: invert(1) grayscale(100%) brightness(200%);
          }
          .text-stroke-white {
             -webkit-text-stroke: 1px white;
             color: transparent;
          }
        `}
      </style>

      <div className="container-md">
        {/* HEADER */}
        <div className="mb-2">
          <span className="text-danger fw-bold text-uppercase small ls-2">
            Common Questions
          </span>
          <h2 className="display-6 fw-bold text-white mt-2">
            {/* Restored the Stroke Effect */}
            <span className="text-stroke-white">FAQs</span>
          </h2>
          <p className="text-secondary" style={{ maxWidth: "600px" }}>
            Everything you need to know about buying land with Fedha Land
            Ventures.
          </p>
        </div>

        {/* 'align-items-stretch' makes the image match the accordion height exactly */}
        <div className="row g-5 align-items-stretch">
          {/* LEFT COLUMN: Image */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="h-100 position-relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Happy Clients"
                className="img-fluid rounded shadow-lg w-100 h-100"
                // 'object-fit: cover' ensures image fills the height without stretching/distortion
                style={{ objectFit: "cover" }}
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
              {faqs.map((faq, index) => (
                <div
                  className="accordion-item border-0 mb-3 shadow-sm rounded overflow-hidden bg-dark"
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
