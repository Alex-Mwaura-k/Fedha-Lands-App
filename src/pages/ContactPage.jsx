import React, { useEffect } from "react";
// Link is no longer needed here since it's inside the component
import { Helmet } from "react-helmet-async";
import Contact from "../components/Contact";

const ContactPage = () => {
  // Ensure we start at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Wrapper with padding for the fixed navbar
    <div>
      <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Get in touch with Fedha Land Ventures. Visit our offices at Nyongo Plaza, Ruiru, call us, or send a message to book a free site visit for prime land in Kenya."
        />
        <meta
          name="keywords"
          content="Contact Fedha Land, Real Estate Kenya Contact, Buy Land Ruiru, Site Visit Booking, Land for sale contacts"
        />
        <link rel="canonical" href="https://fedha.netlify.app/contact" />
        <meta property="og:title" content="Contact Fedha Land Ventures" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Render the Contact Section with the Breadcrumb enabled */}
      <Contact showBreadcrumb={true} />
    </div>
  );
};

export default ContactPage;
