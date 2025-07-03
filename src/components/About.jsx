import { Link } from "react-router-dom";

export default function About() {
  return (
    <section
      id="onas"
      className="relative bg-[#CCA291] py-16 px-4 scroll-mt-24 overflow-hidden"
    >
      <img
        src="/papier.webp"
        alt="Papier"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="text-center md:text-left md:w-1/2 space-y-6 text-[#3E3E3E]">
          <h2 className="text-3xl md:text-4xl font-bold font-cardo">
            Uzdrowisko – przestrzeń dla Twojego ciała i spokoju
          </h2>
          <p className="text-xl leading-relaxed">
            Uzdrowisko to kameralne, profesjonalne miejsce, w którym nowoczesna
            fizjoterapia spotyka się ze spokojem i indywidualnym podejściem.
          </p>
          <p className="text-xl leading-relaxed">
            Każdy klient otrzymuje pełną uwagę, precyzyjnie dobraną terapię i
            atmosferę, która sprzyja regeneracji oraz powrotowi do pełni sił.
          </p>
          <p className="text-xl leading-relaxed">
            Wierzymy, że skuteczna terapia to nie tylko technika, ale też
            zaufanie i komfort. Kameralny charakter Uzdrowiska pozwala skupić
            się na prawdziwych potrzebach ciała – bez pośpiechu, presji i
            rozpraszaczy.
          </p>
          <Link
            to="/onas"
            className="inline-block bg-[#4E342E] text-[#D4AF37] px-6 py-2 mt-4 rounded-md hover:scale-105 transition"
          >
            Czytaj więcej
          </Link>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="/kosc.webp"
            alt="Kość z kwiatami"
            className="max-w-sm w-full md:ml-auto opacity-75"
          />
        </div>
      </div>
    </section>
  );
}
