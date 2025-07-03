import { useParams, Link } from 'react-router-dom';
import { newsList } from './newsData';
import { motion } from 'framer-motion';

export default function NewsDetails() {
  const { id } = useParams();
  const news = newsList.find((n) => n.id === id);

  if (!news)
    return (
      <p className="text-center py-20 text-[#3E1F1B]">Nie znaleziono newsa.</p>
    );

  return (
    <motion.section
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
      <div className="absolute inset-0 z-0 opacity-8 pointer-events-none select-none">
        <img
          src="/dlonkwiat.webp"
          alt="Dekoracyjne tło z dłonią i roślinami"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TREŚĆ */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Obrazek */}
        <motion.img
          src={news.image}
          alt={news.title}
          className="w-full max-h-[400px] object-cover rounded-md shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Tytuł */}
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {news.title}
        </motion.h1>

        {/* Data */}
        <motion.p
          className="italic text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {news.date}
        </motion.p>

        {/* Treść */}
        <motion.div
          className="whitespace-pre-line leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {news.content}
        </motion.div>

        {/* Powrót */}
        <motion.div
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
        </motion.div>
      </div>
    </motion.section>
  );
}
