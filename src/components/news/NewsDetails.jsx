import { useParams, Link } from 'react-router-dom';
import { newsList } from './newsData';
import { motion as Motion } from 'framer-motion';
import ImageGallery from './ImageGallery';

export default function NewsDetails() {
  const { id } = useParams();
  const news = newsList.find((n) => n.id === id);

  if (!news)
    return (
      <p className="text-center py-20 text-[#3E1F1B]">Nie znaleziono newsa.</p>
    );

  const titleId = `article-${news.id}-title`;

  return (
    <Motion.article
      aria-labelledby={titleId}
      className="relative bg-[#D6A996] min-h-screen py-20 px-6 text-[#3E1F1B] overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {/* TŁO: dlonkwiat.webp */}
      <div className="absolute inset-0 z-0 opacity-8 pointer-events-none select-none" aria-hidden="true">
        <img
          src="/dlonkwiat.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* TREŚĆ */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <header className="space-y-3 pt-20">
          <Motion.h1
            id={titleId}
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {news.title}
          </Motion.h1>

          <Motion.p
            className="italic text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {news.endDateTime ? (
              <>
                <time dateTime={news.dateTime}>6 lutego 2026</time>
                <span aria-hidden="true">–</span>
                <span className="sr-only"> do </span>
                <time dateTime={news.endDateTime}>8 lutego 2026</time>
              </>
            ) : (
              <time dateTime={news.dateTime}>{news.date}</time>
            )}
          </Motion.p>
        </header>

        {/* Obrazek główny */}
        <Motion.img
          src={news.image}
          alt={news.title}
          className="w-full max-h-[560px] object-contain rounded-md shadow-md bg-[#f5e6dd]"
          style={{ objectPosition: news.imagePosition || 'center' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Galeria zdjęć */}
        {news.gallery && <ImageGallery images={news.gallery} title={news.title} />}

        {/* Treść */}
        <Motion.div
          className="space-y-5 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {news.content.split('\n\n').map((paragraph, index) => (
            <p key={`${news.id}-${index}`}>{paragraph}</p>
          ))}
        </Motion.div>

        {/* Powrót */}
        <Motion.div
          className="pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/aktualnosci"
            className="text-[#3E1F1B] underline hover:text-[#4E342E] transition"
          >
            ← Powrót do listy aktualności
          </Link>
        </Motion.div>
      </div>
    </Motion.article>
  );
}
