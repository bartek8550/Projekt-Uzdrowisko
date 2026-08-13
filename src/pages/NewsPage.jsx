import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsPageContent from '../components/news/NewsPageContent';
import Seo from '../components/Seo';

function NewsPage() {
  return (
    <>
      <Seo
        title="Aktualności | Uzdrowisko Marki"
        description="Najnowsze informacje z gabinetu Uzdrowisko: nowości, szkolenia, rozwój usług oraz ważne ogłoszenia dla pacjentów."
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
