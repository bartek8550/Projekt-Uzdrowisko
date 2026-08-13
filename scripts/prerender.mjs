import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { notFoundBuildPath, staticRoutes } from '../src/staticRoutes.js';

const projectRoot = process.cwd();
const distDir = join(projectRoot, 'dist');
const serverDir = join(projectRoot, 'dist-ssr');
const serverEntry = join(serverDir, 'entry-server.js');
const SEO_START = '<!--seo:start-->';
const SEO_END = '<!--seo:end-->';
const SSR_OUTLET = '<div id="root" data-ssr-outlet="true"></div>';

function escapeText(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttribute(value) {
  return escapeText(value)
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderSeo(seo) {
  const tags = [
    `<meta name="description" content="${escapeAttribute(seo.description)}" />`,
    `<meta name="robots" content="${escapeAttribute(seo.robots)}" />`,
    `<meta property="og:title" content="${escapeAttribute(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(seo.description)}" />`,
    `<meta property="og:image" content="${escapeAttribute(seo.image)}" />`,
    `<meta property="og:type" content="${escapeAttribute(seo.type)}" />`,
    ...(seo.canonical
      ? [
          `<meta property="og:url" content="${escapeAttribute(seo.canonical)}" />`,
          `<link rel="canonical" href="${escapeAttribute(seo.canonical)}" />`,
        ]
      : []),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttribute(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(seo.image)}" />`,
    `<title>${escapeText(seo.title)}</title>`,
  ];

  return `${SEO_START}\n    ${tags.join('\n    ')}\n    ${SEO_END}`;
}

function replaceSeo(template, seo) {
  const start = template.indexOf(SEO_START);
  const end = template.indexOf(SEO_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error('Nie znaleziono jednoznacznych znaczników SEO w index.html');
  }
  if (template.indexOf(SEO_START, start + 1) !== -1) {
    throw new Error('Znaleziono więcej niż jeden znacznik początku SEO');
  }

  return `${template.slice(0, start)}${renderSeo(seo)}${template.slice(end + SEO_END.length)}`;
}

function outputPath(route) {
  if (route === '/') return join(distDir, 'index.html');
  if (route === notFoundBuildPath) return join(distDir, '404.html');
  if (!/^\/[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(route)) {
    throw new Error(`Niebezpieczna lub nieobsługiwana trasa builda: ${route}`);
  }

  const destination = resolve(distDir, `${route.slice(1)}.html`);
  const relativeDestination = relative(distDir, destination);
  if (
    relativeDestination === '' ||
    relativeDestination === 'index.html' ||
    relativeDestination === '404.html' ||
    relativeDestination.startsWith(`..${sep}`) ||
    relativeDestination === '..'
  ) {
    throw new Error(`Trasa zapisuje poza bezpiecznym outputem: ${route}`);
  }
  return destination;
}

async function main() {
  const baseTemplate = await readFile(join(distDir, 'index.html'), 'utf8');
  if (baseTemplate.split(SSR_OUTLET).length - 1 !== 1) {
    throw new Error('Build klienta nie zawiera jednoznacznego znacznika data-ssr-outlet');
  }

  const { render } = await import(`${pathToFileURL(serverEntry).href}?v=${Date.now()}`);
  const routes = [...staticRoutes, notFoundBuildPath];
  const destinations = routes.map(outputPath);
  if (new Set(destinations).size !== destinations.length) {
    throw new Error('Co najmniej dwie trasy wskazują ten sam plik wyjściowy');
  }

  for (const [index, route] of routes.entries()) {
    const { appHtml, seo } = await render(route);
    if (!appHtml.trim()) throw new Error(`Pusty HTML aplikacji dla ${route}`);

    const html = replaceSeo(baseTemplate, seo).replace(
      SSR_OUTLET,
      `<div id="root" data-prerendered="true">${appHtml}</div>`,
    );
    const destination = destinations[index];
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html, 'utf8');
  }

  await copyFile(join(projectRoot, '.htaccess'), join(distDir, '.htaccess'));
}

try {
  await main();
} finally {
  await rm(serverDir, { recursive: true, force: true });
}
