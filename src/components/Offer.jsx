import { motion } from 'framer-motion';

export default function Offer() {
  const services = [
    {
      title: 'Masaż leczniczy pleców',
      time: '60 minut',
      price: '150 zł',
      desc: 'Skuteczny masaż leczniczy pleców, który łagodzi napięcia mięśniowe, redukuje ból i przywraca swobodę ruchu. Idealny przy pracy siedzącej, stresie i przeciążeniach kręgosłupa.',
      img: '/offer/masowanie plecow.jpg',
      reverse: false,
    },
    {
      title: 'Terapia powięziowa',
      time: '60 minut',
      price: '190 zł',
      desc: 'Delikatna, ale głęboko działająca metoda, która poprawia elastyczność tkanek i zmniejsza przewlekłe napięcia. Polecana przy bólach mięśniowo-powięziowych i ograniczeniach ruchomości.',
      img: '/offer/terapia powieziowa.png',
      reverse: true,
    },
    {
      title: 'Terapia manualna',
      time: '60 minut',
      price: '180 zł',
      desc: 'Indywidualna praca fizjoterapeuty z ciałem pacjenta, mająca na celu przywrócenie prawidłowej pracy stawów i mięśni. Sprawdza się przy bólach kręgosłupa, stawów i w stanach przeciążeniowych.',
      img: '/offer/terapia manualna.png',
      reverse: false,
    },
    {
      title: 'Rehabilitacja',
      time: '60 minut',
      price: '190 zł',
      desc: 'Ćwiczenia oraz techniki manualne dopasowane do potrzeb pacjenta, wspierające powrót do sprawności po urazach, operacjach lub w przewlekłych schorzeniach.',
      img: '/offer/rehabilitacja.png',
      reverse: true,
    },
  ];

  return (
    <section className="bg-[#CCA291] py-20 px-4 text-[#3E3E3E] text-center relative overflow-hidden">
      <div id="oferta" className="absolute -top-28" aria-hidden="true"></div>

      <img
        src="/tlooferta.png"
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
          <a
            href="/cennik"
            className="inline-block px-10 py-3 text-lg font-semibold text-[#D4AF37] bg-[#4E342E] rounded-xl shadow-md transition-transform transition-shadow duration-300 hover:shadow-xl hover:scale-103 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/40"
          >
            Cennik
          </a>
        </motion.div>
      </div>
    </section>
  );
}
