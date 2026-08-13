import { useContext, useEffect } from 'react';
import {
  DEFAULT_IMAGE,
  SeoCollectorContext,
  SITE_URL,
} from '../seoConfig.js';

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

function removeMeta(selector, key) {
  document.head.querySelector(`meta[${selector}="${key}"]`)?.remove();
}

function toAbsoluteUrl(url) {
  if (!url) return DEFAULT_IMAGE;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

function setCanonical(url) {
  const existing = document.head.querySelector('link[rel="canonical"]');

  if (!url) {
    existing?.remove();
    return;
  }

  const link = existing || document.createElement('link');
  if (!existing) {
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function normalizeSeo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  robots = 'index, follow',
}) {
  return {
    title,
    description,
    canonical: path === null ? null : `${SITE_URL}${path}`,
    image: toAbsoluteUrl(image),
    type,
    robots,
  };
}

export default function Seo(props) {
  const collectSeo = useContext(SeoCollectorContext);
  const seo = normalizeSeo(props);

  if (collectSeo) collectSeo(seo);

  useEffect(() => {
    document.title = seo.title;
    setCanonical(seo.canonical);

    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.robots);

    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:type', seo.type);
    if (seo.canonical) {
      setMeta('property', 'og:url', seo.canonical);
    } else {
      removeMeta('property', 'og:url');
    }
    setMeta('property', 'og:image', seo.image);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);
  }, [seo.title, seo.description, seo.canonical, seo.image, seo.type, seo.robots]);

  return null;
}
