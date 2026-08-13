import { MapPin, Phone, Clock } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { MAP_URL, PHONE_DISPLAY, PHONE_HREF } from '../businessInfo.js';

export default function Kontakt() {
  return (
    <section className="relative bg-[#D6A996] py-24 px-4 overflow-hidden">
      {/* Niewidoczny punkt scrolla */}
      <div id="kontakt" className="absolute -top-28" aria-hidden="true"></div>

      {/* Tło dekoracyjne */}
      <img
        src="/kosciZdjecie2.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
        loading="lazy"
        decoding="async"
      />

      <Motion.div
        className="relative z-10 max-w-4xl mx-auto bg-[#FBF0EF] rounded-xl shadow-md p-8 flex flex-col md:flex-row items-stretch gap-3 min-h-[450px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Informacje kontaktowe */}
        <Motion.div
          className="flex-1 space-y-6 text-[#3E3E3E] flex flex-col justify-center text-center items-center md:text-left md:items-start md:pl-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-cardo text-left">
            Gabinet Uzdrowisko w Zielonce
          </h2>

          <p>Wizyty stacjonarne odbywają się pod poniższym adresem.</p>

          <address className="flex items-start gap-4 text-left not-italic">
            <MapPin size={28} className="mt-3" />
            <a
              href={MAP_URL}
              className="rounded-sm text-base md:text-lg font-semibold text-left underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E342E]"
            >
              ul. Kolejowa 76,
              <br />
              05–220 Zielonka
              <span className="block text-sm font-normal">Wyznacz trasę</span>
            </a>
          </address>

          <div className="flex items-center gap-4 text-left">
            <Phone size={28} />
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-11 items-center rounded-sm text-base md:text-lg font-semibold underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E342E]"
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="flex items-start gap-4 text-left">
            <Clock size={28} className="mt-1" />
            <div>
              <p className="text-base md:text-lg font-bold">
                Godziny otwarcia:
              </p>
              <p className="text-base md:text-lg font-semibold">
                Pon – Sob: 10:00 – 15:00
              </p>
            </div>
          </div>
        </Motion.div>

        {/* Mapa */}
        <Motion.div
          className="flex-1 w-full flex items-center md:pr-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d304.52355490687387!2d21.160062379419617!3d52.30346935634419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecfd3c261982d%3A0x3596491145180099!2sKolejowa%2076%2C%2005-220%20Zielonka!5e1!3m2!1spl!2spl!4v1771178536906!5m2!1spl!2spl"
            width="100%"
            className="rounded-md border-0 w-full h-[250px] sm:h-[300px] md:h-[400px]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Mapa lokalizacji gabinetu fizjoterapii"
          />
        </Motion.div>
      </Motion.div>
    </section>
  );
}
