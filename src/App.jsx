import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingModal from "./components/BookingModal";
import ScrollingBanner from "./components/ScrollingBanner";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InstallBanner from "./components/InstallBanner";

// Lazy Load Components (Sections)
const Properties = lazy(() => import("./components/Properties"));
const About = lazy(() => import("./components/About"));
const Blog = lazy(() => import("./components/Blog"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));

// Lazy Load Pages (Full Pages)
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const AllProperties = lazy(() => import("./pages/AllProperties"));
// --- NEW IMPORTS ---
const ArticleDetails = lazy(() => import("./pages/ArticleDetails"));
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const AllGallery = lazy(() => import("./pages/AllGallery"));

// HOME PAGE LAYOUT
const Home = () => (
  <>
    <Hero />
    <ScrollingBanner />
    {/* Limits ensure Home Page loads fast and isn't too long */}
    <Properties limit={6} />
    <About />
    <Blog limit={6} />
    <Gallery limit={6} />
    <Contact />
  </>
);

function App() {
  return (
    <>
      <Navbar />
      <InstallBanner />
      <BookingModal />

      {/* Suspense handles the loading state while lazy components fetch */}
      <Suspense
        fallback={<div className="text-center py-5 mt-5">Loading...</div>}
      >
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Property Routes */}
          <Route path="/properties" element={<AllProperties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Blog / Media Center Routes */}
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/article/:id" element={<ArticleDetails />} />

          {/* Gallery Route */}
          <Route path="/gallery" element={<AllGallery />} />
        </Routes>
      </Suspense>

      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
