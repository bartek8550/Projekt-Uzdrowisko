import { useParams, Link } from "react-router-dom";
import { newsList } from "./newsData";
import { motion } from "framer-motion";

export default function NewsDetails() {
  const { id } = useParams();
  const news = newsList.find((n) => n.id === id);

  if (!news)
    return (
      <p className="text-center py-20 text-[#3E1F1B]">Nie znaleziono newsa.</p>
    );

  return (
    <motion.section
      className="bg-[#D6A996] min-h-screen py-20 px-6 text-[#3E1F1B]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Obrazek */}
        <motion.img
          src={news.image}
          alt={news.title}
          className="w-full max-h-[400px] object-cover rounded-md shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Tytuł i treść */}
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {news.title}
        </motion.h1>

        <motion.p
          className="italic text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {news.date}
        </motion.p>

        <motion.div
          className="whitespace-pre-line leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {news.content}
        </motion.div>

        {/* Powrót */}
        <motion.div
          className="pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
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
