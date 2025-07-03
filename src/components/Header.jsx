import { useEffect } from "react";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-gold font-cardo max-w-3xl px-4"
        >
          <h1 className="text-5xl md:text-8xl font-light">Uzdrowisko</h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-3xl italic mt-2"
          >
            Gabinet Fizjoterapii i Terapii Manualnej
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-xl mt-1"
          >
            Hanna Nowotczyńska
          </motion.p>
        </motion.div>
      </div>

      {/* CTA i Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-gold z-10 text-center"
      >
        <button
          onClick={() => handleScrollTo("kontakt")}
          className="inline-block bg-[#D4AF37] text-[#3E1F1B] px-6 py-3 rounded-md font-medium hover:scale-105 transition cursor-pointer"
        >
          Umów wizytę
        </button>
        <button
          onClick={() => handleScrollTo("onas")}
          className="mt-6 block w-full text-center text-sm text-[#D4AF37] animate-bounce opacity-80 hover:opacity-100 transition cursor-pointer"
        >
          ↓ Przewiń dalej
        </button>
      </motion.div>
    </header>
  );
}
