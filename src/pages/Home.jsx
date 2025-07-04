import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import About from '../components/About';
import QuoteBanner from '../components/QuoteBanner';
import NewsCarousel from '../components/news/NewsCarousel';
import WhyUs from '../components/WhyUs';
import Offer from '../components/Offer';
import Opinions from '../components/Opinions';
import Kontakt from '../components/Kontakt';
import Footer from '../components/Footer';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const images = document.images;
    let loaded = 0;

    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    for (let i = 0; i < images.length; i++) {
      if (images[i].complete) {
        loaded++;
      } else {
        images[i].addEventListener('load', () => {
          loaded++;
          if (loaded === images.length) {
            setIsLoading(false);
          }
        });
        images[i].addEventListener('error', () => {
          loaded++;
          if (loaded === images.length) {
            setIsLoading(false);
          }
        });
      }
    }

    if (loaded === images.length) {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-gold text-xl">
        Ładowanie zdjęć...
      </div>
    );
  }

  return (
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
  );
}

export default Home;
