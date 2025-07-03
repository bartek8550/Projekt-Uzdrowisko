export default function Offer() {
  const services = [
    {
      title: "Masaż leczniczy pleców",
      time: "60 minut",
      price: "150 zł",
      desc: "Skuteczny masaż leczniczy pleców, który łagodzi napięcia mięśniowe, redukuje ból i przywraca swobodę ruchu. Idealny przy pracy siedzącej, stresie i przeciążeniach kręgosłupa.",
      img: "/offer/masowanie plecow.jpg",
      reverse: false,
    },
    {
      title: "Terapia powięziowa",
      time: "60 minut",
      price: "190 zł",
      desc: "Delikatna, ale głęboko działająca metoda, która poprawia elastyczność tkanek i zmniejsza przewlekłe napięcia. Polecana przy bólach mięśniowo-powięziowych i ograniczeniach ruchomości.",
      img: "/offer/terapia powieziowa.png",
      reverse: true,
    },
    {
      title: "Terapia manualna",
      time: "60 minut",
      price: "180 zł",
      desc: "Indywidualna praca fizjoterapeuty z ciałem pacjenta, mająca na celu przywrócenie prawidłowej pracy stawów i mięśni. Sprawdza się przy bólach kręgosłupa, stawów i w stanach przeciążeniowych.",
      img: "/offer/terapia manualna.png",
      reverse: false,
    },
    {
      title: "Rehabilitacja",
      time: "60 minut",
      price: "190 zł",
      desc: "Ćwiczenia oraz techniki manualne dopasowane do potrzeb pacjenta, wspierające powrót do sprawności po urazach, operacjach lub w przewlekłych schorzeniach.",
      img: "/offer/rehabilitacja.png",
      reverse: true,
    },
  ];

  return (
    <section className="bg-[#CCA291] py-20 px-4 text-[#3E3E3E] text-center relative overflow-hidden">
      {/* Niewidoczny punkt kotwicy dla scrolla */}
      <div id="oferta" className="absolute -top-28" aria-hidden="true"></div>

      {/* Tło obrazkowe */}
      <img
        src="/tlooferta.png"
        alt="Tło dekoracyjne"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none z-0"
      />

      {/* Cała zawartość sekcji */}
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 font-cardo">
          Popularne usługi w Uzdrowisku
        </h2>

        <div className="space-y-10 max-w-6xl mx-auto">
          {services.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                item.reverse ? "md:flex-row-reverse" : "md:flex-row"
              } bg-white rounded-lg overflow-hidden shadow-md`}
            >
              {/* Obraz z overlayem */}
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
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="/cennik"
            className="bg-[#4E342E] text-[#D4AF37] px-10 py-3 rounded-md hover:scale-105 transition inline-block"
          >
            Cennik
          </a>
        </div>
      </div>
    </section>
  );
}
