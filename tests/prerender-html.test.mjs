import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { staticRoutes } from '../src/staticRoutes.js';
import { newsList } from '../src/components/news/newsData.js';
import { metadataForNews, pageMetadata } from '../src/routeMetadata.js';
import { serializeJsonLd } from '../src/seoSchema.js';
import { BOOKSY_URL, MAP_URL, PHONE_HREF } from '../src/businessInfo.js';

const projectRoot = process.cwd();
const distDir = join(projectRoot, 'dist');
const siteUrl = 'https://uzdrowisko-marki.pl';

function outputPath(route) {
  return route === '/'
    ? join(distDir, 'index.html')
    : join(distDir, `${route.slice(1)}.html`);
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function metadataForRoute(route) {
  if (pageMetadata[route]) return pageMetadata[route];
  const news = newsList.find(({ id }) => route === `/aktualnosci/${id}`);
  return news ? metadataForNews(news) : null;
}

function jsonLdFrom(html) {
  const match = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'brak route-specific JSON-LD');
  return JSON.parse(match[1]);
}

function textContent(htmlFragment) {
  return htmlFragment
    .replace(/<[^>]+>/g, ' ')
    .replaceAll('&amp;', '&')
    .replace(/\s+/g, ' ')
    .trim();
}

test('każda trasa ma pełny, kanoniczny HTML', async () => {
  for (const route of staticRoutes) {
    const html = await readFile(outputPath(route), 'utf8');
    const canonical = `${siteUrl}${route}`;
    const metadata = metadataForRoute(route);

    assert.match(html, /<div id="root" data-prerendered="true">[\s\S]+<\/div>/);
    assert.doesNotMatch(html, /data-ssr-outlet/);
    assert.equal(count(html, '<main id="main-content"'), 1, `${route}: main`);
    assert.equal(count(html, 'href="#main-content"'), 1, `${route}: skip link`);
    const h1Matches = [...html.matchAll(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/g)];
    assert.equal(h1Matches.length, 1, `${route}: dokładnie jeden H1`);
    const news = newsList.find(({ id }) => route === `/aktualnosci/${id}`);
    const expectedH1 = news?.title || {
      '/': 'Uzdrowisko fizjoterapia w Zielonce',
      '/onas': 'O nas',
      '/cennik': 'Cennik',
      '/dlaczego': 'Usługi',
      '/aktualnosci': 'Aktualności',
    }[route];
    assert.equal(textContent(h1Matches[0][1]), expectedH1, `${route}: treść H1`);
    assert.equal(count(html, '<title>'), 1, `${route}: title`);
    assert.equal(count(html, 'name="description"'), 1, `${route}: description`);
    assert.equal(count(html, 'name="robots"'), 1, `${route}: robots`);
    assert.ok(html.includes('content="index, follow"'), `${route}: robots index, follow`);
    assert.equal(count(html, 'rel="canonical"'), 1, `${route}: canonical`);
    assert.equal(count(html, 'type="application/ld+json"'), 1, `${route}: JSON-LD`);
    assert.ok(html.includes(`<title>${metadata.title}</title>`), `${route}: treść title`);
    assert.ok(html.includes(`content="${metadata.description}"`), `${route}: treść description`);
    assert.ok(html.includes(`content="${siteUrl}${metadata.image}"`), `${route}: og:image`);
    assert.ok(html.includes(`href="${canonical}"`), `${route}: błędny canonical`);
    assert.ok(html.includes(`content="${canonical}"`), `${route}: błędny og:url`);
    assert.ok(html.length > 10_000, `${route}: HTML jest podejrzanie mały`);

    const schema = jsonLdFrom(html);
    const graph = schema['@graph'];
    assert.equal(
      graph.some((node) => node['@type'] === 'WebSite'),
      route === '/',
      `${route}: WebSite tylko na stronie głównej`,
    );
    assert.ok(graph.some((node) => node['@type'] === 'MedicalBusiness'), `${route}: MedicalBusiness`);
    assert.ok(graph.some((node) => node['@type'] === 'Person'), `${route}: Person`);
    assert.ok(graph.some((node) => ['WebPage', 'ProfilePage'].includes(node['@type'])), `${route}: WebPage`);
    assert.equal(graph.some((node) => node['@type'] === 'Physiotherapy'), false);
    const ids = graph.map((node) => node['@id']).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, `${route}: powtórzone @id`);
    const webPage = graph.find((node) => ['WebPage', 'ProfilePage'].includes(node['@type']));
    assert.equal(webPage.url, canonical, `${route}: WebPage.url`);
    if (route === '/onas') {
      assert.deepEqual(
        webPage.mainEntity,
        { '@id': 'https://uzdrowisko-marki.pl/#hanna-nowotczynska' },
        `${route}: ProfilePage.mainEntity`,
      );
    }

    const article = graph.find((node) => node['@type'] === 'Article');
    if (route.startsWith('/aktualnosci/')) {
      assert.ok(article, `${route}: Article`);
      assert.equal('datePublished' in article, false, `${route}: niepotwierdzona data`);
      assert.equal('author' in article, false, `${route}: niepotwierdzony autor`);
      assert.equal(count(html, '<article '), 1, `${route}: article`);
      assert.match(html, /<time dateTime="\d{4}-\d{2}-\d{2}">/, `${route}: time`);
    } else {
      assert.equal(article, undefined, `${route}: zbędny Article`);
      if (route === '/aktualnosci') {
        assert.equal(count(html, '<article '), newsList.length, `${route}: lista artykułów`);
      }
    }
  }
});

