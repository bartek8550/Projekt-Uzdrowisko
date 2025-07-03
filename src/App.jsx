import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PriceList from "./pages/PriceList";
import NewsPage from "./pages/NewsPage";
import ThatNewsPage from "./pages/ThatNewsPage";
import ServicesPage from "./pages/ServicesPage";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHashOnNavigate from "./components/ScroolToHashOnNavigate";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHashOnNavigate />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onas" element={<AboutUs />} />
        <Route path="/cennik" element={<PriceList />} />
        <Route path="/aktualnosci" element={<NewsPage />} />
        <Route path="/aktualnosci/:id" element={<ThatNewsPage />} />
        <Route path="/dlaczego" element={<ServicesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
