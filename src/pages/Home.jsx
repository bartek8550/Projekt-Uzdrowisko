import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import About from "../components/About";
import QuoteBanner from "../components/QuoteBanner";
import NewsCarousel from "../components/news/NewsCarousel";
import WhyUs from "../components/WhyUs";
import Offer from "../components/Offer";
import Opinions from "../components/Opinions";
import Kontakt from "../components/Kontakt";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { pageMetadata } from '../routeMetadata';

function Home() {
  const location = useLocation();

  // 🔽 Scrolluj po przejściu z innej podstrony
  useEffect(() => {
    const hash = sessionStorage.getItem("scrollToHash");
    if (hash) {
      const scrollToElement = () => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          sessionStorage.removeItem("scrollToHash");
          return true;
        }
        return false;
      };

      if (!scrollToElement()) {
        const interval = setInterval(() => {
          if (scrollToElement()) clearInterval(interval);
        }, 100);
        setTimeout(() => clearInterval(interval), 3000);
      }
    }
  }, [location]);

  return (
    <>
      <Seo
        {...pageMetadata['/']}
        path="/"
      />
      <div className="bg-background text-gold font-cardo">
        <Navbar />
        <Header />
        <About />
        <QuoteBanner
          text="„Równowaga ciała to początek harmonii w całym życiu.”"
          background="#4E342E"
          textColor="#D4AF37"
        />
        <NewsCarousel />
        <WhyUs />
        <Offer />
        <Opinions />
        <Kontakt />
        <Footer />
      </div>
    </>
  );
}

export default Home;
