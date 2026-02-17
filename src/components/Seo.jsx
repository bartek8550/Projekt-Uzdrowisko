import { useEffect } from 'react';

const SITE_URL = 'https://uzdrowisko-marki.pl';
const DEFAULT_IMAGE = `${SITE_URL}/logo-Uzdrowisko-Marki.webp`;

function setMeta(selector, key, value) {
  if (!value) return;
  let tag = document.head.querySelector(`meta[${selector}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(selector, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

function toAbsoluteUrl(url) {
  if (!url) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  robots = 'index, follow',
}) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    const ogImage = toAbsoluteUrl(image);

    document.title = title;
    setCanonical(canonical);

    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', ogImage);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
  }, [title, description, path, image, type, robots]);

  return null;
}
