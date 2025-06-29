import Header from '../components/Header';
import Navbar from '../components/Navbar';
import About from '../components/About';
import QuoteBanner from '../components/QuoteBanner';
import NewsCarousel from '../components/news/NewsCarousel';
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
    </div>
  );
}

export default Home;
