import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import GalleryDialog from './gallery/GalleryDialog.jsx';

export default function AboutUsContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const certificateIds = [1, 8, 9, 11, 12];
  const certificates = certificateIds.map((certificateId, index) => ({
    src: `/HannaNow/zdj${certificateId}.webp`,
    alt: `Certyfikat Hanny Nowotczyńskiej ${index + 1}`,
  }));

  return (
    <section className="relative bg-[#CCA291] py-20 px-6 sm:px-10 md:px-14 overflow-hidden">
      {/* Tło sekcji */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none select-none" aria-hidden="true">
        <img
          src="/aboutusphoto.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Zawartość górna: zdjęcie + tekst */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 lg:gap-16">
        {/* Zdjęcie założycielki */}
        <Motion.div
          className="md:w-1/3 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/Hanna.webp"
            alt="Założycielka Uzdrowiska"
            className="rounded-lg shadow-lg max-w-xs w-full"
            loading="lazy"
            decoding="async"
          />
        </Motion.div>

        {/* Tekst */}
        <Motion.div
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
        </Motion.div>
      </div>

      {/* Galeria – dyplomy */}
      <div className="relative z-10 max-w-6xl mx-auto mt-16 px-2">
        <h3 className="text-lg md:text-xl font-semibold mb-6 text-[#3E3E3E]">
          Moje dyplomy i certyfikaty
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {certificateIds.map((certificateId, i) => (
            <Motion.button
              key={certificateId}
              type="button"
              className="bg-[#F5E9E2] rounded-md shadow-md p-1.5 cursor-pointer hover:scale-105 transition aspect-[4/3]"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setCurrent(i);
                setIsOpen(true);
              }}
              aria-haspopup="dialog"
              aria-label={`Otwórz certyfikat ${i + 1} w powiększeniu`}
            >
              <img
                src={`/HannaNow/zdj${certificateId}.webp`}
                alt={`Certyfikat ${i + 1}`}
                className="w-full h-full object-cover rounded"
                loading="lazy"
                decoding="async"
              />
            </Motion.button>
          ))}
        </div>
      </div>

      <GalleryDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        items={certificates}
        index={current}
        onIndexChange={setCurrent}
        label="Dyplomy i certyfikaty Hanny Nowotczyńskiej"
        variant="light"
      />
    </section>
  );
}
