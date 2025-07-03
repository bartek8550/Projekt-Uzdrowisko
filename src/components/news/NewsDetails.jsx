import { useParams, Link } from "react-router-dom";
import { newsList } from "./newsData";

export default function NewsDetails() {
  const { id } = useParams();
  const news = newsList.find((n) => n.id === id);

  if (!news) return <p className="text-center py-20">Nie znaleziono newsa.</p>;

  return (
    <section className="bg-[#D6A996] min-h-screen py-20 px-6 text-[#3E1F1B]">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Obrazek */}
        <img
          src={news.image}
          alt={news.title}
          className="w-full max-h-[400px] object-cover rounded-md shadow-md"
        />

        {/* Tytuł i treść */}
        <h1 className="text-3xl font-bold">{news.title}</h1>
        <p className="italic text-sm">{news.date}</p>
        <div className="whitespace-pre-line leading-relaxed">
          {news.content}
        </div>

        {/* Powrót */}
        <div className="pt-10">
          <Link
            to="/aktualnosci"
            className="text-[#3E1F1B] underline hover:text-[#4E342E] transition"
          >
            ← Powrót do listy aktualności
          </Link>
        </div>
      </div>
    </section>
  );
}
