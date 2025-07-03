import HeaderOther from "../components/HeaderOther";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import NewsDetails from "../components/news/NewsDetails";

function NewsPage() {
  return (
    <div className="bg-background text-gold font-cardo">
      <Navbar />
      <HeaderOther />
      <NewsDetails />
      <Footer />
    </div>
  );
}

export default NewsPage;
