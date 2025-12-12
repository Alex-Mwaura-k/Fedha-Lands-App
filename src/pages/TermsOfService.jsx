import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Helmet>
        <title>Terms of Service</title>
        {/* Noindex tells search engines not to list this legal page */}
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container-md">
        <div className="row md-justify-content-center">
          <div className="col-lg-12">
            <div className="bg-white py-md-4 px-md-5 py-2 px-3 rounded shadow-sm">
              <h1 className="fw-bold text-dark mb-4">Terms of Service</h1>
              <p className="text-muted mb-4">
                Last Updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  1. Agreement to Terms
                </h4>
                <p>
                  These Terms of Service constitute a legally binding agreement
                  made between you, whether personally or on behalf of an entity
                  (“you”) and <strong>Fedha Land Ventures Ltd</strong>,
                  concerning your access to and use of the{" "}
                  <strong>fedhalandventures.co.ke</strong> website as well as
                  any other media form, mobile application, or related channel.
                </p>
                <p>
                  By accessing the Site, you agree that you have read,
                  understood, and agreed to be bound by all of these Terms of
                  Service. If you do not agree with all of these terms, then you
                  are expressly prohibited from using the Site and must
                  discontinue use immediately.
                </p>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  2. Property Listings & Availability
                </h4>
                <p>
                  We strive to ensure all property details, prices, and
                  availability statuses (e.g., "Available", "Sold Out") are
                  accurate and up-to-date. However, we cannot guarantee that all
                  information is error-free.
                </p>
                <ul>
                  <li>
                    <strong>Price Changes:</strong> Property prices are subject
                    to change without prior notice due to market conditions.
                  </li>
                  <li>
                    <strong>Availability:</strong> Plots are sold on a
                    first-come, first-served basis. A plot marked "Available" on
                    the website may have been booked offline moments prior.
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  3. Booking & Site Visits
                </h4>
                <p>
                  Our website allows you to book free site visits. By booking a
                  visit, you agree to:
                </p>
                <ul>
                  <li>
                    Provide accurate contact information so our team can reach
                    you.
                  </li>
                  <li>
                    Adhere to the scheduled time and pickup points agreed upon.
                  </li>
                  <li>
                    Understand that while transport to the site is free,
                    personal expenses (like meals) are your responsibility
                    unless stated otherwise.
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  4. Payments & Installments
                </h4>
                <p>
                  Fedha Land Ventures offers flexible payment plans for most
                  properties.
                </p>
                <ul>
                  <li>
                    <strong>Deposits:</strong> A booking fee/deposit is required
                    to reserve a specific plot. This deposit is part of the
                    total purchase price.
                  </li>
                  <li>
                    <strong>Installments:</strong> Failure to complete monthly
                    installments within the agreed period may result in the
                    forfeiture of the plot or penalties as outlined in your
                    specific Sale Agreement.
                  </li>
                  <li>
                    <strong>Payment Methods:</strong> We accept payments via
                    Bank Transfer and M-PESA.{" "}
                    <strong>Do not pay cash to any individual agent.</strong>{" "}
                    All payments must be made to official company accounts.
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">5. Refund Policy</h4>
                <p>
                  Refunds are processed in accordance with the Sale Agreement
                  signed at the time of purchase. Generally:
                </p>
                <ul>
                  <li>
                    Booking fees are refundable within 7 days if you choose not
                    to proceed, subject to an administrative fee.
                  </li>
                  <li>
                    Refunds for installments paid take between 30 to 90 days to
                    process after a written cancellation request is received and
                    approved.
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  6. Intellectual Property
                </h4>
                <p>
                  Unless otherwise indicated, the Site and its contents
                  (including source code, databases, software, website designs,
                  audio, video, text, photographs, and graphics) are our
                  proprietary property and are protected by copyright and
                  trademark laws.
                </p>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  7. Contact Information
                </h4>
                <p>
                  To resolve a complaint regarding the Site or to receive
                  further information regarding use of the Site, please contact
                  us at:
                </p>
                <address className="text-muted border-start border-4 border-danger ps-3">
                  <strong>Fedha Land Ventures Ltd</strong>
                  <br />
                  Nyongo House, Ruiru Town
                  <br />
                  Kiambu County, Kenya
                  <br />
                  Email:{" "}
                  <a href="mailto:fedhalandventures@gmail.com">
                    fedhalandventures@gmail.com
                  </a>
                </address>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
