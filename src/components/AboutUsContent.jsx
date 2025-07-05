import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutUsContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const total = 12;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className="relative bg-[#CCA291] py-20 px-6 sm:px-10 md:px-14 overflow-hidden">
      {/* Tło sekcji */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none">
        <img
          src="/aboutusphoto.webp"
          alt="Dekoracyjne tło"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Zawartość górna: zdjęcie + tekst */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-10 lg:gap-16">
        {/* Zdjęcie założycielki */}
        <motion.div
          className="md:w-1/3 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/Hanna.webp"
            alt="Założycielka Uzdrowiska"
            className="rounded-lg shadow-lg max-w-xs w-full"
          />
        </motion.div>

        {/* Tekst */}
        <motion.div
          className="md:w-2/3 space-y-5 text-[#3E3E3E] text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-xl md:text-2xl font-bold font-cardo">
            Założycielka Uzdrowiska | Hanna Nowotczyńska
          </h2>
          <p>
            Specjalizuję się w rehabilitacji ortopedycznej, sportowej i
            pourazowej. Pomagam zarówno zawodowym sportowcom, jak i osobom
            aktywnym fizycznie, które chcą odzyskać sprawność po kontuzjach,
            przeciążeniach lub operacjach.
          </p>
          <p>
            Wspieram kobiety w terapii okołoporodowej, prowadzę również
            rehabilitację dzieci od 10. roku życia, bazując na sprawdzonych
            metodach i empatycznym podejściu. Stawiam na indywidualnie dobraną
            terapię – łączę techniki z zakresu fizjoterapii, terapii manualnej i
            elementów chiropraktyki, zawsze dostosowując metody do potrzeb i
            możliwości danej osoby.
          </p>
          <p>
            Nieustannie poszerzam swoje kompetencje, uczestnicząc w szkoleniach
            i kursach doskonalących – wierzę, że skuteczna pomoc zaczyna się od
            solidnej wiedzy i uważności na człowieka.
          </p>
        </motion.div>
      </div>

      {/* Galeria – dyplomy */}
      <div className="relative z-10 max-w-6xl mx-auto mt-16 px-2">
        <h3 className="text-lg md:text-xl font-semibold mb-6 text-[#3E3E3E]">
          Moje dyplomy i certyfikaty
        </h3>
        <div className="flex flex-wrap justify-start gap-4">
          {Array.from({ length: total }, (_, i) => (
            <motion.div
              key={i}
              className="w-40 h-28 bg-[#F5E9E2] rounded-md shadow-md p-1.5 cursor-pointer hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setCurrent(i);
                setIsOpen(true);
              }}
            >
              <img
                src={`/HannaNow/zdj${i + 1}.webp`}
                alt={`Certyfikat ${i + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal z karuzelą */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-lg max-w-4xl w-full p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center">
                <img
                  src={`/HannaNow/zdj${current + 1}.webp`}
                  alt={`Certyfikat ${current + 1}`}
                  className="max-h-[70vh] object-contain rounded shadow"
                />
                <p className="mt-2 text-sm text-gray-600">
                  {current + 1} / {total}
                </p>
              </div>

              <div className="absolute top-1/2 left-2 -translate-y-1/2">
                <button
                  onClick={prev}
                  className="text-gray-700 hover:text-black"
                >
                  <ChevronLeft size={32} />
                </button>
              </div>
              <div className="absolute top-1/2 right-2 -translate-y-1/2">
                <button
                  onClick={next}
                  className="text-gray-700 hover:text-black"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
