import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Preloader from "../components/Preloader";
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

function Home() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hidePreloader, setHidePreloader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("seen-preloader");

    if (hasSeen) {
      setIsDone(true);
      setHidePreloader(true);
      return;
    }

    const imageUrls = [
      "/gabinet.webp",
      "/papier.webp",
      "/kosc.webp",
      "/icons/Kregoslup.webp",
      "/icons/ludzik.webp",
      "/offer/masowanie plecow.webp",
      "/offer/rehabilitacja.webp",
    ];

    let loaded = 0;

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;

      const update = () => {
        loaded++;
        const percent = Math.round((loaded / imageUrls.length) * 100);
        setProgress(percent);

        if (loaded === imageUrls.length) {
          sessionStorage.setItem("seen-preloader", "true");
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => setHidePreloader(true), 800);
          }, 300);
        }
      };

      img.onload = update;
      img.onerror = update;
    });
  }, []);

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
      {!hidePreloader && <Preloader progress={progress} isDone={isDone} />}
      <div
        className={`bg-background text-gold font-cardo ${
          !isDone ? "invisible" : "visible"
        }`}
      >
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
