import HeaderOther from "../components/HeaderOther";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import Services from "../components/Services";

function NewsPage() {
  return (
    <div className="bg-background text-gold font-cardo">
      <Navbar />
      <HeaderOther />
      <Services />
      <Footer />
    </div>
  );
}

export default NewsPage;
