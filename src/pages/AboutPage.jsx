// src/pages/AboutPage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import About from "../components/About";

const AboutPage = () => {
  return (
    // Add the 'about-page-container' class here
    <div
      className="about-page-container"
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
      }}
    >
      <Helmet>
        <title>About Us | Fedha Land Ventures</title>
        <meta
          name="description"
          content="Learn about Fedha Land Ventures, our mission, vision, and our commitment to providing affordable land with ready title deeds in Kenya."
        />
      </Helmet>

      <About />
    </div>
  );
};

export default AboutPage;
