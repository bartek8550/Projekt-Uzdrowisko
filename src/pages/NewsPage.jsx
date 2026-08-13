import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsPageContent from '../components/news/NewsPageContent';
import Seo from '../components/Seo';
import { pageMetadata } from '../routeMetadata';

function NewsPage() {
  return (
    <>
      <Seo
        {...pageMetadata['/aktualnosci']}
        path="/aktualnosci"
      />
      <div className="bg-background text-gold font-cardo">
        <Navbar />
        <HeaderOther />
        <NewsPageContent />
        <Footer />
      </div>
    </>
  );
}

export default NewsPage;
