import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'O nas', href: '#onas' },
    { label: 'Aktualności', href: '#aktualnosci' },
    { label: 'Dlaczego my?', href: '#dlaczego' },
    { label: 'Oferta', href: '#oferta' },
    { label: 'Opinie', href: '#opinie' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 py-2 flex justify-between items-center text-gold">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logoLepsze.webp"
            alt="Logo Uzdrowiska"
            className="h-22 w-auto"
          />
        </div>

        {/* Hamburger Icon with animation */}
        {/* Hamburger Icon – animowana zamiana */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="relative w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'opacity-0 scale-75 rotate-45'
                  : 'opacity-100 scale-100'
              }`}
            >
              <Menu size={28} />
            </span>
            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 -rotate-45'
              }`}
            >
              <X size={28} />
            </span>
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 font-light text-xl">
          {links.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full after:mt-1"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Animated Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } bg-background px-6 sm:px-8 text-gold`}
      >
        <div className="py-4 space-y-3 transition-opacity duration-500 delay-100">
          {links.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block border-b border-gold pb-2 opacity-0 animate-fade-in animation-delay-${
                i * 75
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
