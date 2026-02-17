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
              <img
                src="/logo-Uzdrowisko-Marki.webp"
                alt="Logo"
                className="h-22 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              />
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
                ul. Kolejowa 76,
                <br />
                05-220 Zielonka
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
                <p>Pon – Sob: 10:00 – 15:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61585589293300&locale=pl_PL"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-md px-1 py-1 text-[#D4AF37] transition-all duration-200 hover:text-[#F2D57A] hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D57A]/80"
                aria-label="Facebook Uzdrowisko"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm">Znajdź nas na Facebooku</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dolna część bez paddingu */}
      <div className="w-full">
        <div className="w-full h-px bg-[#D4AF37]" />
        <div className="text-center text-xs pt-4 pb-6">
          © 2026 Uzdrowisko. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </footer>
  );
}
