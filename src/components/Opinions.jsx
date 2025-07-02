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
    <section
      id="opinie"
      className="bg-[#4E2A23] text-center py-24 px-4 text-[#D4AF37] relative overflow-hidden"
    >
      {/* Tło dekoracyjne */}
      <img
        src="/opinionstlo.png"
        alt="Tło opinii"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
      />

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-16 font-cardo">
          Opinie naszych podopiecznych
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 max-w-6xl mx-auto">
          {testimonials.map((opinion, index) => (
            <div
              key={index}
              className="bg-[#F4CBB0] text-[#3E1F1B] shadow-xl p-6 w-full md:w-1/3 rounded-md"
            >
              <p className="text-lg leading-relaxed font-light font-cardo">
                {opinion.text}
              </p>
              <p className="mt-6 font-cardo italic text-right">
                –{opinion.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
