import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // ← DODAJ TO!

export default function ScrollToHashOnNavigate() {
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const el = document.getElementById(hash);

      if (el) {
        const offset = 190;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    // Scroll na początku jeśli jesteśmy na / z hashem
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => handleHashChange(), 100);
    }

    // Obsługa kolejnych zmian #haszów
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [location.pathname]);

  return null;
}
