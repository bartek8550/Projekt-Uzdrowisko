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
