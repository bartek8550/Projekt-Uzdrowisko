import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
  return (
    <Link to={`/aktualnosci/${news.id}`} className="block">
      <div className="bg-[#E8C2AE] rounded-xl shadow-lg p-6 w-full h-[320px] transition hover:scale-105">
        <p className="text-sm italic">{news.date}</p>
        <h3 className="text-lg font-semibold mt-2">{news.title}</h3>
        <p className="text-sm mt-2 text-[#4E342E]">{news.excerpt}...</p>
      </div>
    </Link>
  );
}
