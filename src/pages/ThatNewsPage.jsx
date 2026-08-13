import { useParams } from 'react-router-dom';
import HeaderOther from "../components/HeaderOther";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import NewsDetails from "../components/news/NewsDetails";
import { newsList } from '../components/news/newsData';
import Seo from '../components/Seo';
import NotFound from './NotFound';

function NewsPage() {
  const { id } = useParams();
  const news = newsList.find((item) => item.id === id);

  if (!news) return <NotFound />;

  const title = `${news.title} | Aktualności | Uzdrowisko Marki`;

  const description = news.excerpt;

  const image = news.image;

  return (
    <div className="bg-background text-gold font-cardo">
      <Seo
        title={title}
        description={description}
        path={id ? `/aktualnosci/${id}` : '/aktualnosci'}
        image={image}
        type="article"
      />
      <Navbar />
      <HeaderOther />
      <NewsDetails />
      <Footer />
    </div>
  );
}

export default NewsPage;
