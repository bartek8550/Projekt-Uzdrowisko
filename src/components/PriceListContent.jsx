import { motion as Motion } from 'framer-motion';

export default function PriceListContent() {
  const sections = [
    {
      title: 'W gabinecie',
      className: 'md:row-span-2',
      items: [
        {
          name: 'Pierwsza wizyta fizjoterapeutyczna',
          price: '250 zł',
          note: 'Diagnoza, plan terapii i pierwsza sesja',
        },
        {
          name: 'Kolejne wizyty fizjoterapeutyczne',
          price: '200 zł',
          note: 'Terapia manualna, drenaż limfatyczny, masaż leczniczy',
        },
        {
          name: 'Wizyta rozpoznawcza (konsultacja + usługa w gabinecie)',
          price: '250 zł',
        },
        {
          name: 'Manipulacja krótkodźwiękowa (chiropraktyka/terapia manualna)',
          price: '400 zł',
          note: 'mgr Hanna Nowotczyńska',
        },
      ],
    },
    {
      title: 'Wizyty domowe',
      items: [
        {
          name: 'Wizyta domowa',
          price: '300 zł',
          note: 'Do 60 minut na terenie Marek',
        },
        {
          name: 'Wizyta metodą chiropraktyki i terapii manualnej',
          price: '400 zł',
          note: 'Do 60 minut, dojazd wliczony na terenie Marek',
        },
      ],
      footer: 'Poza Markami dojazd na terenie Warszawy + 20 zł',
    },
    {
      title: 'Usługi specjalistyczne',
      items: [
        {
          name: 'Terapia manualna połączona z chiropraktyką',
          price: '400 zł',
          note: 'mgr Hanna Nowotczyńska',
        },
      ],
    },
  ];

  return (
    <Motion.section
      className="relative bg-[#d6a999] text-[#4E342E] py-16 px-4 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <img
        src="/cennikTlo.webp"
        alt="Tło cennika"
        className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#d6a999]/60 via-[#e7d4c7]/50 to-[#d6a999]/80 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        <Motion.img
          src="/logo-Uzdrowisko-Marki.webp"
          alt="Uzdrowisko logo"
          className="mx-auto w-36 h-auto opacity-95 drop-shadow-[0_1px_2px_rgba(62,31,27,0.25)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        />

        <Motion.h2
          className="text-3xl font-cardo font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Cennik usług
        </Motion.h2>

        <Motion.p
          className="max-w-2xl mx-auto text-base text-[#4E342E]/80"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Aktualny cennik wizyt w gabinecie i w domu. Stawki obejmują pełną
          opiekę fizjoterapeutyczną; opłata za dojazd doliczana jest tylko poza
          terenem Marek.
        </Motion.p>

        <Motion.div
          className="grid gap-6 text-left md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {sections.map((section, idx) => (
            <AnimatedSection key={idx} {...section} />
          ))}
        </Motion.div>
      </div>
    </Motion.section>
  );
}

function AnimatedSection({ title, items, footer, className = '' }) {
  return (
    <Motion.div
      className={`bg-white/85 backdrop-blur-sm rounded-2xl shadow-md border border-white/60 p-6 space-y-4 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="font-cardo font-semibold text-xl text-[#4E342E]">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex flex-col gap-1 rounded-xl px-4 py-3 bg-[#f9e4dc] text-sm sm:text-base shadow-sm"
          >
            <div className="flex justify-between items-start gap-3">
              <span className="font-medium text-[#3E3E3E]">{item.name}</span>
              <span className="font-semibold text-[#4E342E] whitespace-nowrap">
                {item.price}
              </span>
            </div>
            {item.note && (
              <span className="text-xs sm:text-sm text-[#4E342E]/80">
                {item.note}
              </span>
            )}
          </li>
        ))}
      </ul>

      {footer && (
        <p className="text-sm text-[#4E342E]/80 border-t border-[#4E342E]/10 pt-3">
          {footer}
        </p>
      )}
    </Motion.div>
  );
}
