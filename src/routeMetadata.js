export const pageMetadata = {
  '/': {
    title: 'Fizjoterapia i rehabilitacja w Zielonce | Uzdrowisko',
    description:
      'Uzdrowisko to gabinet fizjoterapii i terapii manualnej Hanny Nowotczyńskiej przy ul. Kolejowej 76 w Zielonce. Poznaj ofertę i umów wizytę.',
    image: '/og-uzdrowisko.webp',
    type: 'website',
  },
  '/onas': {
    title: 'Hanna Nowotczyńska – fizjoterapia | Uzdrowisko',
    description:
      'Poznaj Hannę Nowotczyńską, założycielkę gabinetu Uzdrowisko w Zielonce, jej podejście do fizjoterapii i terapii manualnej oraz prezentowane certyfikaty.',
    image: '/og-uzdrowisko.webp',
    type: 'profile',
  },
  '/cennik': {
    title: 'Cennik fizjoterapii w Zielonce | Uzdrowisko',
    description:
      'Sprawdź cennik wizyt fizjoterapeutycznych, terapii manualnej, drenażu limfatycznego, masażu leczniczego oraz wizyt domowych w Markach.',
    image: '/og-uzdrowisko.webp',
    type: 'website',
  },
  '/dlaczego': {
    title: 'Usługi fizjoterapii w Zielonce | Uzdrowisko',
    description:
      'Zobacz usługi dostępne w gabinecie Uzdrowisko w Zielonce, m.in. masaż leczniczy, drenaż limfatyczny oraz wybrane formy rehabilitacji.',
    image: '/og-uzdrowisko.webp',
    type: 'website',
  },
  '/aktualnosci': {
    title: 'Aktualności gabinetu w Zielonce | Uzdrowisko',
    description:
      'Informacje z gabinetu Uzdrowisko: nowa lokalizacja w Zielonce, szkolenia Hanny Nowotczyńskiej i aktualności dotyczące oferty.',
    image: '/og-uzdrowisko.webp',
    type: 'website',
  },
};

export function metadataForNews(news) {
  const metadataById = {
    'nowa-lokalizacja-zielonka': {
      title: 'Nowa lokalizacja Uzdrowiska w Zielonce | Aktualności',
      description:
        'Od 10 lutego 2026 roku gabinet Uzdrowisko mieści się przy ul. Kolejowej 76 w Zielonce. Poznaj adres i informacje o nowej lokalizacji.',
    },
    'szkolenie-toony-therapy': {
      title: 'Szkolenie ToonyTherapy Hanny Nowotczyńskiej | Uzdrowisko',
      description:
        'Relacja ze szkolenia w Akademii ToonyTherapy w Gdańsku: powtórka modułów, doskonalenie technik i przygotowanie do egzaminu ToonyTherapy Basic.',
    },
    'nowa-usluga-tt': {
      title: 'Chiropraktyka i techniki TT | Uzdrowisko',
      description:
        'Informacja o ukończonym szkoleniu Hanny Nowotczyńskiej w Chiropractic School of Poland oraz wprowadzeniu technik TT i terapii manualnej do oferty.',
    },
  };

  return {
    ...metadataById[news.id],
    image: '/og-uzdrowisko.webp',
    type: 'article',
  };
}
