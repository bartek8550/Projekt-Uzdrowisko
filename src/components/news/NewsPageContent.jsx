import { newsList } from './newsData';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NewsPage() {
  return (
    <motion.section
      className="relative bg-[#CCA291] min-h-screen py-24 px-6 text-[#3E3E3E] overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      {/* TŁO ZDEFINIOWANE Z OBRAZU */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none select-none">
        <img
          src="/recekwiaty.webp"
          alt="Dekoracyjne tło z rękami i kwiatami"
          className="w-full h-full object-cover mx-auto"
        />
      </div>

      {/* TREŚĆ */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {newsList.map((news, index) => (
          <motion.div
            key={news.id}
            className="flex flex-col md:flex-row gap-10 items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Obrazek */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
            >
              <img
                src={news.image}
                alt={news.title}
                className="rounded-md shadow-md w-full object-cover max-h-[300px]"
              />
            </motion.div>

            {/* Tekst */}
            <motion.div
              className="w-full md:w-1/2 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <p className="text-sm">{news.date}</p>
              <h2 className="text-2xl font-bold">{news.title}</h2>
              <p>{news.excerpt}</p>
              <Link
                to={`/aktualnosci/${news.id}`}
                className="text-[#3E1F1B] font-semibold hover:underline"
              >
                Czytaj więcej →
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
