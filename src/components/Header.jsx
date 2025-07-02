export default function Header() {
  return (
    <header className="h-screen relative overflow-hidden bg-[#3E1F1B] px-6">
      {/* Tło z papieru */}
      <img
        src="/gabinet.webp"
        alt="Tło papierowe"
        className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none select-none"
      />

      {/* Treść wyśrodkowana względem całego ekranu */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <div className="text-gold font-cardo max-w-3xl px-4">
          <h1 className="text-7xl md:text-8xl font-light">Uzdrowisko</h1>
          <p className="text-2xl md:text-3xl italic mt-2">
            Gabinet Fizjoterapii i Terapii Manualnej
          </p>
          <p className="text-xl mt-1">Hanna Nowotczyńska</p>
        </div>
      </div>

      {/* CTA i Scroll cue przy dole */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-gold z-10 text-center">
        <a
          href="#kontakt"
          className="inline-block bg-[#D4AF37] text-[#3E1F1B] px-6 py-3 rounded-md font-medium hover:scale-105 transition"
        >
          Umów wizytę
        </a>
        <a
          href="#onas"
          className="mt-6 block text-sm text-[#D4AF37] animate-bounce opacity-80 hover:opacity-100 transition"
        >
          ↓ Przewiń dalej
        </a>
      </div>
    </header>
  );
}
