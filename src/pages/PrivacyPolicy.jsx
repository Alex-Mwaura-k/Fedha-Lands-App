import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
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
        <title>Privacy Policy</title>

        {/* This tag tells Google & Bing to IGNORE this page completely */}
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container-md">
        <div className="row md-justify-content-center">
          <div className="col-lg-12">
            <div className="bg-white py-4 px-5 rounded shadow-sm">
              <h1 className="fw-bold text-dark mb-4">Privacy Policy</h1>
              <p className="text-muted mb-4">
                Last Updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">1. Introduction</h4>
                <p>
                  Welcome to <strong>Fedha Land Ventures Ltd</strong>. We are
                  committed to protecting your personal information and your
                  right to privacy. If you have any questions or concerns about
                  our policy, or our practices with regards to your personal
                  information, please contact us at{" "}
                  <a href="mailto:fedhalandventures@gmail.com">
                    fedhalandventures@gmail.com
                  </a>
                  .
                </p>
                <p>
                  When you visit our website, mobile application, and use our
                  services, you trust us with your personal information. We take
                  your privacy very seriously.
                </p>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  2. Information We Collect
                </h4>
                <p>
                  We collect personal information that you voluntarily provide
                  to us when expressing an interest in obtaining information
                  about us or our products and services, such as when you:
                </p>
                <ul>
                  <li>
                    Book a <strong>Site Visit</strong> (Name, Phone Number,
                    Email).
                  </li>
                  <li>
                    Subscribe to our <strong>Newsletter</strong>.
                  </li>
                  <li>
                    Enable <strong>Push Notifications</strong> on your device.
                  </li>
                  <li>Contact us directly via WhatsApp or Phone calls.</li>
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  3. How We Use Your Information
                </h4>
                <p>
                  We use personal information collected via our website for a
                  variety of business purposes described below:
                </p>
                <ul>
                  <li>
                    <strong>To facilitate land transactions:</strong> Processing
                    site visits and title deed transfers.
                  </li>
                  <li>
                    <strong>To send administrative information:</strong> Sending
                    you product, service, and new feature information.
                  </li>
                  <li>
                    <strong>
                      To send marketing and promotional communications:
                    </strong>{" "}
                    We may use your email to send you updates on new plots (only
                    with your consent).
                  </li>
                </ul>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  4. Push Notifications
                </h4>
                <p>
                  We may request to send you push notifications regarding your
                  account or the mobile application. If you wish to opt-out from
                  receiving these types of communications, you may turn them off
                  in your device's settings or browser settings.
                </p>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">
                  5. Data Storage and Security
                </h4>
                <p>
                  We have implemented appropriate technical and organizational
                  security measures designed to protect the security of any
                  personal information we process. However, please also remember
                  that we cannot guarantee that the internet itself is 100%
                  secure.
                </p>
              </section>

              <section className="mb-4">
                <h4 className="fw-bold text-secondary">6. Contact Us</h4>
                <p>
                  If you have questions or comments about this policy, you may
                  email us at{" "}
                  <a href="mailto:fedhalandventures@gmail.com">
                    fedhalandventures@gmail.com
                  </a>{" "}
                  or by post to:
                </p>
                <address className="text-muted border-start border-4 border-danger ps-3">
                  <strong>Fedha Land Ventures Ltd</strong>
                  <br />
                  Nyongo House, Ruiru Town
                  <br />
                  Kiambu County, Kenya
                  <br />
                  Phone: +254 715 113 103
                </address>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
