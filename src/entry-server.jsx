import { StrictMode } from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App.jsx';
import { SeoCollectorContext } from './seoConfig.js';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import PriceList from './pages/PriceList.jsx';
import NewsPage from './pages/NewsPage.jsx';
import ThatNewsPage from './pages/ThatNewsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';

const serverRouteComponents = {
  Home,
  AboutUs,
  PriceList,
  NewsPage,
  ThatNewsPage,
  ServicesPage,
};

export function render(url) {
  return new Promise((resolve, reject) => {
    let appHtml = '';
    let seo;
    const errors = [];
    const output = new PassThrough();

    const timeout = setTimeout(() => {
      abort();
      reject(new Error(`Prerender przekroczył limit czasu dla ${url}`));
    }, 15_000);

    output.setEncoding('utf8');
    output.on('data', (chunk) => {
      appHtml += chunk;
    });
    output.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    output.on('end', () => {
      clearTimeout(timeout);
      if (errors.length > 0) {
        const details = errors.map((error) => error?.message || String(error)).join('; ');
        reject(new Error(`Błąd prerenderingu ${url}: ${details}`));
        return;
      }
      if (!seo) {
        reject(new Error(`Brak metadanych SEO dla ${url}`));
        return;
      }
      resolve({ appHtml, seo });
    });

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <SeoCollectorContext.Provider value={(value) => { seo = value; }}>
          <StaticRouter location={url}>
            <AppRoutes routeComponents={serverRouteComponents} />
          </StaticRouter>
        </SeoCollectorContext.Provider>
      </StrictMode>,
      {
        onAllReady() {
          pipe(output);
        },
        onShellError(error) {
          clearTimeout(timeout);
          reject(error);
        },
        onError(error) {
          errors.push(error);
        },
      },
    );
  });
}
