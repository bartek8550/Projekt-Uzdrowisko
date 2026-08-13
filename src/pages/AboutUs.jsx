import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutUsContent from '../components/AboutUsContent';
import Seo from '../components/Seo';
import { pageMetadata } from '../routeMetadata';

function AboutUs() {
  return (
    <>
      <Seo
        {...pageMetadata['/onas']}
        path="/onas"
      />
      <div className="bg-background text-gold font-cardo">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <HeaderOther />
          <AboutUsContent />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
