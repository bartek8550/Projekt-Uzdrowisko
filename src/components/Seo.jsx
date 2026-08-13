import { useContext, useEffect } from 'react';
import {
  DEFAULT_IMAGE,
  SeoCollectorContext,
  SITE_URL,
} from '../seoConfig.js';
import { createPageSchema, serializeJsonLd } from '../seoSchema.js';

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
  article,
}) {
  const normalized = {
    title,
    description,
    canonical: path === null ? null : `${SITE_URL}${path}`,
    image: toAbsoluteUrl(image),
    type,
    robots,
  };

  return {
    ...normalized,
    schema: path === null
      ? null
      : createPageSchema({ path, title, description, image: normalized.image, article }),
  };
}

export default function Seo(props) {
  const collectSeo = useContext(SeoCollectorContext);
  const seo = normalizeSeo(props);
  const serializedSchema = seo.schema ? serializeJsonLd(seo.schema) : '';

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
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', 'Uzdrowisko – gabinet fizjoterapii w Zielonce');
    setMeta('property', 'og:locale', 'pl_PL');
    setMeta('property', 'og:site_name', 'Uzdrowisko');

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);
    setMeta('name', 'twitter:image:alt', 'Uzdrowisko – gabinet fizjoterapii w Zielonce');

    const schemaId = 'structured-data';
    const existingSchema = document.getElementById(schemaId);
    if (!serializedSchema) {
      existingSchema?.remove();
    } else {
      const script = existingSchema || document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.textContent = serializedSchema;
      if (!existingSchema) document.head.appendChild(script);
    }
  }, [seo.title, seo.description, seo.canonical, seo.image, seo.type, seo.robots, serializedSchema]);

  return null;
}
