import { motion as Motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '../businessInfo.js';

export default function Services() {
  const services = [
    {
      text: 'Masaż leczniczy',
      icon: '/whyus/UslugiIkonki/512x512/masazleczniczy.webp',
    },
    {
      text: 'Rehabilitacja sportowców',
      icon: '/whyus/UslugiIkonki/512x512/sportowcow.webp',
    },
    {
      text: 'Drenaż limfatyczny',
      icon: '/whyus/UslugiIkonki/512x512/drenazlimfatyczny.webp',
    },
    {
      text: 'Rehabilitacja onkologiczna',
      icon: '/whyus/UslugiIkonki/512x512/rehabilitacjaonkologiczna.webp',
    },
    {
      text: 'Korekcja wad postawy u dzieci powyżej 10 roku życia',
      icon: '/whyus/UslugiIkonki/512x512/dziecipowyzej10r2.webp',
    },
    {
      text: 'Rehabilitacja kobiet po ciąży',
      icon: '/whyus/UslugiIkonki/512x512/rehabilitacjakobietpociazy.webp',
    },
    {
      text: 'Rehabilitacja kardiologiczna',
      icon: '/whyus/UslugiIkonki/512x512/kardiologiczne.webp',
    },
    {
      text: 'Terapie specjalistyczne',
      icon: '/whyus/UslugiIkonki/512x512/terapiespecjalistyczne.webp',
    },
    {
      text: 'Rehabilitacja kobiet w ciąży',
      icon: '/whyus/UslugiIkonki/512x512/kobietywciazy.webp',
    },
    {
      text: 'Rehabilitacja traumatologiczna',
      icon: '/whyus/UslugiIkonki/512x512/traumatologiczna.webp',
    },
    {
      text: 'Masaż sportowy',
      icon: '/whyus/UslugiIkonki/512x512/masazsportowy.webp',
    },
    {
      text: 'Fizjoterapia uroginekologiczna',
      icon: '/whyus/UslugiIkonki/512x512/uroginekologiczna.webp',
    },
  ];

  return (
    <Motion.section
      className="relative py-24 px-6 text-[#3E3E3E] bg-[#CCA291] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {/* TŁO Z OBRAZEM */}
      <div className="absolute inset-0 z-0 opacity-30" aria-hidden="true">
        <img
          src="/koscimiedkreg.webp"
          alt=""
          className="w-full h-full object-cover opacity-50"
          style={{
            objectPosition: 'left center, right center',
            transform: 'scale(1)', // przesunięcie elementów poza centrum
          }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* ZAWARTOŚĆ */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="sr-only">Zakres usług Uzdrowiska</h2>
        {/* Grid usług */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Motion.li
              key={index}
              className="flex items-center gap-4 bg-[#F5D5C5] rounded-lg px-4 py-3 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <img
                src={service.icon}
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
                loading="lazy"
                decoding="async"
              />
              <p className="text-lg font-medium">{service.text}</p>
            </Motion.li>
          ))}
        </ul>

        {/* Sekcja kontaktowa */}
        <Motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg md:text-xl font-medium mb-2">
            Po więcej informacji zapraszamy do kontaktu pod numerem telefonu
          </p>
          <div className="flex justify-center items-center gap-3 text-xl font-semibold">
            <Phone className="h-6 w-6" />
            <a href={PHONE_HREF} className="hover:underline">
              {PHONE_DISPLAY}
            </a>
          </div>
        </Motion.div>
      </div>
    </Motion.section>
  );
}
