import Navbar from "./components/Navbar";
import InstallBanner from "./components/InstallBanner";
import Hero from "./components/Hero";
import BookingModal from "./components/BookingModal";
import ScrollingBanner from "./components/ScrollingBanner";
import Properties from "./components/Properties";
import About from "./components/About";
import Blog from "./components/Blog";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <BookingModal />
        <ScrollingBanner />
        <Properties />
        <About />
        <Blog />
        <Gallery />
        <Contact /> {/* <-- Added this */}
      </main>

      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
