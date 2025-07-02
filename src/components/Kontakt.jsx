import { MapPin, Phone, Clock } from 'lucide-react';

export default function Kontakt() {
  return (
    <section
      id="kontakt"
      className="relative bg-[#D6A996] py-24 px-4 scroll-mt-24 overflow-hidden"
    >
      {/* Tło dekoracyjne */}
      <img
        src="/kosciZdjecie2.png"
        alt="Tło kontaktu"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto bg-[#FAF4EF] rounded-xl shadow-md p-15 flex flex-col md:flex-row items-stretch gap-3 min-h-[450px]">
        {/* Informacje kontaktowe */}
        <div className="flex-1 space-y-6 text-[#3E3E3E] flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-cardo">
            Skontaktuj się z nami
          </h2>

          <div className="flex items-start gap-4">
            <MapPin size={28} className="mt-3" />
            <p className="text-lg font-semibold text-[#3E3E3E]">
              ul. Małachowskiego 4/11,
              <br />
              05–270 Marki
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Phone size={28} />
            <p className="text-lg font-semibold text-[#3E3E3E]">
              +48 510 783 269
            </p>
          </div>

          <div className="flex items-start gap-4">
            <Clock size={28} className="mt-1" />
            <div>
              <p className="text-lg font-bold text-[#3E3E3E]">
                Godziny otwarcia:
              </p>
              <p className="text-lg font-semibold text-[#3E3E3E]">
                Pon – Pt: 09:00 – 18:00
              </p>
              <p className="text-lg font-semibold text-[#3E3E3E]">
                Sobota: 10:00 – 17:00
              </p>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="flex-1 w-full flex items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.974154451407!2d21.108808477754486!3d52.33461497201319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecf7239ae1475%3A0x8ae4d8abb99f69f2!2sMa%C5%82achowskiego%204%2F11%2C%2005-270%20Marki!5e0!3m2!1spl!2spl!4v1751483242423!5m2!1spl!2spl"
            width="100%"
            height="400"
            className="rounded-md border-0 w-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
