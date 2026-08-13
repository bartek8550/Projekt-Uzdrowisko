import { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function GalleryDialog({
  open,
  onClose,
  items,
  index,
  onIndexChange,
  label,
  variant = 'dark',
  showPicker = false,
  closeOnBackdrop = false,
}) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);
  const titleId = useId();
  const statusId = useId();
  const total = items.length;
  const currentItem = items[index];
  const isDark = variant === 'dark';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement;
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  const restoreFocus = () => {
    const trigger = returnFocusRef.current;
    if (trigger?.isConnected) trigger.focus();
    else document.getElementById('main-content')?.focus();
  };

  const setIndex = (nextIndex) => {
    onIndexChange((nextIndex + total) % total);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setIndex(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setIndex(index - 1);
    }
  };

  const handleBackdropClick = (event) => {
    if (closeOnBackdrop && event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={statusId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={restoreFocus}
      onKeyDown={handleKeyDown}
      className={`m-auto h-screen w-screen max-w-none border-0 bg-transparent p-0 backdrop:bg-black/90 backdrop:backdrop-blur-sm ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}
    >
      <h2 id={titleId} className="sr-only">{label}</h2>
      <div
        className="flex h-full w-full items-center justify-center px-14 py-16 md:px-20"
        onClick={handleBackdropClick}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={`absolute right-3 top-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 ${
            isDark
              ? 'text-white/80 hover:bg-white/10 hover:text-white focus-visible:ring-white'
              : 'bg-white/90 text-gray-700 hover:text-black focus-visible:ring-[#4E342E]'
          }`}
          aria-label="Zamknij galerię"
        >
          <X size={30} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          className={`absolute left-1 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 md:left-5 ${
            isDark
              ? 'text-white/75 hover:bg-white/10 hover:text-white focus-visible:ring-white'
              : 'bg-white/90 text-gray-700 hover:text-black focus-visible:ring-[#4E342E]'
          }`}
          aria-label="Poprzednie zdjęcie"
        >
          <ChevronLeft size={36} aria-hidden="true" />
        </button>

        <AnimatePresence mode="wait">
          <Motion.img
            key={`${currentItem.src}-${index}`}
            src={currentItem.src}
            alt={currentItem.alt}
            className={`max-h-[82vh] max-w-full object-contain shadow-2xl ${
              isDark ? 'rounded-lg' : 'rounded bg-white p-3'
            }`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          className={`absolute right-1 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 md:right-5 ${
            isDark
              ? 'text-white/75 hover:bg-white/10 hover:text-white focus-visible:ring-white'
              : 'bg-white/90 text-gray-700 hover:text-black focus-visible:ring-[#4E342E]'
          }`}
          aria-label="Następne zdjęcie"
        >
          <ChevronRight size={36} aria-hidden="true" />
        </button>

        <p
          id={statusId}
          aria-live="polite"
          aria-atomic="true"
          className={`absolute left-1/2 top-5 -translate-x-1/2 rounded-full px-3 py-1 text-sm font-medium ${
            isDark ? 'bg-black/35 text-white/80' : 'bg-white/90 text-gray-700'
          }`}
        >
          Zdjęcie {index + 1} z {total}
        </p>

        {showPicker && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1" aria-label="Wybór zdjęcia">
            {items.map((item, itemIndex) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Pokaż zdjęcie ${itemIndex + 1} z ${total}`}
                aria-current={itemIndex === index ? 'true' : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    itemIndex === index ? 'scale-125 bg-white' : 'bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
}
