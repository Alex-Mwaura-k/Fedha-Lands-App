import React from "react";
import { Helmet } from "react-helmet-async";
import Blog from "../components/Blog";

const AllBlogs = () => {
  return (
    <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
      {/* --- SEO METADATA --- */}
      <Helmet>
        <title>Blogs Center</title>
        <meta
          name="description"
          content="Stay updated with the latest real estate news, land investment guides, and success stories from Fedha Land Ventures. Expert advice on buying land in Kenya."
        />
        <meta
          name="keywords"
          content="Real estate blog Kenya, Land investment tips, Buying land guide, Fedha Land news, Property market updates, Title deed verification, Fencing guides"
        />
        <link rel="canonical" href="https://fedha.netlify.app/blogs" />

        {/* Social Media Cards */}
        <meta property="og:title" content="Fedha Land Ventures Media Center" />
        <meta
          property="og:description"
          content="Read expert guides and watch virtual tours of our prime properties in Kithyoko, Malindi, and Kitengela."
        />
        <meta property="og:url" content="https://fedha.netlify.app/blogs" />
        <meta property="og:type" content="blog" />
      </Helmet>

      {/* --- PAGE CONTENT --- */}
      <div className="container-md mb-4">
        <h1 className="fw-bold text-dark">Blogs Center</h1>
        <p className="text-muted">
          Stay updated with the latest news, guides, and videos from Fedha Land.
        </p>
      </div>

      {/* Renders Blog without a limit, so it shows everything */}
      <Blog />
    </div>
  );
};

export default AllBlogs;
