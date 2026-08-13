import { useParams } from 'react-router-dom';
import HeaderOther from "../components/HeaderOther";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import NewsDetails from "../components/news/NewsDetails";
import { newsList } from '../components/news/newsData';
import Seo from '../components/Seo';
import NotFound from './NotFound';
import { metadataForNews } from '../routeMetadata';

function NewsPage() {
  const { id } = useParams();
  const news = newsList.find((item) => item.id === id);

  if (!news) return <NotFound />;

  const metadata = metadataForNews(news);

  return (
    <div className="bg-background text-gold font-cardo">
      <Seo
        {...metadata}
        path={id ? `/aktualnosci/${id}` : '/aktualnosci'}
        article={{ headline: news.title }}
      />
      <Navbar />
      <HeaderOther />
      <NewsDetails />
      <Footer />
    </div>
  );
}

export default NewsPage;
