import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#4E2A23] text-[#D4AF37] text-sm">
      {/* Treść główna z paddingiem */}
      <div className="pt-12 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 max-w-5xl mx-auto pb-8">
          {/* Lewa kolumna */}
          <div className="flex-1 text-center md:text-right max-w-xs">
            <div className="flex items-center justify-center md:justify-end gap-4 mb-4">
              <h3 className="text-xl md:text-2xl font-semibold font-cardo">
                Gabinet <br /> Uzdrowisko
              </h3>
              <img src="/logoLepsze.webp" alt="Logo" className="h-16 w-auto" />
            </div>
            <p className="leading-relaxed">
              Profesjonalna fizjoterapia i masaż – skuteczne podejście,
              prawdziwa troska o pacjenta oraz indywidualnie dopasowany plan
              terapii, który przynosi realne efekty.
            </p>
          </div>

          {/* Separator (pionowy tylko na desktopie) */}
          <div className="hidden md:block h-auto self-stretch border-l border-[#D4AF37]" />

          {/* Prawa kolumna */}
          <div className="flex-1 max-w-xs space-y-4 text-left">
            <h4 className="text-lg md:text-xl font-semibold font-cardo mb-2 text-center md:text-left">
              Dane kontaktowe
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
                <p>Pon – Pt: 08:30 – 15:00 i 17:00 - 20:00</p>
                <p>Sobota: 10:00 – 15:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dolna część bez paddingu */}
      <div className="w-full">
        <div className="w-full h-px bg-[#D4AF37]" />
        <div className="text-center text-xs pt-4 pb-6">
          © 2025 Uzdrowisko. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
