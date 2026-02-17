import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHashOnNavigate from "./components/ScroolToHashOnNavigate";
import { routeImports } from './utils/routeImports';

const Home = lazy(routeImports.home);
const AboutUs = lazy(routeImports.aboutUs);
const PriceList = lazy(routeImports.priceList);
const NewsPage = lazy(routeImports.newsPage);
const ThatNewsPage = lazy(routeImports.newsDetails);
const ServicesPage = lazy(routeImports.services);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHashOnNavigate />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onas" element={<AboutUs />} />
          <Route path="/cennik" element={<PriceList />} />
          <Route path="/aktualnosci" element={<NewsPage />} />
          <Route path="/aktualnosci/:id" element={<ThatNewsPage />} />
          <Route path="/dlaczego" element={<ServicesPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
