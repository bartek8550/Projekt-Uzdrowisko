import { DEFAULT_IMAGE, SITE_URL } from './seoConfig.js';

const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#hanna-nowotczynska`;
const LOGO_URL = `${SITE_URL}/optimized/logo-512.webp`;
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61585589293300&locale=pl_PL';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Kolejowa+76%2C+05-220+Zielonka';

const pageLabels = {
  '/': 'Strona główna',
  '/onas': 'O nas',
  '/cennik': 'Cennik',
  '/dlaczego': 'Usługi',
  '/aktualnosci': 'Aktualności',
};

function absoluteUrl(path) {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function baseEntities() {
  return [
    {
      '@type': 'MedicalBusiness',
      '@id': BUSINESS_ID,
      name: 'Uzdrowisko',
      alternateName: 'Uzdrowisko Marki',
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      image: DEFAULT_IMAGE,
      telephone: '+48 510 783 269',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kolejowa 76',
        postalCode: '05-220',
        addressLocality: 'Zielonka',
        addressCountry: 'PL',
      },
      hasMap: MAP_URL,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '15:00',
      },
      founder: { '@id': PERSON_ID },
      employee: { '@id': PERSON_ID },
      sameAs: [FACEBOOK_URL],
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Hanna Nowotczyńska',
      url: `${SITE_URL}/onas`,
      image: `${SITE_URL}/Hanna.webp`,
      jobTitle: 'Fizjoterapeutka',
      worksFor: { '@id': BUSINESS_ID },
    },
  ];
}

function breadcrumbs(path, title) {
  if (path === '/') return null;

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Strona główna',
      item: `${SITE_URL}/`,
    },
  ];

  if (path.startsWith('/aktualnosci/')) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Aktualności',
      item: `${SITE_URL}/aktualnosci`,
    });
  }

  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: pageLabels[path] || title,
    item: absoluteUrl(path),
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items,
  };
}

export function createPageSchema({ path, title, description, image, article }) {
  const pageUrl = absoluteUrl(path);
  const pageId = `${pageUrl}#webpage`;
  const imageUrl = absoluteUrl(image || DEFAULT_IMAGE);
  const breadcrumb = breadcrumbs(path, article?.headline || title);
  const webPage = {
    '@type': path === '/onas' ? 'ProfilePage' : 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: title,
    description,
    inLanguage: 'pl-PL',
    isPartOf: { '@id': WEBSITE_ID },
    about: path === '/onas' ? { '@id': PERSON_ID } : { '@id': BUSINESS_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
    ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
    ...(article ? { mainEntity: { '@id': `${pageUrl}#article` } } : {}),
  };

  const articleEntity = article
    ? {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: article.headline,
        description,
        image: [imageUrl],
        mainEntityOfPage: { '@id': pageId },
        publisher: { '@id': BUSINESS_ID },
        inLanguage: 'pl-PL',
      }
    : null;

  const websiteEntity = path === '/'
    ? {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'Uzdrowisko',
        alternateName: 'Uzdrowisko Marki',
        inLanguage: 'pl-PL',
        publisher: { '@id': BUSINESS_ID },
      }
    : null;
  const graph = [
    ...(websiteEntity ? [websiteEntity] : []),
    ...baseEntities(),
    webPage,
    ...(articleEntity ? [articleEntity] : []),
    ...(breadcrumb ? [breadcrumb] : []),
  ];
  const ids = graph.map((entity) => entity['@id']).filter(Boolean);
  if (new Set(ids).size !== ids.length) {
    throw new Error(`Powtórzony identyfikator @id w schema dla ${path}`);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => {
    const escapes = {
      '<': '\\u003c',
      '>': '\\u003e',
      '&': '\\u0026',
      '\u2028': '\\u2028',
      '\u2029': '\\u2029',
    };
    return escapes[character];
  });
}
