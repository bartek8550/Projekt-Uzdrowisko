// src/components/AboutUsContent.jsx

export default function AboutUsContent() {
  return (
    <section className="bg-[#CCA291] py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Zdjęcie założycielki */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src="/Hanna.jpg" // Upewnij się, że obrazek istnieje w public/
            alt="Założycielka Uzdrowiska"
            className="rounded-lg shadow-lg max-w-xs w-full"
          />
        </div>

        {/* Tekst */}
        <div className="md:w-2/3 space-y-6 text-[#3E3E3E]">
          <h2 className="text-2xl md:text-3xl font-bold font-cardo">
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

          <button className="bg-[#4E342E] text-[#D4AF37] px-6 py-2 rounded-md hover:scale-105 transition">
            Zobacz dyplomy i certyfikaty
          </button>
        </div>
      </div>
    </section>
  );
}
