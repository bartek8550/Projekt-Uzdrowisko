import HeaderOther from "../components/HeaderOther";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import NewsPageContent from "../components/news/NewsPageContent";

function NewsPage() {
  return (
    <div className="bg-background text-gold font-cardo">
      <Navbar />
      <HeaderOther />
      <NewsPageContent />
      <Footer />
    </div>
  );
}

export default NewsPage;
