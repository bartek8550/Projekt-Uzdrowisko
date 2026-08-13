import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import test from 'node:test';
import { staticRoutes } from '../src/staticRoutes.js';

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

test('każda trasa ma pełny, kanoniczny HTML', async () => {
  for (const route of staticRoutes) {
    const html = await readFile(outputPath(route), 'utf8');
    const canonical = `${siteUrl}${route}`;

    assert.match(html, /<div id="root" data-prerendered="true">[\s\S]+<\/div>/);
    assert.doesNotMatch(html, /data-ssr-outlet/);
    assert.match(html, /<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/);
    assert.equal(count(html, '<title>'), 1, `${route}: title`);
    assert.equal(count(html, 'name="description"'), 1, `${route}: description`);
    assert.equal(count(html, 'rel="canonical"'), 1, `${route}: canonical`);
    assert.equal(count(html, 'type="application/ld+json"'), 1, `${route}: JSON-LD`);
    assert.ok(html.includes(`href="${canonical}"`), `${route}: błędny canonical`);
    assert.ok(html.includes(`content="${canonical}"`), `${route}: błędny og:url`);
    assert.ok(html.length > 10_000, `${route}: HTML jest podejrzanie mały`);
  }
});

test('404 jest noindex i nie ma canonicala', async () => {
  const html = await readFile(join(distDir, '404.html'), 'utf8');
  assert.match(html, /Błąd 404/);
  assert.match(html, /content="noindex, follow"/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.doesNotMatch(html, /property="og:url"/);
});

test('sitemap i lista tras są zgodne', async () => {
  const sitemap = await readFile(join(distDir, 'sitemap.xml'), 'utf8');
  const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/uzdrowisko-marki\.pl([^<]*)<\/loc>/g)]
    .map((match) => match[1] || '/')
    .sort();

  assert.deepEqual(sitemapRoutes, [...staticRoutes].sort());
});

test('tymczasowy bundle serwerowy został posprzątany', async () => {
  await assert.rejects(access(join(projectRoot, 'dist-ssr')));
});

test('hosting nie zawiera fallbacku SPA i ma konfigurację 404', async () => {
  const redirects = await readFile(join(distDir, '_redirects'), 'utf8');
  const htaccess = await readFile(join(distDir, '.htaccess'), 'utf8');

  assert.doesNotMatch(redirects, /\/\*\s+\/index\.html\s+200/);
  assert.match(redirects, /https:\/\/www\.uzdrowisko-marki\.pl\/\*/);
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(htaccess, /Options -MultiViews/);
  assert.match(htaccess, /RewriteRule \^404/);

  const netlify = await readFile(join(projectRoot, 'netlify.toml'), 'utf8');
  assert.match(netlify, /pretty_urls\s*=\s*false/);
});
