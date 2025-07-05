import { motion } from 'framer-motion';

export default function Opinions() {
  const testimonials = [
    {
      text: 'Ból pleców zniknął po kilku zabiegach. Profesjonalne podejście i świetna atmosfera!',
      author: 'Anna K.',
    },
    {
      text: 'Zdecydowanie polecam terapię manualną – pełen profesjonalizm i wyraźna poprawa.',
      author: 'Agnieszka C.',
    },
    {
      text: 'Indywidualne podejście, cierpliwość i efektywność. Dziękuję za wsparcie po urazie.',
      author: 'Michał T.',
    },
  ];

  return (
    <motion.section
      className="bg-[#4E2A23] text-center pt-24 pb-32 px-4 text-[#D4AF37] relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <div id="opinie" className="absolute -top-28" aria-hidden="true"></div>

      <img
        src="/opinionstlo.webp"
        alt="Tło opinii"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
      />

      <div className="relative z-10">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold mb-16 font-cardo"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Opinie podopiecznych Uzdrowiska
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 max-w-6xl mx-auto">
          {testimonials.map((opinion, index) => (
            <motion.div
              key={index}
              className="bg-[#F4CBB0] text-[#3E1F1B] shadow-xl p-6 w-full md:w-1/3 rounded-md"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <p className="text-lg leading-relaxed font-light font-cardo">
                {opinion.text}
              </p>
              <p className="mt-6 font-cardo italic text-right">
                –{opinion.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
