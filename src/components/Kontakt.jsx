import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Kontakt() {
  return (
    <section className="relative bg-[#D6A996] py-24 px-4 overflow-hidden">
      {/* Niewidoczny punkt scrolla */}
      <div id="kontakt" className="absolute -top-28" aria-hidden="true"></div>

      {/* Tło dekoracyjne */}
      <img
        src="/kosciZdjecie2.webp"
        alt="Tło kontaktu"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
      />

      <motion.div
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
        <motion.div
          className="flex-1 space-y-6 text-[#3E3E3E] flex flex-col justify-center text-center items-center md:text-left md:items-start md:pl-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold font-cardo text-left">
            Skontaktuj się z nami
          </h2>

          <div className="flex items-start gap-4 text-left">
            <MapPin size={28} className="mt-3" />
            <p className="text-base md:text-lg font-semibold text-left">
              ul. Małachowskiego 4/11,
              <br />
              05–270 Marki
            </p>
          </div>

          <div className="flex items-center gap-4 text-left">
            <Phone size={28} />
            <p className="text-base md:text-lg font-semibold">
              +48 510 783 269
            </p>
          </div>

          <div className="flex items-start gap-4 text-left">
            <Clock size={28} className="mt-1" />
            <div>
              <p className="text-base md:text-lg font-bold">
                Godziny otwarcia:
              </p>
              <p className="text-base md:text-lg font-semibold">
                Pon – Pt: 08:30 – 15:00 i 17:00 - 20:00
              </p>
              <p className="text-base md:text-lg font-semibold">
                Sobota: 10:00 – 15:00
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          className="flex-1 w-full flex items-center md:pr-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.9739792747696!2d21.108808475580332!3d52.334618149939566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecf7239ae1475%3A0xd2b252f211c63ffc!2sMa%C5%82achowskiego%204%2C%2005-270%20Marki!5e0!3m2!1spl!2spl!4v1751665731866!5m2!1spl!2spl"
            width="100%"
            className="rounded-md border-0 w-full h-[250px] sm:h-[300px] md:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa lokalizacji gabinetu fizjoterapii"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
