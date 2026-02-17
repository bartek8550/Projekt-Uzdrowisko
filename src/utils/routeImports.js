export const routeImports = {
  home: () => import('../pages/Home.jsx'),
  aboutUs: () => import('../pages/AboutUs.jsx'),
  priceList: () => import('../pages/PriceList.jsx'),
  newsPage: () => import('../pages/NewsPage.jsx'),
  newsDetails: () => import('../pages/ThatNewsPage.jsx'),
  services: () => import('../pages/ServicesPage.jsx'),
};

export function prefetchRoute(path) {
  if (!path) return;

  if (path.startsWith('/aktualnosci/')) {
    routeImports.newsDetails();
    return;
  }

  if (path === '/' || path.startsWith('/#')) {
    routeImports.home();
    return;
  }

  if (path === '/onas') {
    routeImports.aboutUs();
    return;
  }

  if (path === '/cennik') {
    routeImports.priceList();
    return;
  }

  if (path === '/aktualnosci') {
    routeImports.newsPage();
    return;
  }

  if (path === '/dlaczego') {
    routeImports.services();
  }
}
