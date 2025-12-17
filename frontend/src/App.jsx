import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// --- STATIC IMPORTS (Core) ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InstallBanner from "./components/InstallBanner";
import BookingModal from "./components/BookingModal";
import Loading from "./components/Loading";
import NotificationManager from "./components/NotificationManager";

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

// Pages
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

// --- HOME PAGE LAYOUT ---
const Home = () => (
  <>
    <Hero />
    <ScrollingBanner />
    <Properties limit={6} />
    <About />
    <Blog limit={6} />
    <Gallery limit={6} />
    {/* Organized Trust Sections */}
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

            {/* Properties Routes */}
            <Route path="/properties" element={<AllProperties />} />
            {/* UPDATED: Route now uses :slug instead of :id for SEO */}
            <Route path="/property/:slug" element={<PropertyDetails />} />

            {/* Blog Routes */}
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/article/:slug" element={<ArticleDetails />} />

            {/* General Pages */}
            <Route path="/gallery" element={<AllGallery />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Careers Routes */}
            <Route path="/careers" element={<Careers />} />
            {/* UPDATED: Aligned with modular slug structure */}
            <Route path="/careers/:slug" element={<JobDetails />} />

            {/* Legal & Policy */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Catch All */}
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
