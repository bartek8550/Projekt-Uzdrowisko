import { newsList } from "./newsData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsPage() {
  return (
    <motion.section
      className="bg-[#CCA291] min-h-screen py-24 px-6 text-[#3E3E3E]"
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
      <div className="max-w-6xl mx-auto space-y-20">
        {newsList.map((news, index) => (
          <motion.div
            key={news.id}
            className="flex flex-col md:flex-row gap-10 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Obrazek */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
              viewport={{ once: true }}
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
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
