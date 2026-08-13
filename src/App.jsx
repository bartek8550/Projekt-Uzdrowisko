import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHashOnNavigate from "./components/ScroolToHashOnNavigate";
import { routeImports } from './utils/routeImports';
import NotFound from './pages/NotFound';

const clientRouteComponents = {
  Home: lazy(routeImports.home),
  AboutUs: lazy(routeImports.aboutUs),
  PriceList: lazy(routeImports.priceList),
  NewsPage: lazy(routeImports.newsPage),
  ThatNewsPage: lazy(routeImports.newsDetails),
  ServicesPage: lazy(routeImports.services),
};

export function AppRoutes({ routeComponents = clientRouteComponents }) {
  const {
    Home,
    AboutUs,
    PriceList,
    NewsPage,
    ThatNewsPage,
    ServicesPage,
  } = routeComponents;

  return (
    <>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
