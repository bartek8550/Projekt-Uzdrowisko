import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.8, duration: 0.5 } },
};

export default function About() {
  return (
    <section className="relative bg-[#CCA291] py-16 px-4 overflow-hidden">
      <div id="onas" className="absolute -top-28" aria-hidden="true"></div>

      {/* Tło dekoracyjne */}
      <img
        src="/papier.webp"
        alt="Papier"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <motion.div
          className="text-center md:text-left md:w-1/2 space-y-6 text-[#3E3E3E]"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-cardo"
            variants={fadeLeft}
          >
            Uzdrowisko – przestrzeń dla Twojego ciała i spokoju
          </motion.h2>

          <motion.p className="text-xl leading-relaxed" variants={fadeUp}>
            Uzdrowisko to kameralne, profesjonalne miejsce, w którym nowoczesna
            fizjoterapia spotyka się ze spokojem i indywidualnym podejściem.
          </motion.p>

          <motion.p
            className="text-xl leading-relaxed"
            custom={0.2}
            variants={fadeUp}
          >
            Każdy klient otrzymuje pełną uwagę, precyzyjnie dobraną terapię i
            atmosferę, która sprzyja regeneracji oraz powrotowi do pełni sił.
          </motion.p>

          <motion.p
            className="text-xl leading-relaxed"
            custom={0.4}
            variants={fadeUp}
          >
            Wierzymy, że skuteczna terapia to nie tylko technika, ale też
            zaufanie i komfort. Kameralny charakter Uzdrowiska pozwala skupić
            się na prawdziwych potrzebach ciała – bez pośpiechu, presji i
            rozpraszaczy.
          </motion.p>

          <motion.div variants={fadeScale}>
            <Link
              to="/onas"
              className="inline-block bg-[#4E342E] text-[#D4AF37] px-6 py-2 mt-4 rounded-md hover:scale-105 transition"
            >
              Czytaj więcej
            </Link>
          </motion.div>
        </motion.div>

        {/* Obrazek z animacją po scrollu */}
        <motion.div
          className="md:w-1/2 hidden md:flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/kosc.webp"
            alt="Kość z kwiatami"
            className="max-w-sm w-full md:ml-auto opacity-75"
          />
        </motion.div>
      </div>
    </section>
  );
}
