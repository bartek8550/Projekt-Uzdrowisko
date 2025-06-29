import { useParams } from 'react-router-dom';
import { newsList } from './newsData';

export default function NewsDetail() {
  const { id } = useParams();
  const news = newsList.find((n) => n.id === id);

  if (!news) return <p>Nie znaleziono newsa.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-[#3E3E3E]">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="italic mb-2">{news.date}</p>
      <p className="whitespace-pre-line">{news.content}</p>
    </div>
  );
}
