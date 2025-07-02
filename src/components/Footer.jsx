import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#4E2A23] text-[#D4AF37] text-sm pt-16 pb-6 px-4 border-t border-[#D4AF37]">
      <div className="max-w-xl mx-auto flex flex-col md:flex-row justify-center items-start gap-12 pb-6 relative">
        {/* Lewa sekcja */}
        <div className="flex-1 flex justify-end">
          <div className="text-right max-w-sm">
            {/* Nagłówek + logo */}
            <div className="flex items-center justify-end gap-4 mb-4">
              <h3 className="text-xl md:text-2xl font-semibold font-cardo">
                Gabinet <br /> Uzdrowisko
              </h3>
              <img src="/logoLepsze.webp" alt="Logo" className="h-16 w-auto" />
            </div>

            {/* Opis */}
            <p className="leading-relaxed">
              Profesjonalna fizjoterapia i masaż – skuteczne podejście, troska o
              pacjenta i indywidualny plan terapii
            </p>
          </div>
        </div>

        {/* Separator – pionowa złota linia */}
        <div className="hidden md:block w-[1px] bg-[#D4AF37] h-full self-stretch" />

        {/* Prawa sekcja */}
        <div className="flex-1 space-y-4 pb-10">
          <h4 className="text-lg md:text-xl font-semibold font-cardo mb-2">
            Kontakt
          </h4>

          <div className="flex items-start gap-3">
            <MapPin size={20} className="mt-1" />
            <p>
              ul. Małachowskiego 4/11,
              <br />
              05–270 Marki
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} />
            <p>+48 510 783 269</p>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={20} className="mt-1" />
            <div>
              <p className="font-semibold">Godziny otwarcia:</p>
              <p>Pon – Pt: 09:00 – 18:00</p>
              <p>Sobota: 10:00 – 17:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dolna linia i prawa zastrzeżone */}
      <div className="border-t border-[#D4AF37] pt-4 text-center text-xs">
        © 2025 Uzdrowisko. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
