import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { newsList } from "./newsData";
import NewsCard from "./NewsCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function NewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: "trimSnaps",
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
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-32 bg-[#CCA291] text-[#3E3E3E] text-center overflow-hidden">
      <div
        id="aktualnosci"
        className="absolute -top-28"
        aria-hidden="true"
      ></div>

      <img
        src="/cennikTlo.png"
        alt="Tło dekoracyjne"
        className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none select-none z-0"
      />

      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-20"
          variants={fadeInUp}
        >
          Aktualności – Co nowego w Uzdrowisku?
        </motion.h2>

        <div className="relative w-full max-w-[1440px] mx-auto">
          {/* Strzałki */}
          <motion.button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#E8C2AE] rounded-full p-2 text-[#4E342E] hover:text-[#D4AF37] transition disabled:opacity-30 z-10"
            variants={fadeInUp}
            custom={0.1}
          >
            <ChevronLeft size={32} />
          </motion.button>

          {/* Karuzela */}
          <div className="overflow-hidden px-4 sm:px-12" ref={emblaRef}>
            <div className="flex gap-6">
              {newsList.map((news, index) => (
                <motion.div
                  key={news.id}
                  className={`flex-shrink-0 w-[90vw] sm:w-[440px] transition-transform duration-300 ${
                    selectedIndex === index
                      ? "scale-100 z-10"
                      : "scale-95 opacity-90"
                  }`}
                  variants={fadeInUp}
                  custom={index + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <NewsCard news={news} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E8C2AE] rounded-full p-2 text-[#4E342E] hover:text-[#D4AF37] transition disabled:opacity-30 z-10"
            variants={fadeInUp}
            custom={0.2}
          >
            <ChevronRight size={32} />
          </motion.button>
        </div>

        <motion.div className="mt-24" variants={fadeInUp} custom={0.3}>
          <a
            href="/aktualnosci"
            className="bg-[#8D6E62] text-[#CCA291] px-8 py-3 rounded-md hover:scale-105 transition inline-block"
          >
            Przejdź do aktualności
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
