import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';
import { newsList } from './newsData';
import NewsCard from './NewsCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section
      id="aktualnosci"
      className="py-32 bg-[#CCA291] text-[#3E3E3E] text-center scroll-mt-24"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-20">
        Aktualności – Co nowego w Uzdrowisku?
      </h2>

      <div className="relative w-full max-w-[1440px] mx-auto">
        {/* Lewa strzałka */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#E8C2AE] rounded-full p-2 text-[#4E342E] hover:text-[#D4AF37] transition disabled:opacity-30 z-10"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Karuzela */}
        <div className="overflow-hidden px-12" ref={emblaRef}>
          <div className="flex gap-6">
            {newsList.map((news, index) => (
              <div
                key={news.id}
                className={`flex-shrink-0 w-[440px] transition-transform duration-300 ${
                  selectedIndex === index
                    ? 'scale-100 z-10'
                    : 'scale-90 opacity-90'
                }`}
              >
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        </div>

        {/* Prawa strzałka */}
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E8C2AE] rounded-full p-2 text-[#4E342E] hover:text-[#D4AF37] transition disabled:opacity-30 z-10"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="mt-24">
        <a
          href="/aktualnosci"
          className="bg-[#8D6E62] text-[#CCA291] px-8 py-3 rounded-md hover:scale-105 transition inline-block"
        >
          Przejdź do aktualności
        </a>
      </div>
    </section>
  );
}
