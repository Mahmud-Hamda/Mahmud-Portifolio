import { useEffect, useState } from "react";
import "./App.css";
import profileImage from "./assets/images/Profile.jpeg";
import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Services from "./sections/Services/Services";
import Resume from "./sections/Resume/Resume";
import PortfolioSection from "./sections/Portfolio/PortfolioSection";
import Testimonials from "./sections/Testimonials/Testimonials";
import ContactSection from "./sections/Contact/ContactSection";
import Footer from "./components/Footer/Footer";
import ColorSwitcher from "./components/ColorSwitcher/ColorSwitcher";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import Preloader from "./components/Preloader/Preloader";

const profile = {
  name: "Mahmud Hamda",
  firstName: "Mahmud",
  email: "mkhamda3@gmail.com",
  from: "Denver, Colorado",
  profileImage,
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loadingTimeout = setTimeout(() => setIsLoading(false), reduceMotion ? 0 : 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <div
      style={{ position: "relative" }}
      className="side-header"
    >
      {isLoading && <Preloader />}

      <div id="main-wrapper">
        <Header profile={profile} />

        <main id="content">
          <Hero />
          <About profile={profile} />
          <Services />
          <Resume />
          <PortfolioSection />
          <Testimonials />
          <ContactSection profile={profile} />
        </main>
        <Footer />
      </div>

      <TermsAndConditions />
      <Disclaimer />
      <ColorSwitcher />
    </div>
  );
}