test('metadata są kompletne, unikalne i mieszczą się w guardrailach', async () => {
  const metadata = staticRoutes.map((route) => [route, metadataForRoute(route)]);
  assert.ok(metadata.every(([, value]) => value));

  const titles = new Set();
  const descriptions = new Set();
  for (const [route, value] of metadata) {
    assert.ok(value.title.length >= 30 && value.title.length <= 60, `${route}: długość title`);
    assert.ok(value.description.length >= 110 && value.description.length <= 160, `${route}: długość description`);
    titles.add(value.title.toLocaleLowerCase('pl'));
    descriptions.add(value.description.toLocaleLowerCase('pl'));

    const imagePath = new URL(value.image, siteUrl).pathname.slice(1);
    await access(join(projectRoot, 'public', imagePath));
  }
  assert.equal(titles.size, metadata.length);
  assert.equal(descriptions.size, metadata.length);
});

test('homepage ma bezpośrednie akcje kontaktu i rezerwacji', async () => {
  const html = await readFile(outputPath('/'), 'utf8');
  assert.ok(html.includes(`href="${BOOKSY_URL}"`), 'brak potwierdzonego Booksy');
  assert.ok(html.includes(`href="${PHONE_HREF}"`), 'brak tel:');
  assert.ok(html.includes(`href="${MAP_URL.replaceAll('&', '&amp;')}"`), 'brak linku do mapy');
});

