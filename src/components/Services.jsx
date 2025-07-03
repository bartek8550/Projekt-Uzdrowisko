import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function Services() {
  const services = [
    {
      text: 'Masaż leczniczy',
      icon: '/whyus/UslugiIkonki/512x512/masazleczniczy.png',
    },
    {
      text: 'Rehabilitacja sportowców',
      icon: '/whyus/UslugiIkonki/512x512/sportowcow.png',
    },
    {
      text: 'Drenaż limfatyczny',
      icon: '/whyus/UslugiIkonki/512x512/drenazlimfatyczny.png',
    },
    {
      text: 'Rehabilitacja onkologiczna',
      icon: '/whyus/UslugiIkonki/512x512/rehabilitacjaonkologiczna.png',
    },
    {
      text: 'Korekcja wad postawy u dzieci powyżej 10 roku życia',
      icon: '/whyus/UslugiIkonki/512x512/dziecipowyzej10r2.png',
    },
    {
      text: 'Rehabilitacja kobiet po ciąży',
      icon: '/whyus/UslugiIkonki/512x512/rehabilitacjakobietpociazy.png',
    },
    {
      text: 'Rehabilitacja kardiologiczna',
      icon: '/whyus/UslugiIkonki/512x512/kardiologiczne.png',
    },
    {
      text: 'Terapie specjalistyczne',
      icon: '/whyus/UslugiIkonki/512x512/terapiespecjalistyczne.png',
    },
    {
      text: 'Rehabilitacja kobiet w ciąży',
      icon: '/whyus/UslugiIkonki/512x512/kobietywciazy.png',
    },
    {
      text: 'Rehabilitacja traumatologiczna',
      icon: '/whyus/UslugiIkonki/512x512/traumatologiczna.png',
    },
    {
      text: 'Masaż sportowy',
      icon: '/whyus/UslugiIkonki/512x512/masazsportowy.png',
    },
    {
      text: 'Fizjoterapia uroginekologiczna',
      icon: '/whyus/UslugiIkonki/512x512/uroginekologiczna.png',
    },
  ];

  return (
    <motion.section
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
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src="/koscimiedkreg.webp"
          alt="Tło kości i kwiatów"
          className="w-full h-full object-cover opacity-50"
          style={{
            objectPosition: 'left center, right center',
            transform: 'scale(1)', // przesunięcie elementów poza centrum
          }}
        />
      </div>

      {/* ZAWARTOŚĆ */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Grid usług */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 bg-[#F5D5C5] rounded-lg px-4 py-3 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <img
                src={service.icon}
                alt={service.text}
                className="h-8 w-8 object-contain"
              />
              <p className="text-lg font-medium">{service.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Sekcja kontaktowa */}
        <motion.div
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
            <a href="tel:+48510783269" className="hover:underline">
              +48 510 783 269
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
