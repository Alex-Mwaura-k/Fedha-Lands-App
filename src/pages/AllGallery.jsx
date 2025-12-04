import React from "react";
import { Helmet } from "react-helmet-async";
import Gallery from "../components/Gallery";

const AllGallery = () => {
  return (
    <div>
      <Helmet>
        <title>Gallery - Life at Fedha</title>
        <meta
          name="description"
          content="Explore the Fedha Land Ventures gallery. View photos of our prime plots in Kithyoko, Malindi, and Kitengela, plus team events and happy clients receiving title deeds."
        />
        <meta
          name="keywords"
          content="Fedha Land Gallery, Real Estate Photos Kenya, Land for sale photos, Site visit pictures, Title deed handover, Kithyoko plots, Malindi land"
        />
        <link rel="canonical" href="https://fedhalandventures.co.ke/gallery" />

        {/* Social Media Previews (Open Graph) */}
        <meta
          property="og:title"
          content="Life at Fedha Land Ventures - Photo Gallery"
        />
        <meta
          property="og:description"
          content="See our prime properties, site visits, and happy investors. Join us on our journey to empower land ownership in Kenya."
        />
        <meta property="og:url" content="https://fedha.netlify.app/gallery" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Gallery />
    </div>
  );
};

export default AllGallery;
