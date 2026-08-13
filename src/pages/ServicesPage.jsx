import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import Seo from '../components/Seo';
import { pageMetadata } from '../routeMetadata';

function ServicesPage() {
  return (
    <>
      <Seo
        {...pageMetadata['/dlaczego']}
        path="/dlaczego"
      />
      <div className="bg-background text-gold font-cardo">
        <Navbar />
        <HeaderOther />
        <Services />
        <Footer />
      </div>
    </>
  );
}

export default ServicesPage;
