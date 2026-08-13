import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PriceListContent from '../components/PriceListContent';
import Seo from '../components/Seo';

function PriceList() {
  return (
    <>
      <Seo
        title="Cennik usług | Uzdrowisko Marki"
        description="Sprawdź aktualny cennik fizjoterapii, terapii manualnej, chiropraktyki oraz wizyt domowych w gabinecie Uzdrowisko."
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
