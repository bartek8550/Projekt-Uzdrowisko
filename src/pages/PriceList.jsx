import HeaderOther from "../components/HeaderOther";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PriceListContent from "../components/PriceListContent";

function PriceList() {
  return (
    <div className="bg-background text-gold font-cardo">
      <Navbar />
      <HeaderOther />
      <PriceListContent />
      <Footer />
    </div>
  );
}

export default PriceList;
