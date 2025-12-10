import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
import * as bootstrap from "bootstrap";

// --- STATIC IMPORTS (Core) ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InstallBanner from "./components/InstallBanner";
import BookingModal from "./components/BookingModal";
import Loading from "./components/Loading";

// --- NEW IMPORTS (Mocking them for single file or standard structure) ---
// Note: In your real project, these are imported from the files we created above.
// import Testimonials from "./components/Testimonials";
// import FAQ from "./components/FAQ";

// --- LAZY IMPORTS ---
const Hero = lazy(() => import("./components/Hero"));
const ScrollingBanner = lazy(() => import("./components/ScrollingBanner"));
const Properties = lazy(() => import("./components/Properties"));
const About = lazy(() => import("./components/About"));
const Blog = lazy(() => import("./components/Blog"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const FAQ = lazy(() => import("./components/FAQ"));
const Careers = lazy(() => import("./pages/Careers"));
const JobDetails = lazy(() => import("./pages/JobDetails"));

// Pages... (Keep existing page imports)
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const AllProperties = lazy(() => import("./pages/AllProperties"));
const ArticleDetails = lazy(() => import("./pages/ArticleDetails"));
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const AllGallery = lazy(() => import("./pages/AllGallery"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

// --- NOTIFICATION MANAGER ---
import NotificationManager from "./components/NotificationManager";

// --- UPDATED HOME PAGE LAYOUT ---
const Home = () => (
  <>
    <Hero />
    <ScrollingBanner />
    <Properties limit={6} />
    <About />
    <Blog limit={6} />
    <Gallery limit={6} />

    {/* NEW SECTIONS ADDED HERE */}
    <Testimonials />
    <FAQ />

    <Contact />
  </>
);

function App() {
  return (
    <>
      <NotificationManager />
      <Navbar />
      <InstallBanner />
      <BookingModal />

      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ... Keep all existing routes ... */}
            <Route path="/properties" element={<AllProperties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/gallery" element={<AllGallery />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<JobDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
