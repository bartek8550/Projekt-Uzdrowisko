import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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

  return (
    <>
      <motion.button
        type="button"
        className="relative w-full rounded-md overflow-hidden shadow-md group cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D57A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#3E1F1B]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onClick={() => openLightbox(images.length > 1 ? 1 : 0)}
        aria-label="Otwórz galerię zdjęć"
      >
        <div className="relative h-18 md:h-18 bg-[#3E1F1B]/90">
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/35 to-black/25 transition-all duration-300 group-hover:via-black/45" />
          <div className="relative z-10 h-full w-full flex items-center justify-center gap-2 px-4 text-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#F2D57A] transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-[#F2D57A] font-semibold tracking-wide">
              Otwórz galerię
            </span>
          </div>
        </div>
      </motion.button>

      {/* Lightbox / Karuzela na pełnym ekranie — renderowany przez portal */}
      {createPortal(
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center"
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
                className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors p-2"
                aria-label="Zamknij galerię"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Numer zdjęcia */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/70 text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Strzałka lewo */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 md:left-6 z-10 text-white/70 hover:text-white transition-colors p-2"
                aria-label="Poprzednie zdjęcie"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Strzałka prawo */}
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 md:right-6 z-10 text-white/70 hover:text-white transition-colors p-2"
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
                  className="relative max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              {/* Kropki nawigacyjne */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
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
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
