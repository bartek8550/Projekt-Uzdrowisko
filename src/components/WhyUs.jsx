import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function WhyUs() {
  const reasons = [
    {
      icon: '/img-icons/Kregoslup.webp',
      alt: 'Ikona kręgosłupa',
      label: (
        <>
          Walczysz z bólem
          <br />
          kręgosłupa
        </>
      ),
    },
    {
      icon: '/img-icons/ludzik.webp',
      alt: 'Ikona rehabilitacji',
      label: (
        <>
          Potrzebujesz
          <br />
          rehabilitacji
        </>
      ),
    },
    {
      icon: '/img-icons/serce.webp',
      alt: 'Ikona relaksu i regeneracji',
      label: (
        <>
          Chcesz się
          <br />
          zrelaksować
        </>
      ),
    },
    {
      icon: '/img-icons/macica.webp',
      alt: 'Ikona wsparcia uroginekologicznego',
      label: (
        <>
          Szukasz wsparcia
          <br />
          uroginekologicznego
        </>
      ),
    },
  ];

  return (
    <section className="bg-[#4E2A23] text-[#D4AF37] py-24 px-6 text-center relative overflow-hidden">
      {/* Niewidoczny punkt kotwicy dla scrolla */}
      <div id="whyus" className="absolute -top-28" aria-hidden="true"></div>

      {/* Tło ilustracyjne */}
      <img
        src="/piasek.webp"
        alt="Tło dekoracyjne"
        className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none select-none"
      />

      <Motion.div
        className="relative z-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Nagłówek */}
        <Motion.h2
          className="text-3xl md:text-4xl font-bold mb-16"
          variants={fadeInUp}
        >
          Kiedy warto odwiedzić Uzdrowisko?
        </Motion.h2>

        {/* Kafelki */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {reasons.map((reason, i) => (
            <Motion.div
              key={i}
              className="flex flex-col items-center space-y-4"
              custom={i}
              variants={fadeInUp}
            >
              <img
                src={reason.icon}
                alt={reason.alt}
                className="h-36"
              />
              <p className="text-xl md:text-2xl leading-snug font-medium">
                {reason.label}
              </p>
            </Motion.div>
          ))}
        </div>

        {/* Hasła */}
        <Motion.p
          className="text-xl md:text-2xl mb-2"
          variants={fadeInUp}
          custom={4}
        >
          Każdy zasługuje na życie bez bólu.
        </Motion.p>
        <Motion.p
          className="text-xl md:text-2xl mb-8"
          variants={fadeInUp}
          custom={5}
        >
          Pozwól nam pomóc odzyskać Twój komfort i równowagę.
        </Motion.p>

        {/* CTA */}
        <Motion.div variants={fadeInUp} custom={6}>
          <Link
            to="/dlaczego"
            className="inline-block border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-md hover:bg-[#D4AF37] hover:text-[#4E2A23] transition"
          >
            Sprawdź usługi
          </Link>
        </Motion.div>
      </Motion.div>
    </section>
  );
}
