export default function WhyUs() {
  return (
    <section className="bg-[#4E2A23] text-[#D4AF37] py-24 px-6 text-center relative overflow-hidden">
      {/* Niewidoczny punkt kotwicy dla scrolla */}
      <div id="whyus" className="absolute -top-28" aria-hidden="true"></div>

      {/* Tło ilustracyjne */}
      <img
        src="/piasek.png"
        alt="Tło dekoracyjne"
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none select-none"
      />

      {/* Treść */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          Kiedy warto odwiedzić Uzdrowisko?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Kafelek 1 */}
          <div className="flex flex-col items-center space-y-4">
            <img src="/icons/Kregoslup.png" alt="Kręgosłup" className="h-36" />
            <p className="text-xl md:text-2xl leading-snug font-medium">
              Walczysz z bólem
              <br />
              kręgosłupa
            </p>
          </div>

          {/* Kafelek 2 */}
          <div className="flex flex-col items-center space-y-4">
            <img src="/icons/ludzik.png" alt="Rehabilitacja" className="h-36" />
            <p className="text-xl md:text-2xl leading-snug font-medium">
              Potrzebujesz
              <br />
              rehabilitacji
            </p>
          </div>

          {/* Kafelek 3 */}
          <div className="flex flex-col items-center space-y-4">
            <img src="/icons/serce.png" alt="Relaks" className="h-36" />
            <p className="text-xl md:text-2xl leading-snug font-medium">
              Chcesz się
              <br />
              zrelaksować
            </p>
          </div>

          {/* Kafelek 4 */}
          <div className="flex flex-col items-center space-y-4">
            <img src="/icons/macica.png" alt="Wsparcie" className="h-36" />
            <p className="text-xl md:text-2xl leading-snug font-medium">
              Szukasz wsparcia
              <br />
              uroginekologicznego
            </p>
          </div>
        </div>

        {/* Hasło */}
        <p className="text-xl md:text-2xl mb-2">
          Każdy zasługuje na życie bez bólu.
        </p>
        <p className="text-xl md:text-2xl mb-8">
          Pozwól nam pomóc odzyskać Twój komfort i równowagę.
        </p>

        {/* CTA */}
        <a
          href="#kontakt"
          className="inline-block border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-md hover:bg-[#D4AF37] hover:text-[#4E2A23] transition"
        >
          Zobacz więcej
        </a>
      </div>
    </section>
  );
}
