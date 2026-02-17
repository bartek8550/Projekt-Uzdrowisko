import { useState, useEffect } from "react";
import { Menu, X, Facebook } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { label: "O nas", hash: "onas" },
    { label: "Aktualności", hash: "aktualnosci" },
    { label: "Dlaczego my?", hash: "whyus" },
    { label: "Oferta", hash: "oferta" },
    { label: "Cennik", path: "/cennik" },
    { label: "Kontakt", hash: "kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (hash) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToHash", hash);
      navigate("/");
    } else {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
        scrolled || isOpen ? "bg-background" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-2 flex justify-between items-center text-gold">
        {/* Logo z obsługą scroll-to-top */}
        <div className="flex items-center">
          <button
            onClick={() => {
              setIsOpen(false);
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <img
              src="/logo-Uzdrowisko-Marki.webp"
              alt="Logo Uzdrowiska"
              className="h-22 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
            />
          </button>
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="relative w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-0 scale-75 rotate-45"
                  : "opacity-100 scale-100"
              }`}
            >
              <Menu size={28} />
            </span>
            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-45"
              }`}
            >
              <X size={28} />
            </span>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-5">
          <ul className="flex items-center gap-6 font-light text-xl">
            {links.map((item) => (
              <li key={item.label}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="relative inline-block cursor-pointer after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 after:origin-center after:transform after:-translate-x-1/2 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleLinkClick(item.hash)}
                    className="relative inline-block cursor-pointer after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 after:origin-center after:transform after:-translate-x-1/2 hover:after:w-full"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="h-5 w-px bg-gold/40" aria-hidden="true" />

          <a
            href="https://www.facebook.com/profile.php?id=61585589293300&locale=pl_PL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Uzdrowisko"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/60 text-gold/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F2D57A] hover:bg-[#D4AF37]/10 hover:text-[#F2D57A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D57A]/80"
          >
            <Facebook size={13} />
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } bg-background px-6 sm:px-8 text-gold`}
      >
        <div className="py-4 space-y-3 transition-opacity duration-500 delay-100">
          {links.map((item, i) =>
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block border-b border-gold pb-2 text-left w-full cursor-pointer opacity-0 animate-fade-in animation-delay-${
                  i * 75
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.hash)}
                className={`block border-b border-gold pb-2 text-left w-full cursor-pointer opacity-0 animate-fade-in animation-delay-${
                  i * 75
                }`}
              >
                {item.label}
              </button>
            )
          )}

          <div className="flex justify-end pt-2">
            <a
              href="https://www.facebook.com/profile.php?id=61585589293300&locale=pl_PL"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-gold/90 transition-all duration-200 hover:border-[#F2D57A] hover:bg-[#D4AF37]/10 hover:text-[#F2D57A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D57A]/80"
              aria-label="Facebook Uzdrowisko"
            >
              <Facebook size={14} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
