import { useParams } from 'react-router-dom';
import HeaderOther from "../components/HeaderOther";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import NewsDetails from "../components/news/NewsDetails";
import { newsList } from '../components/news/newsData';
import Seo from '../components/Seo';

function NewsPage() {
  const { id } = useParams();
  const news = newsList.find((item) => item.id === id);

  const title = news
    ? `${news.title} | Aktualności | Uzdrowisko Marki`
    : 'Aktualność | Uzdrowisko Marki';

  const description = news?.excerpt
    ? `${news.excerpt}`
    : 'Szczegóły aktualności z gabinetu Uzdrowisko.';

  const image = news?.image || '/logo-Uzdrowisko-Marki.webp';

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
