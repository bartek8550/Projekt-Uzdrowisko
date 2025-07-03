import { motion } from "framer-motion";

export default function PriceListContent() {
  return (
    <motion.section
      className="relative bg-[#d6a999] text-[#754A3A] py-16 px-4 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <img
        src="/cennikTlo.png"
        alt="Tło cennika"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
        <motion.img
          src="/logoLepsze.webp"
          alt="Uzdrowisko logo"
          className="mx-auto w-28 h-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} // ✅ TO DODAJ
        />

        <motion.h2
          className="text-3xl font-cardo font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Cennik usług
        </motion.h2>

        <motion.div
          className="space-y-8 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            {
              title: "Masaże lecznicze",
              items: [
                { name: "Pleców (60min)", price: "150 zł" },
                { name: "Całego ciała (90min)", price: "220 zł" },
              ],
            },
            {
              title: "Drenaż limfatyczny",
              items: [{ name: "Rąk lub nóg (60min)", price: "180 zł" }],
            },
            {
              title: "Masaże sportowe",
              items: [
                { name: "Pleców (60min)", price: "200 zł" },
                { name: "Całego ciała (90min)", price: "250 zł" },
              ],
            },
            {
              title: "Terapie specjalistyczne",
              items: [
                { name: "Terapia powięziowa (60min)", price: "190 zł" },
                { name: "Rehabilitacja (60min)", price: "190 zł" },
                { name: "Terapia manualna (60min)", price: "190 zł" },
                { name: "Fizjoterapia (60min)", price: "190 zł" },
              ],
            },
            {
              title: "Pakiety masaży leczniczych",
              items: [
                { name: "Mały pakiet: 5 masaży + 1 gratis!", price: "1050 zł" },
                {
                  name: "Duży pakiet: 10 masaży + 2 gratis!",
                  price: "2100 zł",
                },
              ],
            },
            {
              title: "Pakiety rehabilitacyjne",
              items: [
                {
                  name: "Mały pakiet: 5 zabiegów + 1 gratis!",
                  price: "850 zł",
                },
                {
                  name: "Duży pakiet: 10 zabiegów + 2 gratis!",
                  price: "1800 zł",
                },
              ],
            },
            {
              title: "Wizyty domowe (teren Marek)",
              items: [
                { name: "60 min", price: "300 zł" },
                { name: "90 min", price: "400 zł" },
                { name: "120 min", price: "550 zł" },
              ],
            },
          ].map((section, idx) => (
            <AnimatedSection key={idx} {...section} />
          ))}

          <motion.p
            className="text-base italic text-center mt-8 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }} // ✅ TO DODAJ
          >
            Poza Markami – dojazd na terenie Warszawy + 20zł*
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Komponent sekcji z animacją
function AnimatedSection({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }} // ✅ TO DODAJ
    >
      <h3 className="font-cardo font-semibold text-lg mb-2">{title}</h3>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-[#f9e4dc] rounded-full px-4 py-1 text-sm sm:text-base"
          >
            <span>{item.name}</span>
            <span className="font-semibold">{item.price}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
