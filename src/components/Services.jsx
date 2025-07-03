export default function Services() {
    const services = [
      {
        text: "Masaż leczniczy",
        icon: "/whyus/UslugiIkonki/512x512/masazleczniczy.png",
      },
      {
        text: "Rehabilitacja sportowców",
        icon: "/whyus/UslugiIkonki/512x512/sportowcow.png",
      },
      {
        text: "Drenaż limfatyczny",
        icon: "/whyus/UslugiIkonki/512x512/drenazlimfatyczny2.png",
      },
      {
        text: "Rehabilitacja onkologiczna",
        icon: "/whyus/UslugiIkonki/512x512/rehabilitacjaonkologiczna.png",
      },
      {
        text: "Korekcja wady postawy u dzieci powyżej 10 roku życia",
        icon: "/whyus/UslugiIkonki/512x512/dziecipowyzej10r.png",
      },
      {
        text: "Rehabilitacja kobiet po ciąży",
        icon: "/whyus/UslugiIkonki/512x512/rehabilitacjakobietpociazy.png",
      },
      {
        text: "Rehabilitacja kardiologiczna",
        icon: "/whyus/UslugiIkonki/512x512/kardiologiczne.png",
      },
      {
        text: "Terapie specjalistyczne",
        icon: "/whyus/UslugiIkonki/512x512/terapiespecjalistyczne.png",
      },
      {
        text: "Rehabilitacja kobiet w ciąży",
        icon: "/whyus/UslugiIkonki/512x512/kobietywciazy.png",
      },
      {
        text: "Rehabilitacja traumatologiczna",
        icon: "/whyus/UslugiIkonki/512x512/traumatologiczna.png",
      },
      {
        text: "Masaż sportowy",
        icon: "/whyus/UslugiIkonki/512x512/masazsportowy.png",
      },
      {
        text: "Fizjoterapia uroginekologiczna",
        icon: "/whyus/UslugiIkonki/512x512/uroginekologiczna.png",
      },
    ];
      

  return (
    <section className="bg-[#E4AA94] py-24 px-6 text-[#3E1F1B] text-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        {services.map((service, index) => (
          <div key={index} className="flex items-center gap-4">
            <img src={service.icon} alt="" className="h-8 w-8 object-contain" />
            <p className="text-lg">{service.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-lg md:text-xl font-medium mb-2">
          Po więcej informacji zapraszamy do kontaktu pod numerem telefonu
        </p>
        <div className="flex justify-center items-center gap-3 text-xl font-semibold">
          <img src="/icons/phone.png" alt="Telefon" className="h-6 w-6" />
          <a href="tel:+48510783269" className="hover:underline">
            +48 510 783 269
          </a>
        </div>
      </div>
    </section>
  );
}