test('404 jest noindex i nie ma canonicala', async () => {
  const html = await readFile(join(distDir, '404.html'), 'utf8');
  assert.match(html, /Błąd 404/);
  assert.match(html, /content="noindex, follow"/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.doesNotMatch(html, /property="og:url"/);
  assert.doesNotMatch(html, /type="application\/ld\+json"/);
});

test('serializer JSON-LD nie pozwala zamknąć znacznika script', () => {
  const serialized = serializeJsonLd({ value: '</script>&\u2028\u2029' });
  assert.doesNotMatch(serialized, /<\/script>/i);
  assert.match(serialized, /\\u003c\/script\\u003e\\u0026\\u2028\\u2029/);
  assert.deepEqual(JSON.parse(serialized), { value: '</script>&\u2028\u2029' });
});

test('sitemap i lista tras są zgodne', async () => {
  const sitemap = await readFile(join(distDir, 'sitemap.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const sitemapRoutes = sitemapUrls
    .map((value) => {
      const url = new URL(value);
      assert.equal(url.protocol, 'https:', `${value}: protokół`);
      assert.equal(url.hostname, 'uzdrowisko-marki.pl', `${value}: host`);
      assert.equal(url.search, '', `${value}: query string`);
      assert.equal(url.hash, '', `${value}: fragment`);
      assert.doesNotMatch(url.pathname, /\.html$/i, `${value}: .html`);
      if (url.pathname !== '/') assert.doesNotMatch(url.pathname, /\/$/, `${value}: trailing slash`);
      return url.pathname;
    })
    .sort();

  assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'powtórzone URL-e sitemap');
  assert.deepEqual(sitemapRoutes, [...staticRoutes].sort());
});

test('robots utrzymuje dostęp do Search i wskazuje kanoniczną sitemapę', async () => {
  const robots = await readFile(join(distDir, 'robots.txt'), 'utf8');
  assert.equal(robots.charCodeAt(0) === 0xfeff, false, 'robots.txt ma BOM');
  assert.match(robots, /^User-agent: \*\r?\nAllow: \/$/m);
  assert.equal(
    count(robots, 'Sitemap: https://uzdrowisko-marki.pl/sitemap.xml'),
    1,
    'robots.txt: dokładnie jedna kanoniczna sitemap',
  );
  assert.doesNotMatch(robots, /OAI-SearchBot[\s\S]*Disallow:\s*\//i);
  assert.doesNotMatch(robots, /Bingbot[\s\S]*Disallow:\s*\//i);
});

test('tymczasowy bundle serwerowy został posprzątany', async () => {
  await assert.rejects(access(join(projectRoot, 'dist-ssr')));
});

test('hosting nie zawiera fallbacku SPA i ma konfigurację 404', async () => {
  const redirects = await readFile(join(distDir, '_redirects'), 'utf8');
  const htaccess = await readFile(join(distDir, '.htaccess'), 'utf8');

  assert.doesNotMatch(redirects, /\/\*\s+\/index\.html\s+200/);
  assert.match(redirects, /https:\/\/www\.uzdrowisko-marki\.pl\/\*/);
  assert.match(redirects, /^\/index\.html\s+\/\s+301!$/m);
  for (const route of staticRoutes.filter((value) => value !== '/')) {
    const escapedRoute = escapeRegExp(route);
    assert.match(
      redirects,
      new RegExp(`^${escapedRoute}\\.html\\s+${escapedRoute}\\s+301!$`, 'm'),
      `${route}: brak aliasu .html -> canonical`,
    );
  }
  assert.match(redirects, /^\/404\.html\s+\/404\.html\s+404!$/m);
  assert.doesNotMatch(redirects, /^\/[^\s]*\/\s+\/[^\s]*\s+301!?$/m);
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(htaccess, /Options -MultiViews/);
  assert.match(htaccess, /RewriteRule \^404/);
  assert.match(htaccess, /RewriteCond %\{DOCUMENT_ROOT\}\/\$1\.html -f/);

  const netlify = await readFile(join(projectRoot, 'netlify.toml'), 'utf8');
  assert.match(netlify, /pretty_urls\s*=\s*false/);
});

test('hosting ma spójną politykę cache i bazowe nagłówki bezpieczeństwa', async () => {
  const headers = await readFile(join(distDir, '_headers'), 'utf8');
  const htaccess = await readFile(join(distDir, '.htaccess'), 'utf8');
  const index = await readFile(join(distDir, 'index.html'), 'utf8');

  for (const header of [
    'Content-Security-Policy-Report-Only',
    'Permissions-Policy',
    'Referrer-Policy',
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
  ]) {
    assert.ok(headers.includes(`${header}:`), `Netlify: brak ${header}`);
    assert.ok(htaccess.includes(header), `Apache: brak ${header}`);
  }

  assert.match(headers, /\/assets\/\*[\s\S]*max-age=31536000, immutable/);
  assert.match(headers, /\/sw\.js[\s\S]*Cache-Control: no-store/);
  assert.match(headers, /Netlify-CDN-Cache-Control: no-store/);
  assert.match(headers, /manifest\.webmanifest[\s\S]*application\/manifest\+json/);
  assert.doesNotMatch(index, /\sonload=/i);
  assert.match(index, /id="google-fonts"[\s\S]*media="print"/i);
});
