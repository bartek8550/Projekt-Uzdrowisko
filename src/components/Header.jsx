import { motion as Motion } from 'framer-motion';

export default function Header() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="h-screen relative overflow-hidden bg-[#3E1F1B] px-6">
      {/* Tło z papieru */}
      <img
        src="/optimized/gabinet-1024.webp"
        srcSet="/optimized/gabinet-640.webp 640w, /optimized/gabinet-1024.webp 1024w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
        fetchPriority="high"
        decoding="async"
      />

      {/* Treść wyśrodkowana */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-10">
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-gold font-cardo max-w-3xl px-4"
        >
          <h1 className="text-5xl md:text-8xl font-light">
            Uzdrowisko <span className="block text-2xl md:text-4xl mt-3">fizjoterapia w Zielonce</span>
          </h1>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-3xl italic mt-2"
          >
            Gabinet Fizjoterapii i Terapii Manualnej
          </Motion.p>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-xl mt-1"
          >
            Hanna Nowotczyńska • ul. Kolejowa 76
          </Motion.p>
        </Motion.div>
      </div>

      {/* CTA i Scroll cue */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-24 sm:bottom-16 left-1/2 -translate-x-1/2 text-gold z-10 text-center"
      >
        <button
          onClick={() => handleScrollTo('kontakt')}
          className="inline-block bg-[#D4AF37] text-[#3E1F1B] px-6 py-3 rounded-md font-medium hover:scale-105 transition cursor-pointer"
        >
          Umów wizytę
        </button>
        <button
          onClick={() => handleScrollTo('onas')}
          className="mt-6 block w-full text-center text-sm text-[#D4AF37] animate-bounce opacity-80 hover:opacity-100 transition cursor-pointer"
        >
          ↓ Przewiń dalej
        </button>
      </Motion.div>
    </header>
  );
}
