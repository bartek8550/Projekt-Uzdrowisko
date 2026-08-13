import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PriceListContent from '../components/PriceListContent';
import Seo from '../components/Seo';
import { pageMetadata } from '../routeMetadata';

function PriceList() {
  return (
    <>
      <Seo
        {...pageMetadata['/cennik']}
        path="/cennik"
      />
      <div className="bg-background text-gold font-cardo">
        <Navbar />
        <HeaderOther />
        <PriceListContent />
        <Footer />
      </div>
    </>
  );
}

export default PriceList;
