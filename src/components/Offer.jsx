import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Offer() {
  const services = [
    {
      title: 'Pierwsza wizyta fizjoterapeutyczna',
      time: 'ok. 60 minut',
      price: '250 zł',
      desc: 'Diagnoza, wywiad i pierwsze techniki terapeutyczne w gabinecie. Ustalamy plan działania i cele na kolejne wizyty.',
      img: '/offer/rehabilitacja.webp',
      reverse: false,
    },
    {
      title: 'Terapia manualna + chiropraktyka',
      time: 'ok. 60 minut',
      price: '400 zł',
      desc: 'Zaawansowane techniki łączone prowadzone przez mgr Hannę Nowotczyńską. Pomagają w uwolnieniu napięć i poprawie ruchomości.',
      img: '/offer/terapia manualna.webp',
      reverse: true,
    },
    {
      title: 'Wizyta domowa (Marki i okolice)',
      time: 'do 60 minut',
      price: '300 zł',
      desc: 'Pełna sesja fizjoterapeutyczna z dojazdem do pacjenta. Łączymy komfort domowy z terapią dobraną do Twoich potrzeb.',
      img: '/offer/masowanie plecow.webp',
      reverse: false,
    },
    {
      title: 'Chiropraktyka z dojazdem',
      time: 'do 60 minut',
      price: '400 zł',
      desc: 'Chiropraktyka i terapia manualna w Twoim domu. Idealne, gdy potrzebujesz ulgi, ale nie możesz dotrzeć do gabinetu.',
      img: '/offer/terapia powieziowa.webp',
      reverse: true,
    },
  ];

  return (
    <section className="bg-[#CCA291] py-20 px-4 text-[#3E3E3E] text-center relative overflow-hidden">
      <div id="oferta" className="absolute -top-28" aria-hidden="true"></div>

      <img
        src="/tlooferta.webp"
        alt="Tło dekoracyjne"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none z-0"
      />

      <div className="relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 font-cardo"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Popularne usługi w Uzdrowisku
        </motion.h2>

        <div className="space-y-10 max-w-6xl mx-auto">
          {services.map((item, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
              } bg-white rounded-lg overflow-hidden shadow-md`}
              initial={{
                opacity: 0,
                x: item.reverse ? 100 : -100,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
            >
              <div className="md:w-1/2 relative h-60">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#4E342E]/80"></div>
                <div className="absolute bottom-0 left-0 text-[#FDE4B3] px-6 py-4 text-left z-10">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-sm italic">Czas: {item.time}</p>
                  <p className="text-sm italic">Cena: {item.price}</p>
                </div>
              </div>

              <div className="md:w-1/2 flex items-center justify-center p-6 text-left">
                <p className="text-lg leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            to="/cennik"
            className="inline-block px-10 py-3 text-lg font-semibold text-[#D4AF37] bg-[#4E342E] rounded-xl shadow-md transition-transform transition-shadow duration-300 hover:shadow-xl hover:scale-103 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/40"
          >
            Cennik
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
