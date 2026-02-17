import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageGallery({ images, title }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxOpen, goNext, goPrev]);

  if (!images || images.length <= 1) return null;

  const extraCount = images.length - 1;

  return (
    <>
      {/* Miniaturka z overlay "+N zdjęć" */}
      <motion.div
        className="relative cursor-pointer rounded-md overflow-hidden shadow-md group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onClick={() => openLightbox(0)}
      >
        <div className="grid grid-cols-2 gap-1 h-48">
          <img
            src={images[1]}
            alt={`${title} — zdjęcie 2`}
            className="w-full h-full object-cover object-top"
          />
          <div className="relative">
            <img
              src={images.length > 2 ? images[2] : images[1]}
              alt={`${title} — zdjęcie 3`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all group-hover:bg-black/40">
              <span className="text-white text-lg font-semibold">
                +{extraCount} {extraCount === 1 ? 'zdjęcie' : extraCount < 5 ? 'zdjęcia' : 'zdjęć'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox / Karuzela na pełnym ekranie */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ciemne tło */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeLightbox}
            />

            {/* Zamknij */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition-colors p-2"
              aria-label="Zamknij galerię"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Numer zdjęcia */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-white/70 text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Strzałka lewo */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 md:left-6 z-50 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Poprzednie zdjęcie"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Strzałka prawo */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 md:right-6 z-50 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Następne zdjęcie"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Zdjęcie */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${title} — zdjęcie ${currentIndex + 1}`}
                className="relative z-10 max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Kropki nawigacyjne */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Zdjęcie ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
