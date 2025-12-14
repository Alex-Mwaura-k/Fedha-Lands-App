// src/pages/AboutPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // 1. Import Link
import { Helmet } from "react-helmet-async";
import About from "../components/About";

const AboutPage = () => {
  return (
    <div
      className="about-page-container"
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        paddingTop: "20px", // Added padding for fixed navbar
      }}
    >
      <Helmet>
        <title>About Us</title>
        <meta
          name="description"
          content="Learn about Fedha Land Ventures, our mission, vision, and our commitment to providing affordable land with ready title deeds in Kenya."
        />
      </Helmet>

      {/* --- ADDED BREADCRUMB --- */}
      <div className="container-md mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-danger text-decoration-none">
                Home
              </Link>
            </li>
            {/* Added 'text-white' so it is visible on the black background */}
            <li
              className="breadcrumb-item active text-white"
              aria-current="page"
            >
              About Us
            </li>
          </ol>
        </nav>
      </div>

      <About />
    </div>
  );
};

export default AboutPage;
