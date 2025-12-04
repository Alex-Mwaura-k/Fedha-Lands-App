import React from "react";
import { Helmet } from "react-helmet-async";
import Properties from "../components/Properties";

const AllProperties = () => {
  return (
    <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
      {/* --- SEO METADATA --- */}
      <Helmet>
        <title>Our Properties</title>
        <meta
          name="description"
          content="Browse our complete portfolio of prime land for sale in Kenya. We offer affordable plots with ready title deeds in Kithyoko, Malindi, and Kitengela. Invest in your future today."
        />
        <meta
          name="keywords"
          content="Land for sale Kenya, All plots listings, Kithyoko plots, Malindi land, Kitengela plots, Affordable land Kenya, Ready title deeds"
        />
        <link rel="canonical" href="https://fedha.netlify.app/properties" />

        {/* Social Media Cards */}
        <meta
          property="og:title"
          content="Prime Land for Sale in Kenya - Fedha Land Listings"
        />
        <meta
          property="og:description"
          content="Explore our full catalog of value-added plots. Water, electricity, and fencing included. Book a free site visit now."
        />
        <meta
          property="og:url"
          content="https://fedha.netlify.app/properties"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* --- PAGE CONTENT --- */}
      <div className="container-md mb-4">
        <h1 className="fw-bold text-dark">Our Prime Properties</h1>
        <p className="text-muted">
          Browse our complete portfolio of prime land in Kenya.
        </p>
      </div>

      {/* Render Properties WITHOUT the limit prop to show ALL items */}
      <Properties />
    </div>
  );
};

export default AllProperties;
