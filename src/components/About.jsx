import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

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
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
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
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.8, duration: 0.5 },
  },
};

export default function About() {
  return (
    <section className="relative bg-[#CCA291] py-12 px-6 sm:px-10 md:px-14 overflow-hidden">
      <div id="onas" className="absolute -top-28" aria-hidden="true"></div>

      {/* Tło dekoracyjne */}
      <img
        src="/papier.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
        loading="lazy"
        decoding="async"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 lg:gap-16">
        <Motion.div
          className="text-center md:text-left md:w-1/2 space-y-6 text-[#3E3E3E] max-w-prose md:max-w-full"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Motion.h2
            className="text-xl md:text-2xl font-bold font-cardo"
            variants={fadeLeft}
          >
            Gabinet fizjoterapii w Zielonce
          </Motion.h2>

          <Motion.p
            className="text-base md:text-lg leading-relaxed"
            variants={fadeUp}
          >
            Uzdrowisko to kameralny gabinet Hanny Nowotczyńskiej przy ul.
            Kolejowej 76 w Zielonce. Wizyty są prowadzone z uwzględnieniem
            indywidualnych potrzeb i możliwości pacjenta.
          </Motion.p>

          <Motion.p
            className="text-base md:text-lg leading-relaxed"
            custom={0.2}
            variants={fadeUp}
          >
            Pierwsza wizyta obejmuje wywiad, ocenę potrzeb i ustalenie planu
            dalszej pracy. W gabinecie dostępne są m.in. fizjoterapia, terapia
            manualna, drenaż limfatyczny i masaż leczniczy.
          </Motion.p>

          <Motion.p
            className="text-base md:text-lg leading-relaxed"
            custom={0.4}
            variants={fadeUp}
          >
            Pełny zakres usług oraz aktualne ceny znajdziesz w cenniku. Termin
            wizyty możesz umówić telefonicznie.
          </Motion.p>

          <Motion.div variants={fadeScale}>
            <Link
              to="/onas"
              className="inline-block bg-[#4E342E] text-[#D4AF37] px-5 py-2 mt-4 rounded-md hover:scale-105 transition text-sm md:text-base"
            >
              Poznaj Hannę Nowotczyńską
            </Link>
          </Motion.div>
        </Motion.div>

        {/* Obrazek z animacją po scrollu */}
        <Motion.div
          className="md:w-1/2 hidden md:flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/kosc.webp"
            alt=""
            aria-hidden="true"
            className="max-w-sm w-full md:ml-auto opacity-75"
            loading="lazy"
            decoding="async"
          />
        </Motion.div>
      </div>
    </section>
  );
}
