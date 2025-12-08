import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Import the Notification Manager
import NotificationManager from "./components/NotificationManager";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingModal from "./components/BookingModal";
import ScrollingBanner from "./components/ScrollingBanner";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InstallBanner from "./components/InstallBanner";
import Loading from "./components/Loading";

// Lazy Load Components (Sections)
const Properties = lazy(() => import("./components/Properties"));
const About = lazy(() => import("./components/About"));
const Blog = lazy(() => import("./components/Blog"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));

// Lazy Load Pages (Full Pages)
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const AllProperties = lazy(() => import("./pages/AllProperties"));
const ArticleDetails = lazy(() => import("./pages/ArticleDetails"));
const AllBlogs = lazy(() => import("./pages/AllBlogs"));
const AllGallery = lazy(() => import("./pages/AllGallery"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

// HOME PAGE LAYOUT
const Home = () => (
  <>
    <Hero />
    <ScrollingBanner />
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
      {/* Run Notification Logic invisibly on app load */}
      <NotificationManager />

      <Navbar />
      <InstallBanner />
      <BookingModal />

      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Property Routes */}
            <Route path="/properties" element={<AllProperties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />

            {/* Blog Routes */}
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/article/:id" element={<ArticleDetails />} />

            {/* Gallery Route */}
            <Route path="/gallery" element={<AllGallery />} />

            {/* About Route */}
            <Route path="/about" element={<AboutPage />} />

            {/* Contact Route */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Privacy Policy Route */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* --- FIX: ADDED MISSING ROUTE HERE --- */}
            <Route path="/terms" element={<TermsOfService />} />

            {/* 404 Route */}
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
