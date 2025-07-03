import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./components/ScrollToTop";
// Komponent-wrapping do obsługi scrollowania do #haszów
function ScrollToHashOnNavigate() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const hash = location.hash.replace("#", "");
      const el = document.getElementById(hash);
      if (el) {
        // Scroll z lekkim opóźnieniem, żeby DOM zdążył się załadować
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHashOnNavigate />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onas" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
