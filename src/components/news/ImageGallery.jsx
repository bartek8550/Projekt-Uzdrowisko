import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import GalleryDialog from '../gallery/GalleryDialog.jsx';

export default function ImageGallery({ images, title }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length <= 1) return null;

  const items = images.map((src, index) => ({
    src,
    alt: `${title} — zdjęcie ${index + 1}`,
  }));

  return (
    <>
      <Motion.button
        type="button"
        className="relative w-full rounded-md overflow-hidden border border-[#D4AF37]/35 shadow-sm group cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#D4AF37]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#4E342E]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onClick={() => {
          setCurrentIndex(1);
          setLightboxOpen(true);
        }}
        aria-haspopup="dialog"
        aria-label="Otwórz galerię zdjęć"
      >
        <span className="relative flex h-18 items-center justify-center gap-2 bg-[#4E342E]/95 px-4 text-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="font-semibold tracking-wide text-[#D4AF37]">Otwórz galerię</span>
        </span>
      </Motion.button>

      <GalleryDialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={items}
        index={currentIndex}
        onIndexChange={setCurrentIndex}
        label={`Galeria zdjęć: ${title}`}
        showPicker
        closeOnBackdrop
      />
    </>
  );
}
