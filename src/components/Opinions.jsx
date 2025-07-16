import { motion } from 'framer-motion';

export default function Opinions() {
  const testimonials = [
    {
      text: 'Trafiłam do Pani Hani z uporczywym bólem pleców, który utrudniał mi pracę, sen i zwykłe codzienne czynności. Szukałam kogoś, kto nie tylko “pomasuje i odeśle”, ale naprawdę zajmie się problemem. Dobrze trafiłam. Już na pierwszej wizycie odbył się dokładny wywiad i badanie. Pani Hania wszystko spokojnie tłumaczyła: skąd może brać się ból, które obszary są przeciążone i co możemy z tym zrobić. Zaproponowała plan terapii manualnej połączonej z prostymi ćwiczeniami domowymi oraz wskazówki dotyczące postawy i przerw w ciągu dnia. Po kilku zabiegach ból pleców zniknął – mogę swobodniej się ruszać, lepiej śpię i nie boję się schylić czy podnieść czegoś cięższego. Równie ważna była atmosfera w gabinecie: spokojna, życzliwa, bez pośpiechu i z prawdziwą uwagą dla pacjentki. Czujesz, że jesteś słuchana, a nie “kolejna w kolejce”. Z całego serca polecam terapię manualną u Pani Hani. Profesjonalizm, skuteczność i świetna atmosfera w jednym miejscu. Na pewno wrócę także profilaktycznie! 😊',
      author: 'Anna K.',
    },
    {
      text: 'Zdecydowanie polecam terapię manualną u Pani Hani – pełen profesjonalizm i podejście z sercem. Już po pierwszej wizycie odczułam wyraźną poprawę. Ból, który towarzyszył mi od dłuższego czasu, zaczął ustępować, a ciało wreszcie mogło się rozluźnić. Pani Hania ma niesamowite wyczucie i wiedzę – wszystko dokładnie tłumaczy, dopytuje, reaguje na sygnały ciała i dostosowuje techniki do moich potrzeb. Czułam się zaopiekowana i zrozumiana. Terapia manualna była dla mnie nie tylko fizyczną ulgą, ale też dużym wsparciem emocjonalnym. Wiem, że wrócę – bo warto dbać o siebie z pomocą takich specjalistów!',
      author: 'Agnieszka C.',
    },
    {
      text: 'Po urazie szukałem konkretnej pomocy – i znalazłem ją w Uzdrowisku. Indywidualne podejście, cierpliwość i pełen profesjonalizm. Pani Hania przeprowadziła dokładne badanie, dobrała terapię pod moje potrzeby i już po kilku wizytach czułem ogromną różnicę. Ból ustąpił, wróciła sprawność, a ja zyskałem motywację do dalszej pracy nad sobą. Dziękuję za wsparcie i skuteczną terapię. Polecam z całego serca!',
      author: 'Michał T.',
    },
    {
      text: 'Chiropraktyka u Pani Hani to najwyższy poziom. Byłam zaskoczona trafnością diagnozy i dokładnością badania fizjoterapeutycznego – wszystko szczegółowe i celne. Po badaniu Pani Hania zaproponowała mi indywidualnie dobrane zabiegi, idealnie dopasowane do moich dolegliwości. Zdecydowałam się na tzw. „nastawianie ciała” – i nie żałuję! Efekt „przed i po” był jak magia – jakby własnymi rękami zabrała ból, z którym żyłam przez 15 lat. Polecam z całego serca! Tylko ta Pani – wie, co robi, zna się na rzeczy, a jej empatia wobec pacjenta sprawia, że na pewno wrócę na kolejne zabiegi. A teraz – ćwiczenia, ćwiczenia, bo ruch to zdrowie! 😊',
      author: 'Alicja F.',
    },
    {
      text: 'Znalazłam się w Uzdrowisku z powodu bólu nóg. Były opuchnięte, nieestetyczne, nie mogłam założyć ładnych ubrań ani butów. Trafiłam do gabinetu z polecenia – i nie zawiodłam się. Byłam w szoku, jak wyglądała wizyta. Gdyby wszystkie wizyty na NFZ przebiegały w taki sposób, więcej ludzi byłoby „naprawionych” i nauczyłoby się zdrowych, codziennych nawyków. Rozumiem też ceny prywatnych gabinetów – wykonujecie świetną robotę! Drenaż nóg był fantastyczny – bolesny, ale jednocześnie przynoszący ogromną ulgę. Wizualnie nogi wyglądały tak, jakby ubyło im 10 kilogramów! Dziękuję, Pani Haniu – będę ćwiczyć, rozciągać się i wracam do Pani na pakiet, bo efekt był niesamowity. Chcę więcej! 😉',
      author: 'Izabela K.',
    },
    {
      text: 'Zgłosiłam się do Uzdrowiska z powodu problemów urologicznych, które bardzo wpływały na mój komfort życia – głównie nietrzymanie moczu i napięcie w obrębie miednicy. Pani Hania od razu stworzyła atmosferę zaufania i zrozumienia, co było dla mnie bardzo ważne przy tak intymnym temacie. Terapia manualna była delikatna, ale niezwykle skuteczna – już po kilku spotkaniach zauważyłam poprawę. Oprócz pracy w gabinecie dostałam ćwiczenia i wskazówki do domu. Czuję, że moje ciało znów jest moje, a nie „przeszkadzające”. Polecam każdej kobiecie, która zmaga się z podobnymi trudnościami – warto zadbać o siebie!',
      author: 'Katarzyna W.',
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

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold mb-16 font-cardo"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Opinie podopiecznych Uzdrowiska
        </motion.h2>

        <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 px-2">
          {testimonials.map((opinion, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid mb-6 bg-[#F4CBB0] text-[#3E1F1B] shadow-xl p-6 rounded-lg"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <p className="text-base leading-relaxed font-light font-cardo whitespace-pre-wrap">
                {opinion.text}
              </p>
              <p className="mt-6 font-cardo italic text-right text-sm text-[#3E1F1B]/80">
                – {opinion.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
