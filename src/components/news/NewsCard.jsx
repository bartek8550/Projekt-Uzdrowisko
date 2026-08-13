import { Link } from "react-router-dom";
import { prefetchRoute } from '../../utils/routeImports';

export default function NewsCard({ news }) {
  return (
    <Link
      to={`/aktualnosci/${news.id}`}
      className="block"
      onMouseEnter={() => prefetchRoute(`/aktualnosci/${news.id}`)}
      onFocus={() => prefetchRoute(`/aktualnosci/${news.id}`)}
    >
      <article className="bg-[#E8C2AE] rounded-xl shadow-lg p-6 w-full h-[360px] transition hover:scale-95">
        <time className="text-sm italic" dateTime={news.dateTime}>{news.date}</time>
        <h3 className="text-lg font-semibold mt-2">{news.title}</h3>
        <p className="text-md mt-2 text-[#4E342E]">{news.excerpt}...</p>
      </article>
    </Link>
  );
}
