import { useEffect } from "react";

export default function Header() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="h-screen relative overflow-hidden bg-[#3E1F1B] px-6">
      {/* Tło z papieru */}
      <img
        src="/gabinet.webp"
        alt="Tło papierowe"
        className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none select-none"
      />

      {/* Treść wyśrodkowana */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <div className="text-gold font-cardo max-w-3xl px-4">
          <h1 className="text-5xl md:text-8xl font-light">Uzdrowisko</h1>
          <p className="text-lg md:text-3xl italic mt-2">
            Gabinet Fizjoterapii i Terapii Manualnej
          </p>
          <p className="text-base md:text-xl mt-1">Hanna Nowotczyńska</p>
        </div>
      </div>

      {/* CTA i Scroll cue */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-gold z-10 text-center">
        <button
          onClick={() => handleScrollTo("kontakt")}
          className="inline-block bg-[#D4AF37] text-[#3E1F1B] px-6 py-3 rounded-md font-medium hover:scale-105 transition"
        >
          Umów wizytę
        </button>
        <button
          onClick={() => handleScrollTo("onas")}
          className="mt-6 block w-full text-center text-sm text-[#D4AF37] animate-bounce opacity-80 hover:opacity-100 transition"
        >
          ↓ Przewiń dalej
        </button>
      </div>
    </header>
  );
}
