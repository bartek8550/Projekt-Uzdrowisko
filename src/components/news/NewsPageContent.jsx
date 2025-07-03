import { newsList } from "./newsData";
import { Link } from "react-router-dom";

export default function NewsPage() {
  return (
    <section className="bg-[#CCA291] min-h-screen py-24 px-6 text-[#3E3E3E]">
      <div className="max-w-6xl mx-auto space-y-20">
        {newsList.map((news) => (
          <div
            key={news.id}
            className="flex flex-col md:flex-row gap-10 items-center"
          >
            {/* Obrazek */}
            <div className="w-full md:w-1/2">
              <img
                src={news.image}
                alt={news.title}
                className="rounded-md shadow-md w-full object-cover max-h-[300px]"
              />
            </div>

            {/* Tekst */}
            <div className="w-full md:w-1/2 space-y-4">
              <p className="text-sm">{news.date}</p>
              <h2 className="text-2xl font-bold">{news.title}</h2>
              <p>{news.excerpt}</p>
              <Link
                to={`/aktualnosci/${news.id}`}
                className="text-[#3E1F1B] font-semibold hover:underline"
              >
                Czytaj więcej →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
