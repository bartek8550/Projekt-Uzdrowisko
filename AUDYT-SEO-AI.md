# Kompletny audyt SEO, Local SEO, AI Search i widoczności

- **Projekt:** Uzdrowisko – Gabinet Fizjoterapii i Terapii Manualnej Hanna Nowotczyńska
- **Domena:** https://uzdrowisko-marki.pl
- **Data audytu:** 13 sierpnia 2026
- **Zakres:** Google Search, Local/Maps, AI Overviews/AI Mode, ChatGPT Search, Bing/Copilot, SEO techniczne i on-page, encje, E‑E‑A‑T, dane strukturalne, treść, wydajność, mobile i podstawowa dostępność
- **Tryb:** audyt tylko do odczytu; kod aplikacji nie został zmieniony

---

# Executive Summary

Witryna ma już wartościowe fundamenty: działające HTTPS, poprawną publiczną sitemapę z ośmioma właściwymi URL-ami, dostęp dla Googlebota, Bingbota i OAI-SearchBot, aktualny adres w Zielonce, spójny telefon i godziny na stronie oraz publicznie widoczny w chwili testu Google Business Profile. Marka jest rozpoznawana przez Google bardzo dobrze: potwierdzone frazy brandowe mają średnią pozycję 1,29 i CTR 23,91%. Widoczność rośnie — w ostatnich 90 dniach eksportu GSC liczba wyświetleń wzrosła o 41,8% względem poprzednich 90 dni.

Największym niewykorzystanym potencjałem jest ruch lokalny non-brand. W widocznej części danych GSC frazy lokalne odpowiadają za 90,45% wyświetleń, lecz lokalne frazy bez marki mają zaledwie 0,21% CTR. Najmocniejsza anomalia to `rehabilitacja zielonka`: 765 wyświetleń, średnia pozycja 2,16, tylko jedno kliknięcie i CTR 0,13%. Nie należy jednak zakładać, że wystarczy zmiana title — najpierw trzeba sprawdzić Local Pack, rzeczywisty landing page oraz eksport `query × page`.

Najważniejsze ograniczenia techniczne są aktywne na produkcji:

1. `https://www.uzdrowisko-marki.pl/` zwraca 200 zamiast 301 do wersji bez `www`; GSC pokazuje ruch i URL-e na obu hostach.
2. Dowolny nieistniejący URL zwraca 200 i po JavaScript pustą stronę — to soft 404.
3. Każda trasa dostaje identyczny początkowy HTML z samym `<div id="root"></div>`; treść i metadata tras pojawiają się dopiero po JavaScript.
4. Obecny JSON-LD używa `"@type": "Physiotherapy"`, lecz `Physiotherapy` jest w Schema.org wartością wyliczeniową `MedicalSpecialty`, a nie typem firmy.
5. Preloader ukrywa treść do czasu pobrania wielu obrazów, w tym dwóch nieistniejących zasobów; laboratoryjne LCP na mobile wyniosło 4,8 s.

W GSC zindeksowanych jest 7 z 13 znanych URL-i; 3 adresy są „zeskanowane, ale jeszcze niezindeksowane”. To nie jest awaria całej witryny, lecz w małym serwisie utrata indeksacji kilku stron ma proporcjonalnie duże znaczenie.

Obecna technologia **nie wymaga migracji do Next.js ani innego frameworka**. React/Vite może pozostać. Najlepszą proporcjonalną zmianą techniczną jest build-time prerendering/SSG wszystkich znanych tras wraz z poprawnymi statusami 404. SSR byłby uzasadniony dopiero przy dużej ilości dynamicznej lub często zmieniającej się treści.

Problem leży obecnie w czterech warstwach, w tej kolejności:

1. wykorzystanie lokalnej intencji i dopasowanie landingów/GBP,
2. kanonikalizacja, statusy i zależność od renderowania JavaScript,
3. wiarygodność treści zdrowotnych i jednoznaczne encje,
4. wydajność oraz konwersja mobilna.

Nie ma podstaw do zmiany domeny. Domena posiada widoczność brandową i lokalną dla Marek, a gabinet rzeczywiście komunikuje wizyty domowe w Markach. Zmiana domeny byłaby operacją wysokiego ryzyka bez dowodu przewagi. Należy zachować domenę i precyzyjnie komunikować: **gabinet znajduje się w Zielonce, a Marki są rzeczywistym obszarem obsługi tylko w zakresie potwierdzonym przez właścicielkę**.

---

# Stan Git i zgodność produkcji z repozytorium

- Repozytorium było czyste przed audytem.
- Po `git fetch --prune origin`: `HEAD`, `origin/main` i `origin/HEAD` wskazywały commit `6641592` (`Use original logo colors in preloader`).
- Rozbieżność `HEAD...origin/main`: **0 commitów lokalnie / 0 commitów zdalnie**.
- Lokalny build z tego commita wygenerował m.in. `/assets/index-BAnAaDRa.js` i `/assets/index-_6OIM2fy.css`; te same główne artefakty były serwowane na produkcji.
- Nagłówek `last-modified` produkcji wskazywał 17 lutego 2026, dzień aktualnego commita.
- Wniosek: w chwili audytu lokalny projekt zawierał najnowszy stan `main` z GitHuba. Zgodność nazw głównych artefaktów i daty wdrożenia daje wysokie prawdopodobieństwo, że produkcja pochodzi z aktualnego HEAD, ale nie jest kryptograficznym porównaniem każdego pliku deploymentu.
- `npm run build` i `npm run lint` zakończyły się powodzeniem.

---

# Metodyka i ograniczenia

## Źródła dowodów

- pełny przegląd repozytorium, konfiguracji, tras, komponentów, assetów, metadanych, robots i sitemap;
- testy HTTP produkcji dla HTTP/HTTPS, `www`/non-www, slash/no-slash, tras istniejących i błędnych;
- porównanie początkowego HTML z DOM po JavaScript;
- mobilny Lighthouse 13.4.1 na produkcji;
- trzy dostarczone eksporty GSC z 13.08.2026;
- publiczny, niezalogowany podgląd Google Business Profile i Booksy;
- aktualna dokumentacja Google, Schema.org, Bing, OpenAI, web.dev i W3C.

## Ograniczenia, których nie wolno pomijać

1. **GSC ukrywa część zapytań.** Widoczne 74 zapytania zawierają tylko 39 z 293 kliknięć, czyli 13,31%. Segmenty brand/non-brand odnoszą się wyłącznie do widocznych zapytań, nie do całej witryny.
2. **Brakuje eksportu `query × page`.** Nie można obserwacyjnie przypisać fraz do landingów ani dowieść kanibalizacji. Proponowane URL-e w TOP 10 są kandydatami, a nie potwierdzonym mapowaniem GSC.
3. **Tabela stron GSC nie sumuje się z wykresem głównym.** Ma 306 kliknięć i 8 554 wyświetlenia wobec 293/6 068 w wykresie; nie wyliczano z niej udziałów w całym ruchu.
4. **Brak wiarygodnych danych terenowych CrUX.** PageSpeed API zwróciło 429. Lighthouse jest testem laboratoryjnym, nie pomiarem wszystkich użytkowników; INP terenowy pozostaje nieznany.
5. **GBP był sprawdzany publicznie, bez panelu właściciela.** Kategorie dodatkowe, pełne godziny, duplikaty, historia adresu i statystyki wymagają dostępu właściciela.
6. **Brak danych o backlinkach i linkach GSC.** Nie można ilościowo ocenić autorytetu domeny ani profilu linków.
7. **Brak potwierdzonego systemu analitycznego.** W kodzie i początkowym HTML nie znaleziono GA4/GTM; konfiguracja poza repozytorium wymaga informacji właściciela.
8. Audyt dostępności objął automat Lighthouse i ręczną inspekcję kluczowych komponentów, ale nie był pełnym formalnym audytem WCAG z wszystkimi technologiami wspomagającymi.
9. Publiczne zapytanie do archiwum Wayback nie zwróciło użytecznych zapisów HTML. Nie jest to dowód braku historii domeny; bez danych GSC Links/Bing/narzędzia linkowego historii i autorytetu nie da się rozstrzygnąć.

---

# Model architektury projektu

- React 19 + Vite 6 + Tailwind CSS 4.
- `BrowserRouter`, lazy loading tras i klientowa aplikacja SPA.
- Sześć wzorców routingu: `/`, `/onas`, `/cennik`, `/dlaczego`, `/aktualnosci`, `/aktualnosci/:id`.
- Osiem konkretnych URL-i w sitemapie: pięć stron i trzy aktualności.
- Metadata tras są ustawiane w `useEffect` przez `src/components/Seo.jsx`.
- `public/_redirects` zawiera fallback `/* /index.html 200`.
- Brak catch-all route w `src/App.jsx`.
- PWA/service worker jest obecny.
- Produkcję osłania Cloudflare; pochodzenie/pełny pipeline wdrożenia wymaga potwierdzenia właściciela.
- `robots.txt` jest na produkcji rozszerzany przez Cloudflare Managed Content, więc różni się od trzywierszowego pliku w repozytorium.
- Nie znaleziono formularza, GA4 ani GTM. Główne konwersje to telefon, kontakt i zewnętrzna rezerwacja widoczna w GBP/Booksy.
- Nie znaleziono testów automatycznych ani konfiguracji CI; obecna weryfikacja opiera się na lint/build i testach ręcznych.

## Build i bundle

Lokalny build aktualnego HEAD:

| Zasób | Rozmiar | gzip |
|---|---:|---:|
| główny JS | 225,70 kB | 72,95 kB |
| chunk `Seo` | 125,98 kB | 41,48 kB |
| chunk `Home` | 43,76 kB | 16,41 kB |
| główny CSS | 41,77 kB | 7,75 kB |

Kod jest dzielony na trasy, co jest pozytywne. Nieużywane w `src` wydają się zależności `lightgallery`, `lg-thumbnail`, `lg-zoom` i `tailwind-scrollbar-hide`; trzeba je potwierdzić przed późniejszym usunięciem.

---

# Oceny 0–10

| Obszar | Ocena | Uzasadnienie |
|---|---:|---|
| Technical SEO | 4,5 | Działają HTTPS, sitemap i metadata po renderze, ale aktywne są dwa hosty, soft 404 i CSR-only head/content. |
| Crawlability | 5,0 | Roboty wyszukiwarek są dozwolone i sitemap jest dostępna, lecz początkowy HTML nie zawiera treści ani linków, a główna nawigacja sekcji używa przycisków. |
| Indexability | 4,5 | 7/13 URL-i jest zindeksowanych; 3 są crawled-not-indexed, a wariant `www` pozostaje publicznym 200. |
| On-page SEO | 5,0 | Unikalne title/description/canonical pojawiają się po JS, ale artykuły mają złą hierarchię H1 i brakuje trwałych landingów odpowiadających popytowi. |
| Local SEO strony | 6,0 | NAP i aktualny adres są czytelne oraz spójne z publicznym GBP, ale relacja Zielonka–Marki, dojazd i obszar działania wymagają precyzji. |
| Entity SEO | 4,0 | Nazwa, Hanna i lokalizacja są widoczne po renderze, lecz nie ma kompletnego grafu encji ani tekstowych kwalifikacji. |
| Structured Data | 2,0 | JSON-LD jest parsowalny, ale główny typ `Physiotherapy` jest użyty niezgodnie z modelem Schema.org. |
| E-E-A-T | 4,0 | Są biografia, certyfikaty i opinie, lecz kwalifikacje pozostają głównie obrazami, treści nie mają autorstwa/aktualizacji, a opinie nie mają źródeł. |
| Content Quality | 4,5 | Treści prezentują ofertę i lokalizację, ale wiele usług ma tylko nazwę, brakuje odpowiedzi na pytania pacjenta i występują mocne twierdzenia zdrowotne bez kontekstu. |
| Google AI readiness | 5,0 | Fundamenty Google Search istnieją, ale raw HTML, encje i wiarygodne, cytowalne odpowiedzi są niewystarczające. |
| ChatGPT Search readiness | 5,5 | OAI-SearchBot jest dozwolony; blokada GPTBot nie przeszkadza Search. Głównym ograniczeniem jest pusty initial HTML. |
| Bing/Copilot readiness | 4,5 | Bingbot ma dostęp i sitemapę, lecz brak prerenderingu, BWT/IndexNow nie są potwierdzone, a encje są słabe. |
| Performance | 5,0 | TTFB i CLS są dobre, ale mobilny Lighthouse dał wynik Performance 74 i LCP 4,8 s; preloadery blokują widoczność treści. |
| Mobile UX | 6,5 | Układ 390 px nie ma overflow i jest czytelny, ale cele dotykowe i kontakt/rezerwacja wymagają poprawy. |
| Accessibility | 6,0 | Lighthouse uzyskał 100, lecz ręcznie stwierdzono brak `<main>`, problemy klawiatury/modalu, małe cele i ubogą semantykę. |

---

# Co obecnie działa dobrze

- HTTPS działa, a `http://uzdrowisko-marki.pl/` przekierowuje jednym 301 do kanonicznego HTTPS non-www.
- Sitemap produkcyjna ma osiem poprawnych, bezpośrednich URL-i HTTPS non-www i status 200.
- Robots pozwala na Googlebot, Bingbot i OAI-SearchBot.
- NAP w widocznej treści i JSON-LD jest spójny: Kolejowa 76, 05-220 Zielonka; +48 510 783 269; pon.–sob. 10:00–15:00.
- Po JavaScript każda prawidłowa trasa ma unikalny title, description i canonical.
- Publiczny GBP ma aktualny adres i kategorię „Fizjoterapeuta”.
- Marka własna jest silna w GSC.
- Mobile generuje 82,94% kliknięć i ma wysoką widoczność; layout 390×844 nie powodował poziomego przewijania.
- TTFB dokumentu w laboratorium wynosił około 55–110 ms, a CLS 0.
- Obraz hero ma WebP, `srcset`, preload i eager loading; problemem jest głównie opóźnione ujawnienie treści, nie sam brak optymalizacji hero.
- Build, lint i route-level code splitting działają poprawnie.

---

# Produkcja: HTTP, canonical, rendering i crawlability

## Statusy i normalizacja URL

| Test | Wynik | Ocena |
|---|---|---|
| `http://uzdrowisko-marki.pl/` | 301 → `https://uzdrowisko-marki.pl/` | poprawnie |
| `http://www.uzdrowisko-marki.pl/` | 301 → `https://www.uzdrowisko-marki.pl/` | niepełny redirect |
| `https://www.uzdrowisko-marki.pl/` | 200 | błąd kanonikalizacji hosta |
| `https://uzdrowisko-marki.pl/` | 200 | canonical |
| `/onas` i `/onas/` | oba 200 | brak normalizacji slash |
| nieistniejący `/nie-istnieje-audyt-20260813` | 200 | soft 404 |

Wersje `www` i non-www zwracały identyczny HTML. Canonical wskazuje non-www, ale sam canonical nie zastępuje przekierowania serwerowego. Na `/onas/` metadata po JS wskazują `/onas`, lecz H1 ma wartość „Strona”, ponieważ `HeaderOther.jsx` dopasowuje ścieżki dokładnie.

## Początkowy HTML

Każda testowana trasa, w tym nieistniejąca, zwraca ten sam dokument około 5,3 kB. W body znajduje się wyłącznie:

```html
<div id="root"></div>
```

Bez JavaScript crawler nie otrzymuje H1, nazwy specjalistki, usług, adresu, NAP ani linków wewnętrznych. Dla `/onas` initial HTML nadal ma tytuł i canonical strony głównej. `src/components/Seo.jsx:41-60` zmienia je dopiero w `useEffect`.

Google potrafi renderować JavaScript, ale samo Google zaleca, by istotne treści i crawlable linki były dostępne niezawodnie; nie wszystkie boty renderują JS. W tej małej, statycznej witrynie prerendering ośmiu tras jest prostszym i bardziej odpornym rozwiązaniem niż utrzymywanie pełnej zależności od drugiego etapu renderowania.

## Robots i AI crawlers

Produkcja zawiera dwie warstwy robots:

- `User-agent: *`, `Allow: /`, sitemap;
- Cloudflare Managed Content: `Content-Signal: search=yes, ai-train=no, use=reference`, a następnie blokady crawlerów treningowych, m.in. GPTBot i Google-Extended.

OAI-SearchBot nie jest zablokowany i dziedziczy `Allow: /`. To właściwy bot dla obecności w ChatGPT Search. GPTBot odpowiada za potencjalne wykorzystanie do trenowania i jego blokada jest niezależna od OAI-SearchBot. ChatGPT-User jest ruchem wywołanym przez użytkownika i nie gwarantuje automatycznej obecności w Search.

## Sitemap

- 200, `application/xml`;
- 8 kanonicznych URL-i bez trailing slash;
- brak redirectów i 404 w mapie;
- brak `<lastmod>`;
- `changefreq` i `priority` są obecne.

Brak `lastmod` nie jest błędem krytycznym. Warto je dodać tylko wtedy, gdy daty będą prawdziwe i automatycznie utrzymywane. Eksport GSC „Sitemap — Wszystkie znane strony” nie potwierdza jednoznacznie, że ta konkretna mapa jest zgłoszona — wymaga sprawdzenia w panelu.

---

# Google Search Console

Przeanalizowane eksporty: `uzdrowisko-marki.pl-Performance-on-Search-2026-08-13.zip`, `uzdrowisko-marki.pl-Coverage-2026-08-13.zip` i `uzdrowisko-marki.pl-Coverage-Drilldown-2026-08-13.zip`.

## Aktualny stan GSC

### Performance

Faktyczny zakres danych: **27.08.2025–11.08.2026**, typ wyszukiwania „Sieć”.

| Metryka | Wynik |
|---|---:|
| Kliknięcia | 293 |
| Wyświetlenia | 6 068 |
| CTR | 4,83% |
| Średnia pozycja | 11,56 |
| Dni z wyświetleniami | 329/350 |
| Dni z co najmniej 1 kliknięciem | 176/350 |

### Trend

- ostatnie 28 dni vs poprzednie 28: 52 vs 25 kliknięć (**+108%**), 1 009 vs 1 283 wyświetlenia (**−21,4%**), CTR 5,15% vs 1,95%;
- ostatnie 90 dni vs poprzednie 90: 102 vs 111 kliknięć (**−8,1%**), 3 216 vs 2 268 wyświetleń (**+41,8%**), CTR 3,17% vs 4,89%, pozycja 9,94 vs 10,87.

Widoczność rosła szybciej niż kliknięcia. To wzmacnia potrzebę analizy intencji, Local Pack i landingów, a nie samego zwiększania liczby treści.

### Przebieg miesięczny

Pierwszy i ostatni miesiąc są niepełne.

| Miesiąc | Klik. | Wyśw. | CTR | Poz. |
|---|---:|---:|---:|---:|
| 2025-08, 5 dni | 3 | 5 | 60,00% | 1,00 |
| 2025-09 | 16 | 52 | 30,77% | 23,96 |
| 2025-10 | 7 | 64 | 10,94% | 19,87 |
| 2025-11 | 7 | 122 | 5,74% | 23,83 |
| 2025-12 | 13 | 128 | 10,16% | 23,72 |
| 2026-01 | 20 | 132 | 15,15% | 23,35 |
| 2026-02 | 57 | 488 | 11,68% | 9,67 |
| 2026-03 | 30 | 599 | 5,01% | 14,49 |
| 2026-04 | 23 | 882 | 2,61% | 10,31 |
| 2026-05 | 30 | 768 | 3,91% | 11,60 |
| 2026-06 | 21 | 1 146 | 1,83% | 10,86 |
| 2026-07 | 47 | 1 303 | 3,61% | 8,58 |
| 2026-08, 11 dni | 19 | 379 | 5,01% | 9,39 |

## Najważniejsze queries

| Zapytanie | Klik. | Wyśw. | CTR | Poz. | Wniosek |
|---|---:|---:|---:|---:|---|
| `uzdrowisko marki` | 19 | 96 | 19,79% | 1,42 | silny brand |
| `uzdrowisko marki hanna nowotczyńska` | 14 | 42 | 33,33% | 1,00 | silna encja brandowa |
| `rehabilitacja zielonka` | 1 | 765 | 0,13% | 2,16 | największa anomalia CTR |
| `fizjoterapia marki` | 1 | 697 | 0,14% | 22,88 | wysoki popyt, słabe dopasowanie/ranking |
| `fizjoterapeuta marki` | 1 | 340 | 0,29% | 25,44 | jw. |
| `rehabilitacja marki` | 0 | 370 | 0% | 31,56 | popyt poza top 30 |
| `uzdrowisko` | 0 | 178 | 0% | 9,58 | niejednoznaczna intencja sanatorium/brand |
| `drenaż limfatyczny zielonka` | 0 | 124 | 0% | 14,90 | realna szansa po potwierdzeniu usługi |
| `rehabilitacja osób starszych marki` | 0 | 94 | 0% | 26,15 | potwierdzić ofertę i obszar działania |
| `fizjoterapeuta zielonka` | 0 | 73 | 0% | 10,93 | blisko pierwszej strony |

## Brand queries

Konserwatywny brand potwierdzony obejmuje `uzdrowisko marki` i pełne `Hanna Nowotczyńska`.

| Segment widocznych zapytań | Wiersze | Klik. | Wyśw. | CTR | Poz. |
|---|---:|---:|---:|---:|---:|
| Brand potwierdzony | 2 | 33 | 138 | 23,91% | 1,29 |
| Brand niejednoznaczny | 5 | 0 | 193 | 0% | 9,56 |
| Brand szeroki łącznie | 7 | 33 | 331 | 9,97% | 6,11 |
| Wyraźny non-brand | 67 | 6 | 2 926 | 0,21% | 17,38 |

Brand potwierdzony odpowiada za 84,62% kliknięć w widocznej tabeli zapytań, ale tylko 4,24% jej wyświetleń. Nie wolno przenosić tego udziału na całą witrynę, ponieważ GSC ukrywa 86,69% kliknięć na poziomie queries.

## Non-brand queries

Widoczne non-brand ma **6 kliknięć z 2 926 wyświetleń**. Problemem nie jest brak ekspozycji, tylko słabe wykorzystanie ekspozycji. Najważniejsze grupy:

- fizjoterapia/fizjoterapeuta Marki: 2/1 042, CTR 0,19%, pozycja 23,65;
- rehabilitacja Zielonka: 1/781, CTR 0,13%, pozycja około 2,16;
- rehabilitacja Marki: 0/376, pozycja 31,63;
- fizjoterapia/fizjoterapeuta Zielonka: 1/140, CTR 0,71%, pozycja 11,06;
- drenaż limfatyczny Zielonka: 0/124, pozycja 14,90;
- masaż Marki: 1/68, CTR 1,47%, pozycja 19,17;
- Toony: 0/62, pozycja 36,43.

## Local intent

Jawną intencję lokalną miały 43 widoczne frazy: 39 kliknięć, 2 946 wyświetleń, CTR 1,32%. Po odjęciu dwóch potwierdzonych fraz brandowych pozostaje 6/2 808, CTR 0,21%, pozycja 17,15. Wszystkie widoczne kliknięcia non-brand pochodzą z fraz lokalnych.

## Marki vs Zielonka

| Segment | Zapytania | Klik. | Wyśw. | CTR | Poz. |
|---|---:|---:|---:|---:|---:|
| Marki łącznie z brandem | 18 | 36 | 1 746 | 2,06% | 23,82 |
| Marki bez brandu | 16 | 3 | 1 608 | 0,19% | 25,75 |
| Zielonka | 20 | 3 | 1 135 | 0,26% | 5,58 |

Zielonka ma znacznie lepszą pozycję, ale niemal nie generuje kliknięć. Marki ma większy popyt, lecz słabą widoczność non-brand. Właściwa strategia nie polega na zmianie domeny, lecz na rozdzieleniu prawdziwych komunikatów:

- gabinet stacjonarny: Zielonka, Kolejowa 76;
- obszar wizyt domowych/obsługi: Marki i inne obszary wyłącznie po potwierdzeniu właściciela;
- żadnego sugerowania stacjonarnego gabinetu w Markach, jeśli go tam nie ma.

## CTR anomalies

1. `rehabilitacja zielonka`: 1/765, CTR 0,13%, pozycja 2,16. Najpierw sprawdzić SERP/Local Pack, query × page, rozkład urządzeń i intencję NFZ/prywatną.
2. `/aktualnosci/nowa-lokalizacja-zielonka`: po połączeniu hostów 0/172, pozycja 5,64. News o przeprowadzce prawdopodobnie nie zaspokaja trwałej intencji usługowo-lokalnej.
3. `uzdrowisko`: 0/178, pozycja 9,58. Fraza miesza brand z intencją sanatoryjną.
4. `uzdrowisko koło warszawy`: 0/52, pozycja 6,17. Intencja prawdopodobnie dotyczy uzdrowiska/sanatorium, a nie gabinetu.
5. `rehabilitacja zielonka nfz`: 0/9, pozycja 1. Mała próba i potencjalnie niedopasowana intencja; **nie komunikować NFZ bez potwierdzenia**.

## Near-ranking opportunities

| Koszyk pozycji | Zapytania | Klik. | Wyśw. | CTR | Poz. |
|---|---:|---:|---:|---:|---:|
| Top 3 | 21 | 34 | 943 | 3,61% | 2,02 |
| 4–10 | 20 | 1 | 353 | 0,28% | 8,70 |
| 10–30 | 20 | 4 | 1 517 | 0,26% | 21,61 |
| 4–30 łącznie | 40 | 5 | 1 870 | 0,27% | 19,17 |
| powyżej 30 | 13 | 0 | 444 | 0% | 34,05 |

57,42% wyświetleń widocznych zapytań znajduje się na pozycjach 4–30 i przynosi tylko pięć kliknięć. To najważniejsza pula wzrostu.

## Najważniejsze landing pages

Po normalizacji ścieżek, ale z zastrzeżeniem niespójnej sumy tabeli GSC:

| Ścieżka | Warianty host/protokół | Klik. | Wyśw. | CTR | Poz. |
|---|---:|---:|---:|---:|---:|
| `/` | 3 | 231 | 6 025 | 3,83% | 9,52 |
| `/onas` | 1 | 56 | 1 233 | 4,54% | 11,80 |
| `/cennik` | 1 | 16 | 700 | 2,29% | 14,93 |
| `/dlaczego` | 2 | 1 | 224 | 0,45% | 28,56 |
| `/aktualnosci/nowa-lokalizacja-zielonka` | 2 | 0 | 172 | 0% | 5,64 |
| `/aktualnosci/nowa-usluga-tt` | 2 | 2 | 122 | 1,64% | 17,78 |
| `/aktualnosci/szkolenie-toony-therapy` | 2 | 0 | 48 | 0% | 15,56 |
| `/aktualnosci` | 2 | 0 | 30 | 0% | 12,60 |

Strona `/dlaczego` jest faktycznie stroną usług, lecz jej URL i historyczna nazwa nie komunikują tej intencji. Ewentualna zmiana na `/uslugi` wymaga 301 i nie jest pierwszym quick winem.

### Weryfikacja potencjalnych landingów w repozytorium

Ponieważ eksport nie zawiera `query × page`, nie przypisano arbitralnie zapytań do URL-i. Poniższa kontrola pokazuje, co potrafią obecni kandydaci:

| Kandydat | Renderowany title / H1 | Treść i linkowanie | Ocena dla intencji |
|---|---|---|---|
| `/` | `Uzdrowisko Marki - Fizjoterapia i terapia manualna` / `Uzdrowisko` | Hanna, gabinet, usługi, Zielonka, Marki/wizyty domowe i kontakt; nawigacja sekcji jest oparta głównie na buttonach, ale karty prowadzą do części podstron | najlepszy obecny kandydat na nadrzędny landing lokalny, wymaga jaśniejszej hierarchii Zielonka–Marki |
| `/dlaczego` | `Usługi fizjoterapii \| Uzdrowisko Marki` / `Usługi` | 12 nazw usług, ikony i telefon; brak opisów, FAQ i kwalifikacji | zbyt płytki dla większości szczegółowych intencji usługowych |
| `/cennik` | `Cennik usług \| Uzdrowisko Marki` / `Cennik` | szczegółowe ceny i nazwy, ale mało wyjaśnień procesu; Toony nie ma własnego właścicielskiego URL | dobry dla intencji cenowej, nie jako główny landing usługi |
| `/onas` | `O nas \| Uzdrowisko Marki` / `O nas` | biografia i certyfikaty głównie jako obrazy | wspiera encję osoby, nie powinien przejmować ogólnych fraz usługowych |
| `/aktualnosci/nowa-lokalizacja-zielonka` | długi title / H1 `Aktualności`, tytuł wpisu jako H2 | adres i oferta w kontekście przeprowadzki; link z listy newsów | treść czasowa, niewłaściwa jako jedyny trwały landing Zielonki |

Na żadnym kandydacie nie ma kluczowej treści, title/H1 ani linków w początkowym HTML bez JavaScript. Ostateczne przypisanie fraz wymaga eksportu `query × page`.

## Cannibalization

Brak `query × page` uniemożliwia potwierdzenie kanibalizacji. Są tylko hipotezy do sprawdzenia:

- rozszczepienie techniczne między `www` i non-www;
- nakładanie treści Toony między dwoma artykułami;
- news o nowej lokalizacji może przejmować frazy, dla których lepszy byłby trwały landing lokalny.

## Indexing

Coverage obejmuje 15.05.2026–07.08.2026.

| Stan najnowszy | URL-e |
|---|---:|
| Zindeksowano | 7 |
| Nie zindeksowano | 6 |
| Wszystkie znane | 13 |

Historia nie jest stabilnym wzrostem: 15.05 było 8 zindeksowanych/6 niezindeksowanych; 13.06 — 6/7; 11.07 — 7/6; 07.08 — 7/6. W małej witrynie zmiana o jeden lub dwa URL-e ma duży udział procentowy, dlatego należy śledzić konkretne adresy, nie sam procent.

Powody sześciu wykluczeń:

- strona zawiera przekierowanie: 2;
- alternatywna strona z prawidłowym canonical: 1;
- zeskanowana, ale jeszcze niezindeksowana: 3.

Aktualne trzy crawled-not-indexed:

1. `https://uzdrowisko-marki.pl/aktualnosci` — ostatnie skanowanie 08.08.2026;
2. `https://www.uzdrowisko-marki.pl/aktualnosci/nowa-usluga-tt` — 18.03.2026;
3. `https://www.uzdrowisko-marki.pl/aktualnosci` — 12.03.2026.

Wszystkie walidacje mają status „Nie rozpoczęto”. Brak wierszy noindex/robots/soft 404 w tym eksporcie nie oznacza, że soft 404 nie istnieje — test produkcji potwierdził go niezależnie.

Surowa tabela Performance zawiera sześć z ośmiu ścieżek zarówno jako `www`, jak i non-www oraz homepage jako HTTP. Produkcja potwierdza, że problem `www` nadal jest aktywny.

## Canonicalization

- canonicale w sitemapie i po renderze wskazują HTTPS non-www bez trailing slash;
- wariant HTTP non-www przechodzi prawidłowo jednym 301;
- wariant HTTPS `www` nadal zwraca 200, więc canonical nie jest wsparty przekierowaniem;
- slash/no-slash zwracają 200; na `/onas/` H1 jest dodatkowo błędne;
- GSC pokazuje historyczny/aktywny ruch na HTTP i obu hostach oraz 1 alternatywny canonical;
- dokładne URL-e dwóch redirectów i jednego alternate canonical nie występują w dostarczonym Coverage — trzeba je sprawdzić w panelu/URL Inspection.

## Mobile vs desktop

| Urządzenie | Klik. | Wyśw. | CTR | Poz. |
|---|---:|---:|---:|---:|
| Mobile | 243 | 3 571 | 6,80% | 4,24 |
| Desktop | 49 | 2 484 | 1,97% | 22,11 |
| Tablet | 1 | 13 | 7,69% | 6,23 |

Mobile odpowiada za 82,94% kliknięć. Różnica pozycji mobile–desktop wynosi 17,87 miejsca, ale może wynikać z innego miksu zapytań. Potrzebny jest eksport query × device. Niezależnie od przyczyny, telefon, dojazd i rezerwacja muszą być projektowane mobile-first.

## Kraje

- Polska: 289/5 811, CTR 4,97%, pozycja 11,58;
- Polska stanowi 98,63% kliknięć i 95,77% wyświetleń;
- dane poza Polską są małe i nie uzasadniają obecnie wielojęzycznej architektury.

Eksport `Wygląd w wyszukiwarce.csv` zawierał wyłącznie nagłówki, więc GSC nie dostarczył danych o rich results ani innych search appearances.

## Największe możliwości wzrostu

1. Zamienić istniejącą, wysoką ekspozycję lokalną na kliknięcia i rezerwacje — najpierw przez query × page i analizę Local Pack, potem przez dopasowanie jednej trwałej strony.
2. Skonsolidować `www`/non-www i usunąć soft 404, aby nie rozpraszać sygnałów małej witryny.
3. Prerenderować treść i metadata — szczególnie dla trzech URL-i crawled-not-indexed oraz botów nierenderujących JS.
4. Rozwinąć potwierdzone usługi i profil Hanny w tekst, który jednocześnie odpowiada pacjentowi i wzmacnia E‑E‑A‑T/AI citations.
5. Wykorzystać dominację mobile przez bezpośredni telefon, trasę, rezerwację oraz późniejszy pomiar konwersji.

## TOP 10 możliwości wynikających z GSC

**Uwaga:** „docelowy landing” jest hipotezą do weryfikacji w `query × page`, nie potwierdzonym aktualnym landingiem.

| # | Query / grupa | Kandydat na landing | Klik. | Wyśw. | CTR | Poz. | Intencja | Obecny stan i rekomendacja | Wpływ / confidence |
|---:|---|---|---:|---:|---:|---:|---|---|---|
| 1 | rehabilitacja Zielonka | nieustalony — brak `query × page`; kandydat: homepage lub trwały landing lokalny | 1 | 781 | 0,13% | 2,16 | lokalna/transakcyjna, częściowo NFZ | Ustalić landing i Local Pack; jasno odróżnić prywatną ofertę od NFZ. Nie tworzyć strony w ciemno. | bardzo wysoki / średni |
| 2 | fizjoterapia/fizjoterapeuta Marki | jedna mocna strona usługowa/obszarowa | 2 | 1 042 | 0,19% | 23,65 | lokalna/transakcyjna | Strona tylko jeśli Marki są realnym obszarem usług; jasno powiedzieć, że gabinet jest w Zielonce. | wysoki / wysoki dla popytu, średni dla URL |
| 3 | rehabilitacja Marki | nieustalony — brak `query × page`; kandydat dopiero po potwierdzeniu obszaru | 0 | 376 | 0% | 31,63 | lokalna/transakcyjna | Potwierdzić usługę i obszar; stworzyć wartościowy materiał, nie doorway page. | wysoki / wysoki dla popytu |
| 4 | fizjoterapia/fizjoterapeuta Zielonka | homepage lub trwały landing lokalno-usługowy | 1 | 140 | 0,71% | 11,06 | lokalna/transakcyjna | Nie opierać intencji wyłącznie na aktualności o przeprowadzce; rozbudować odpowiedź usługową. | wysoki / wysoki |
| 5 | `uzdrowisko` | `/` | 0 | 178 | 0% | 9,58 | mieszana brand/sanatorium | W title/H1/treści jednoznacznie: gabinet fizjoterapii, Hanna, Zielonka; nie ścigać intencji sanatoryjnej. | średni–wysoki / średni |
| 6 | drenaż limfatyczny Zielonka | potwierdzona strona usługi | 0 | 124 | 0% | 14,90 | usługa + lokalna | Po potwierdzeniu kompetencji/oferty dodać przebieg, wskazania, bezpieczeństwo, ceny i FAQ. | wysoki / wysoki dla danych, zależny od oferty |
| 7 | rehabilitacja osób starszych Marki | właściwa sekcja/strona usługi | 0 | 94 | 0% | 26,15 | lokalna/problem | Potwierdzić ofertę, doświadczenie i wizyty domowe; nie publikować twierdzeń bez pokrycia. | średni–wysoki / średni |
| 8 | masaż Marki | jedna strona masażu | 1 | 68 | 1,47% | 19,17 | lokalna/transakcyjna | Skonsolidować warianty frazy, opisać realną usługę i obszar. | średni / wysoki |
| 9 | Toony / cena / kontakt | jeden właścicielski URL usługi | 0 | 62 | 0% | 36,43 | usługa/cena | Oddzielić news szkoleniowy od trwałej oferty i cennika; doprecyzować status kwalifikacji. | średni / średni |
| 10 | masaż Zielonka | właściwy landing masażu | 1 | 38 | 2,63% | 20,39 | lokalna/transakcyjna | Wzmocnić jedną zgodną z ofertą stronę; nie tworzyć osobnej strony dla każdej odmiany słowa. | średni / wysoki |

---

# Problemy i rekomendacje

## P0 – krytyczne

Nie stwierdzono awarii całej witryny, globalnego noindex, blokady Googlebota/OAI-SearchBot ani niedostępności domeny. Dlatego nie przypisano P0. Poniższe P1 powinny jednak wejść do pierwszej fazy, ponieważ kilka z nich wzajemnie się wzmacnia.

## P1-01 – aktywne duplikaty hosta i wariantów URL

### Problem

`www` i non-www są jednocześnie dostępne jako 200; slash/no-slash również nie są normalizowane.

### Dowód

test HTTP produkcji; `https://www...` = 200. GSC: 6/8 ścieżek występuje na obu hostach, a homepage także jako HTTP. `public/_redirects:1` nie zawiera reguły hosta.

### Dlaczego to ma znaczenie

rozdziela sygnały, utrudnia jednoznaczną kanonikalizację i generuje duplikaty. Canonical jest wskazówką, a 301 mocniejszym sygnałem.

### Wpływ

SEO, Local, AI, indeksacja i konsolidacja sygnałów.

### Rekomendowane rozwiązanie

jeden hop 301 dla wszystkich `http` i `www` do `https://uzdrowisko-marki.pl`, plus wybrany standard trailing slash. Zaktualizować GBP bezpośrednio na non-www. Po wdrożeniu sprawdzić wszystkie osiem URL-i i zgłosić walidacje GSC.

### Przewidywany wpływ

wysoki.

### Nakład pracy

mały–średni.

### Ryzyko

średnie — reguły muszą zachować ścieżki i query string.

## P1-02 – nieistniejące adresy zwracają 200 (soft 404)

### Problem

fallback SPA obsługuje każdy URL jako 200, a React nie ma route `*`.

### Dowód

`/nie-istnieje-audyt-20260813` = 200, pusty DOM, `index,follow`, canonical homepage, błąd konsoli „No routes matched”. `src/App.jsx:20-27`; `public/_redirects:1`.

### Dlaczego to ma znaczenie

robot może indeksować puste/duplikacyjne URL-e, Google musi sam rozpoznać soft 404, a błędne linki nie mają właściwego statusu.

### Wpływ

SEO, indexability, UX, AI.

### Rekomendowane rozwiązanie

użyteczna trasa 404 z `noindex`, ale przede wszystkim serwerowy 404 dla nieznanych adresów. Dynamiczne newsy muszą zwracać 404 dla nieistniejącego `id`. Zweryfikować status bez i po JavaScript.

### Przewidywany wpływ

wysoki.

### Nakład pracy

średni.

### Ryzyko

średnie — trzeba zachować działający deep-linking SPA.

## P1-03 – treść i metadata tras zależą całkowicie od JavaScript

### Problem

initial HTML wszystkich tras jest pustym app shellem i ma domyślne metadata homepage.

### Dowód

produkcja ok. 5,3 kB i tylko `<div id="root"></div>`; `index.html:118-120`; `src/components/Seo.jsx:41-60`. GSC ma 3 URL-e crawled-not-indexed.

### Dlaczego to ma znaczenie

Google zwykle renderuje JS, ale indeksacja jest wolniejsza i mniej odporna. Bing, część botów AI i social crawlers mogą nie zobaczyć właściwej treści/head.

### Wpływ

SEO, Bing/Copilot, AI, social sharing, accessibility bez JS.

### Rekomendowane rozwiązanie

build-time prerendering/SSG wszystkich ośmiu tras, z właściwym title, description, canonical, H1, NAP, linkami i JSON-LD w HTML. Nie migrować frameworka, dopóki prerendering rozwiązuje problem.

### Przewidywany wpływ

wysoki.

### Nakład pracy

średni.

### Ryzyko

średnie — należy testować hydration i route assets.

## P1-04 – realny popyt lokalny nie ma potwierdzonego właściciela intencji

### Problem

bardzo duża ekspozycja non-brand nie konwertuje na kliknięcia, a news o przeprowadzce może pełnić rolę przypadkowego landingu Zielonki.

### Dowód

non-brand 6/2 926; `rehabilitacja zielonka` 1/765 przy pozycji 2,16; news lokalizacyjny 0/172 przy pozycji 5,64; brak query × page.

### Dlaczego to ma znaczenie

to największa potwierdzona ilościowo szansa pozyskiwania pacjentów.

### Wpływ

SEO, Local, konwersja, AI.

### Rekomendowane rozwiązanie

przed tworzeniem URL-i pobrać query × page i sprawdzić rzeczywisty SERP/Local Pack. Następnie przypisać jedną trwałą stronę do fizjoterapii/rehabilitacji w Zielonce oraz jedną prawdziwą narrację dla usług w Markach. Nie tworzyć doorway pages.

### Przewidywany wpływ

wysoki.

### Nakład pracy

średni–duży.

### Ryzyko

średnie — zła architektura może kanibalizować istniejącą widoczność.

## P1-05 – nieprawidłowy typ Schema.org i słaby graf encji

### Problem

`Physiotherapy` jest użyte jako typ firmy.

### Dowód

`index.html:51`. Schema.org definiuje `Physiotherapy` jako członka enumeracji `MedicalSpecialty`, nie typ. Brak osobnego `Person`, `WebPage`, `Service` i `NewsArticle`.

### Dlaczego to ma znaczenie

robot nie otrzymuje wiarygodnego, zgodnego z modelem opisu firmy, osoby, usług i ich relacji.

### Wpływ

Entity SEO, Local, Google AI, ChatGPT Search, Bing/Copilot.

### Rekomendowane rozwiązanie

spójny `@graph` ze stabilnymi `@id`: `WebSite`, `MedicalBusiness` jako bezpieczna baza (lub `MedicalClinic` tylko jeśli semantycznie i formalnie potwierdzone), `Person`, `WebPage`, potwierdzone `Service` i `NewsArticle`. `Physiotherapy` stosować jako wartość `medicalSpecialty` wyłącznie przy kompatybilnym typie. Nie dodawać ratingów z własnych opinii.

### Przewidywany wpływ

średni–wysoki.

### Nakład pracy

średni.

### Ryzyko

niskie po walidacji i potwierdzeniu danych.

## P1-06 – niewystarczające E‑E‑A‑T dla treści zdrowotnych

### Problem

kwalifikacje są głównie obrazami, wiele usług ma tylko nazwę, artykuły nie mają autora/recenzenta ani dat aktualizacji, a opinie zawierają mocne twierdzenia o efektach bez źródła.

### Dowód

`src/components/AboutUsContent.jsx:51-100`; generyczne alty `Certyfikat 1–12`; `src/components/Services.jsx:5-54`; `src/components/Opinions.jsx:4-29`; `src/components/news/newsData.js` nie ma autora ani `dateModified`.

### Dlaczego to ma znaczenie

zdrowie jest obszarem YMYL. Użytkownik i system AI powinni móc zweryfikować „kto, z jakimi kwalifikacjami, na jakiej podstawie i kiedy”.

### Wpływ

SEO, Local, AI, zaufanie, konwersja.

### Rekomendowane rozwiązanie

za zgodą właścicielki opisać tekstowo stopień zawodowy, prawo wykonywania zawodu, rzeczywiście ukończone kursy (nazwa, organizator, rok), doświadczenie i zakres kompetencji; dodać autorstwo/aktualizację treści i realistyczne informacje o przebiegu usług. Uporządkować źródło/zgody opinii oraz złagodzić nieproporcjonalne obietnice. Wszystko niepotwierdzone: **WYMAGA INFORMACJI OD WŁAŚCICIELA**.

### Przewidywany wpływ

wysoki.

### Nakład pracy

średni–duży.

### Ryzyko

średnie — treści medyczne wymagają merytorycznej akceptacji Hanny.

## P1-07 – preloader pogarsza LCP i blokuje widoczność treści

### Problem

strona pozostaje `invisible`, dopóki nie zakończy się preload wielu obrazów, również below-the-fold.

### Dowód

`src/pages/Home.jsx:32-58` inicjuje preload 7 plików, a `src/pages/Home.jsx:98-101` ukrywa treść; suma rozmiarów lokalnych plików publicznych wynosi około 590 kB. Dwa requesty — `/icons/Kregoslup.webp` i `/icons/ludzik.webp` — zwracają produkcyjnie HTTP 404. `/onas` czeka na 14 obrazów (`src/pages/AboutUs.jsx:24-43`), około 2,11 MB lokalnych plików; `/dlaczego` na 16 (`src/pages/ServicesPage.jsx:24-60`), około 630 kB. Transfer sieciowy może być niższy dzięki cache/kompresji, ale warunek ujawnienia treści pozostaje. Dwa uruchomienia Lighthouse mobile dały wynik Performance 74, FCP 2,4 s, LCP 4,8 s, CLS 0.

### Dlaczego to ma znaczenie

treść i główne CTA są wizualnie oraz w praktyce dostępności ukryte mimo szybkiego TTFB. Mobile odpowiada za 82,94% kliknięć.

### Wpływ

Performance, UX, konwersja, accessibility, pośrednio SEO.

### Rekomendowane rozwiązanie

nie blokować strony na zasobach below-the-fold; wyrenderować treść od razu, preloader ograniczyć lub usunąć, naprawić `/icons/Kregoslup.webp` i `/icons/ludzik.webp`, jawnie podać wymiary obrazów, dopracować LCP preload/fetch priority oraz cache. Zachować jakość wizualną hero.

### Przewidywany wpływ

wysoki.

### Nakład pracy

średni.

### Ryzyko

niskie–średnie.

## P1-08 – publiczne certyfikaty ujawniają nadmiarowe dane osobowe

### Problem

co najmniej część obrazów certyfikatów pokazuje pełną datę urodzenia oraz numery zawodowe/dokumentowe. Raport celowo nie reprodukuje żadnej z tych wartości.

### Dowód

`public/HannaNow/zdj10.webp` ujawnia pełną datę urodzenia; `public/HannaNow/zdj1.webp` pokazuje zawodowy numer rejestrowy oraz numer dokumentu/uchwały. Pliki są publicznie dostępne, a galeria publikuje wszystkie 12 obrazów.

### Dlaczego to ma znaczenie

pełna data urodzenia nie jest potrzebna do E‑E‑A‑T i zwiększa ryzyko prywatności/podszycia. Zawodowy numer rejestrowy może natomiast być wartościowym, publicznym potwierdzeniem kwalifikacji; właścicielka powinna zdecydować, czy i jak go pokazać. Nie przesądza się tu oceny prawnej.

### Wpływ

prywatność, bezpieczeństwo, zaufanie.

### Rekomendowane rozwiązanie

przygotować redagowane kopie webowe z ukrytą datą urodzenia i innymi danymi niewymaganymi do weryfikacji; oryginały zachować offline. Po decyzji właścicielki zawodowy numer rejestrowy można pozostawić albo podać tekstowo/linkiem do właściwego rejestru, bez publikowania nadmiarowych danych dokumentu.

### Przewidywany wpływ

wysoki dla redukcji ryzyka, neutralny dla rankingu.

### Nakład pracy

mały–średni.

### Ryzyko

niskie po zachowaniu oryginałów.

## P2-01 – artykuły mają słabą semantykę i sygnały publikacyjne

### Problem

H1 to „Aktualności”, tytuł wpisu jest H2; brak `<article>`, `<time>`, autora, `datePublished`, `dateModified` i schemy artykułu.

### Dowód

`src/components/HeaderOther.jsx:15-26`; `src/components/news/NewsDetails.jsx:15-82`; tytuły newsów mają około 74–104 znaki, a opisy około 205–235 znaków; 2 z 3 crawled-not-indexed dotyczą `/aktualnosci` na hostach.

### Dlaczego to ma znaczenie

utrudnia zrozumienie dokumentu, autorstwa i świeżości w YMYL.

### Wpływ

SEO, AI, accessibility, E‑E‑A‑T.

### Rekomendowane rozwiązanie

tytuł artykułu jako jedyny H1, semantyczne `<article>`/`<time>`, prawdziwy autor i data modyfikacji, NewsArticle/Article oraz krótsze metadata. Rozstrzygnąć niespójność narracji Toony: wpis z 2025 mówi o ukończeniu szkolenia, a wpis z 2026 o przygotowaniu do egzaminu — **WYMAGA INFORMACJI OD WŁAŚCICIELA**.

### Przewidywany wpływ

średni.

### Nakład pracy

średni.

### Ryzyko

niskie.

## P2-02 – semantyka, klawiatura i cele dotykowe

### Problem

brak `<main>`/`<address>`, część nawigacji to JS-only buttony, galeria certyfikatów i modal nie mają pełnej obsługi klawiatury/dialogu, a część celów ma poniżej 44×44 px.

### Dowód

brak `<main>`, `<article>`, `<address>` w `src`; `Navbar.jsx:75-98`, `Navbar.jsx:116-121` i `Navbar.jsx:141-188` — zamknięte menu jest tylko zwinięte/transparentne i zachowuje fokusowalne kontrolki; `AboutUsContent.jsx:83-155`; brak globalnego wariantu `prefers-reduced-motion`; test 390×844. Lighthouse Accessibility 100 nie obejmuje wszystkich problemów manualnych.

### Dlaczego to ma znaczenie

pogarsza dostępność, crawlability linków i mobilną konwersję.

### Wpływ

Accessibility, UX, SEO, AI.

### Rekomendowane rozwiązanie

landmark `<main>`, `<address>`, skip link, prawdziwe `<a href>` dla nawigacji, `aria-expanded/controls`, ukrycie/inert nieaktywnego menu, polskie etykiety, cele minimum około 44 px, respektowanie `prefers-reduced-motion`, modal `role=dialog`, `aria-modal`, focus trap, Escape i powrót fokusu.

### Przewidywany wpływ

średni.

### Nakład pracy

średni.

### Ryzyko

niskie.

## P2-03 – niespójność profili i ścieżki lokalnej konwersji

### Problem

publiczny snapshot GBP podaje URL `www`, a widoczne dane Booksy nie są w pełni zgodne z aktualnym cennikiem/nazwami usług na stronie.

### Dowód

publiczny, niezalogowany panel odnaleziony przez wyszukanie firmy w Google Maps 13.08.2026 około 16:55 CEST pokazywał: `Uzdrowisko Marki Hanna Nowotczyńska`, kategorię Fizjoterapeuta, Kolejową 76, telefon 510 783 269, 5,0/18 opinii, WWW `https://www...` i rezerwację Booksy. Nie zapisano stabilnego share URL; jest to czasowy snapshot, nie stała wartość. W publicznym Booksy część cen/nazw różniła się od `src/components/PriceListContent.jsx:8-54`; dane zewnętrzne mogą się zmieniać.

### Dlaczego to ma znaczenie

rozbieżność ceny lub adresu obniża zaufanie i konwersję; `www` wzmacnia zły wariant hosta.

### Wpływ

Local, SEO, konwersja, zaufanie.

### Rekomendowane rozwiązanie

po potwierdzeniu aktualnego cennika zsynchronizować GBP, Booksy, Facebook i stronę; ustawić canonical non-www; przejrzeć opis Booksy zawierający bardzo mocne obietnice efektu.

### Przewidywany wpływ

średni–wysoki.

### Nakład pracy

mały–średni.

### Ryzyko

niskie po potwierdzeniu danych.

## P2-04 – tarcie w kontakcie i brak potwierdzonego pomiaru konwersji

### Problem

telefon w sekcji Kontakt i footerze jest zwykłym tekstem, na stronie nie ma bezpośredniego linku Booksy, a GA4/GTM ani śledzenie konwersji nie są widoczne.

### Dowód

`src/components/Kontakt.jsx:43-68`; `src/components/Footer.jsx`; tylko `src/components/Services.jsx:122` używa `tel:`; brak `gtag`/GTM w repozytorium.

### Dlaczego to ma znaczenie

przy 82,94% kliknięć z mobile tap-to-call, trasa i rezerwacja powinny być natychmiastowe. Bez pomiaru nie wiadomo, które frazy/landing pages pozyskują pacjentów.

### Wpływ

UX, Mobile, Local, analityka, konwersja.

### Rekomendowane rozwiązanie

spójne `tel:`, link „Wyznacz trasę”, zweryfikowany link rezerwacji i czytelne CTA; po decyzji właściciela wdrożyć zgodny z prywatnością pomiar kliknięć telefonu/mapy/rezerwacji i UTM w GBP.

### Przewidywany wpływ

średni–wysoki.

### Nakład pracy

mały–średni.

### Ryzyko

niskie dla linków, średnie dla analityki/zgód.

## P2-05 – techniczny dług bezpieczeństwa, cache i zależności

### Problem

brak podstawowych nagłówków bezpieczeństwa, krótki cache assetów i podatności w grafie npm.

### Dowód

brak HSTS, CSP, X-Content-Type-Options, ochrony framingu, Referrer-Policy i Permissions-Policy; hashowane assety mają `max-age=14400`; manifest ma `text/plain`. Service worker stosuje cache-first dla assetów i stałą nazwę `uzdrowisko-v1` (`public/sw.js:1` i `public/sw.js:42-58`), co może przedłużać życie zmienionych plików publicznych. Polecenie `npm audit --omit=dev --json`, uruchomione 13.08.2026, raportowało w zainstalowanym grafie 8 pozycji: 1 critical i 7 high. `react-router-dom`/`react-router` należą do runtime aplikacji; `vite`, `postcss`, `rollup` i `tar` dotyczą głównie build/dev toolchainu, nawet jeśli npm uwzględnił je w grafie po `--omit=dev`. Audit wskazywał `fixAvailable`, ale raport nie zakłada, że poprawka będzie bez breaking changes ani że każda pozycja jest wykorzystywalna w statycznym deploymentcie.

### Dlaczego to ma znaczenie

dotyczy odporności pipeline i jakości technicznej; zbyt krótki cache zwiększa transfer powracających użytkowników.

### Wpływ

Security, Performance, Best Practices.

### Rekomendowane rozwiązanie

osobna, kontrolowana aktualizacja zależności z testami; usunąć potwierdzone nieużywane pakiety; wersjonować cache service workera; ustawić długi immutable cache dla hashowanych assetów, właściwy MIME manifestu i ostrożnie wdrożyć nagłówki (CSP musi uwzględnić Google Fonts, Maps i Facebook/Booksy, jeśli używane).

### Przewidywany wpływ

średni.

### Nakład pracy

średni.

### Ryzyko

średnie.

## P2-06 – metadata social nie są odporne bez JavaScript

### Problem

raw OG jest homepage-only, a `og:image` jest względne; metadata artykułów pojawiają się po JS.

### Dowód

`index.html:18-36`, `og:image="/logo-Uzdrowisko-Marki.webp"`; `Seo.jsx` absolutyzuje dopiero po renderze. Domyślne logo ma około 300 kB i wymiar 3002×3002, zamiast dedykowanej poziomej karty około 1200×630.

### Dlaczego to ma znaczenie

social crawler może wygenerować złą kartę albo kartę homepage dla podstrony.

### Wpływ

Social, CTR, brand, AI referrals.

### Rekomendowane rozwiązanie

prerender route-specific OG/Twitter, absolutne URL-e, dedykowane obrazy kart o właściwych proporcjach i testy Facebook/LinkedIn/X.

### Przewidywany wpływ

średni.

### Nakład pracy

mały po prerenderingu.

### Ryzyko

niskie.

## P2-07 – zewnętrzne zasoby i prywatność nie mają udokumentowanej ścieżki

### Problem

strona łączy się z Google Fonts i osadza Google Maps, ale w repozytorium nie znaleziono strony polityki prywatności, mechanizmu zgód ani opisu przetwarzania. Audyt nie przesądza obowiązku prawnego ani zgodności.

### Dowód

`index.html:98-114`; `src/components/Kontakt.jsx:80-87`; brak trasy polityki w `src/App.jsx:20-27`.

### Dlaczego to ma znaczenie

zasoby stron trzecich mogą przekazywać dane techniczne użytkownika; brak jasnej informacji obniża transparentność i zaufanie.

### Wpływ

prywatność, zaufanie, UX, techniczna jakość.

### Rekomendowane rozwiązanie

właściciel powinien potwierdzić używane usługi i podstawy prywatności; następnie z odpowiednią konsultacją przygotować transparentną politykę oraz, jeśli wymagane, zarządzanie zgodą lub alternatywę click-to-load dla mapy. Nie kopiować generycznego tekstu prawnego bez dopasowania.

### Przewidywany wpływ

średni dla ryzyka i zaufania, niski bezpośrednio dla SEO.

### Nakład pracy

średni.

### Ryzyko

średnie — wymaga decyzji właściciela i właściwej oceny prawnej.

## P3-01 – housekeeping sitemap i head

### Problem

brak prawdziwego `lastmod`, obecne `meta keywords`, generyczny `author="Gabinet Fizjoterapii"`, favicon/apple-touch są WebP.

### Dowód

`public/sitemap.xml`; `index.html:10-15,89-90`.

### Dlaczego to ma znaczenie

niska waga SEO; głównie jakość i kompatybilność. `meta keywords` nie stanowią użytecznego sygnału Google.

### Wpływ

techniczna higiena, social/urządzenia.

### Rekomendowane rozwiązanie

automatyczne i prawdziwe `lastmod`; usunąć niepotrzebne keywords; zweryfikować author i standardowy zestaw favicon/PNG/apple-touch.

### Przewidywany wpływ

niski.

### Nakład pracy

mały.

### Ryzyko

niskie.

---

# Local SEO i Google Business Profile

## Stan publiczny na 13.08.2026

Publiczny, niezalogowany panel odnaleziony przez wyszukanie nazwy firmy w Google Maps 13.08.2026 około 16:55 CEST pokazywał (bez zachowanego stabilnego share URL):

- nazwa: `Uzdrowisko Marki Hanna Nowotczyńska`;
- kategoria widoczna publicznie: `Fizjoterapeuta`;
- adres: Kolejowa 76, 05-220 Zielonka;
- telefon: 510 783 269;
- ocena: 5,0, 18 opinii;
- WWW: wariant `https://www.uzdrowisko-marki.pl/`;
- rezerwacja: Booksy.

To jest pozytywny fundament, ale wyłącznie czasowy snapshot; ocena, liczba opinii i pozostałe pola mogą się zmienić. Nie zastępuje audytu panelu właściciela. Wynik Maps może zależeć od miejsca, języka, czasu i personalizacji.

## Checklist GBP wymagająca dostępu właściciela

- potwierdzić primary i additional categories; nie dodawać kategorii tylko dla słów kluczowych;
- ustawić URL strony bez `www` po wdrożeniu 301;
- potwierdzić adres, pinezkę, telefon, zwykłe i świąteczne godziny;
- sprawdzić, czy stary profil/adres w Markach nie istnieje jako duplikat lub nieoznaczona przeprowadzka;
- potwierdzić obszar działania wizyt domowych;
- zsynchronizować usługi, opisy i ceny z witryną oraz Booksy;
- uzupełnić opis firmy faktami, bez keyword stuffing i obietnic medycznych;
- regularnie dodawać aktualne, własne zdjęcia gabinetu, wejścia i zespołu;
- odpowiadać merytorycznie na prawdziwe opinie, bez ujawniania informacji o zdrowiu pacjenta;
- nie kupować i nie zachęcać warunkowo do opinii;
- zweryfikować link rezerwacji i dodać UTM do URL witryny/rezerwacji, jeśli istnieje analityka;
- monitorować pytania/odpowiedzi i sugestie zmian użytkowników.

## NAP i relacja Marki–Zielonka

Aktualny NAP strony i publicznego GBP jest zgodny. Niespójność dotyczy bardziej znaczenia marki niż adresu: domena i nazwa zawierają Marki, ale gabinet jest w Zielonce. To można rozwiązać komunikacją, nie rebrandingiem:

> Uzdrowisko – gabinet fizjoterapii Hanny Nowotczyńskiej w Zielonce, obsługujący Marki w zakresie [potwierdzona usługa/obszar].

Tekst w nawiasie wymaga potwierdzenia. Nie należy sugerować, że stacjonarny gabinet znajduje się w Markach.

---

# Entity SEO i docelowa architektura danych strukturalnych

## Encje, które muszą być jednoznaczne

1. **Uzdrowisko** — lokalna firma/gabinet, konkretny adres, telefon, godziny i obszar działania.
2. **Hanna Nowotczyńska** — fizjoterapeutka powiązana z gabinetem, z potwierdzonymi kwalifikacjami i zakresem pracy.
3. **Usługi** — każda tylko wtedy, gdy jest aktualnie świadczona i merytorycznie potwierdzona.
4. **Treści** — artykuły autorstwa Hanny lub z jawnym autorem/recenzentem.

## Docelowy `@graph`

- `WebSite` `#website`;
- `MedicalBusiness` `#business` jako bezpieczny typ bazowy; `MedicalClinic` tylko po potwierdzeniu, że termin właściwie opisuje podmiot;
- `Person` `#hanna-nowotczynska`;
- `WebPage` dla każdej trasy, powiązane `isPartOf` i `about`;
- `Service` dla potwierdzonych usług, z `provider` wskazującym firmę/osobę;
- `NewsArticle` dla aktualności, z `headline`, `author`, `datePublished`, prawdziwym `dateModified`, `image`, `mainEntityOfPage`;
- `BreadcrumbList` na głębszych stronach, jeśli breadcrumbs będą widoczne użytkownikowi.

Relacje powinny używać stabilnych `@id`; nie duplikować firmy jako kilku niespójnych obiektów. `sameAs` tylko dla oficjalnych, potwierdzonych profili. `hasMap` może wskazać prawidłową mapę. `areaServed` tylko według faktycznego obszaru.

Nie dodawać:

- własnych anonimowych opinii jako `aggregateRating` firmy;
- niepotwierdzonych nagród, członkostw, kwalifikacji ani specjalizacji;
- schemy usług, których gabinet realnie nie oferuje;
- FAQ wyłącznie dla efektu w SERP.

---

# E‑E‑A‑T i jakość treści zdrowotnych

## Mocne strony

- nazwisko specjalistki jest widoczne w hero i stronie O nas;
- publiczne zdjęcie potwierdzenia prawa wykonywania zawodu i wiele certyfikatów istnieją;
- treść pokazuje podejście, lokalizację, telefon, godziny i cennik;
- wpisy dokumentują przeprowadzkę i rozwój szkoleniowy.

## Braki

- stopień zawodowy, numer PWZFz/status rejestru i kwalifikacje nie są przedstawione jako uporządkowany tekst; numeru nie należy publikować bez decyzji właścicielki;
- nie wiadomo, które z 12 obrazów są unikalnymi kwalifikacjami — część to wersje językowe/duplikaty;
- brak lat praktyki, obszarów szczególnego doświadczenia i informacji, kto odpowiada merytorycznie za treści;
- lista obejmuje m.in. rehabilitację onkologiczną, kardiologiczną, dzieci 10+, uroginekologiczną i opiekę okołoporodową bez szczegółowego opisu kompetencji;
- opinie zawierają zwroty typu „ból zniknął”, „jak magia” i duże zmiany po terapii; brak platformy, daty, zgody i zasad selekcji;
- artykuły nie mają źródeł, autora ani procesu przeglądu.

## Rekomendowany model treści

Każda ważna usługa powinna odpowiadać pacjentowi, a nie robotowi:

- dla kogo jest i czego dotyczy;
- jak wygląda pierwsza konsultacja i kwalifikacja;
- czego można realistycznie oczekiwać;
- kiedy potrzebna jest konsultacja lekarska / kiedy usługa może nie być właściwa;
- kto prowadzi i na jakiej podstawie kompetencyjnej;
- czas, cena, lokalizacja i sposób rezerwacji;
- 4–8 prawdziwych pytań pacjentów;
- data ostatniej weryfikacji.

Nie należy obiecywać wyleczenia ani gwarantowanego wyniku. Treść powinna przejść akceptację Hanny jako osoby odpowiedzialnej merytorycznie.

---

# Content gap i architektura informacji

## Najważniejsze brakujące odpowiedzi

1. Jak wygląda pierwsza wizyta i ile trwa?
2. Jak przygotować się do wizyty i co zabrać?
3. Czy potrzebne jest skierowanie i czy gabinet działa prywatnie/NFZ?
4. Gdzie dokładnie wejść, jak dojechać i gdzie zaparkować?
5. Czy gabinet jest dostępny dla osoby z ograniczoną mobilnością?
6. Jakie obszary obejmują wizyty domowe i jaki jest koszt dojazdu?
7. Czym różnią się fizjoterapia, rehabilitacja, terapia manualna, masaż i chiropraktyka w tej ofercie?
8. Jak wygląda kwalifikacja do drenażu/terapii manualnej/uroginekologicznej?
9. Jak odwołać lub przełożyć wizytę?
10. Kto prowadzi terapię i jakie ma potwierdzone kwalifikacje?

## Zalecana, oszczędna architektura

- `/` — główny lokalny landing: czym jest gabinet, Hanna, Zielonka, najważniejsze usługi, Marki jako potwierdzony obszar, kontakt;
- `/onas` — osoba, kwalifikacje, podejście, opisane certyfikaty;
- `/uslugi` lub obecne `/dlaczego` — hub oferty;
- 2–5 stron najważniejszych usług tylko wtedy, gdy mają własną intencję, realną ofertę i wartościową treść;
- `/cennik` — jedna prawda cenowa;
- trwała sekcja/strona „Pierwsza wizyta / FAQ / Kontakt i dojazd”;
- `/aktualnosci` — tylko merytoryczne, podpisane treści i rzeczywiste aktualności.

Nie tworzyć automatycznie osobnych stron dla każdej kombinacji „usługa × Marki × Zielonka”. Najpierw query × page, oferta i intencja.

---

# Google AI Overviews / AI Mode

Google oficjalnie wskazuje, że podstawą obecności w AI Overviews i AI Mode pozostają zwykłe fundamenty Search: dostępność, indeksacja, pomocna treść, zrozumiałe encje i dane zgodne z treścią. Nie istnieje specjalna „AI schema”, a `llms.txt` nie jest sygnałem Google.

Obecny stan:

- Googlebot ma dostęp;
- 7 URL-i jest zindeksowanych;
- initial HTML jest pusty;
- encja firmy i osoby nie jest poprawnie opisana maszynowo;
- treści usług są zbyt krótkie do bezpiecznej odpowiedzi na wiele pytań;
- wiarygodne kwalifikacje istnieją w obrazach, ale nie w cytowalnym tekście.

Największy wzrost AI readiness dają te same zmiany co SEO: prerendering, poprawne encje, treści Hanny, jawne autorstwo, rzeczywisty NAP, dobrze opisane usługi i lokalne odpowiedzi. Nie potrzeba warstwy „GEO copy”.

---

# ChatGPT Search

- OAI-SearchBot jest dozwolony przez wildcard robots.
- GPTBot jest zablokowany przez Cloudflare; nie jest to przeszkoda dla ChatGPT Search.
- ChatGPT-User ma inny charakter i nie powinien być traktowany jako mechanizm indeksowania.
- HTTP dla UA OAI-SearchBot zwraca 200, ale ten sam pusty app shell co Chrome/Googlebot/Bingbot.
- Canonical i sitemap są dostępne, ale `www` nadal ma 200.

Priorytet dla ChatGPT Search: HTML z realną treścią bez konieczności JS, jednoznaczny `Person` + business, cytowalne fakty o lokalizacji/ofercie/kwalifikacjach i spójne profile zewnętrzne. Nie ma powodu odblokowywać GPTBot, jeśli właścicielka nie chce udostępniać treści do trenowania.

---

# Bing / Copilot

Bingbot jest dozwolony, sitemap jest publiczna, a HTTPS działa. Brakuje potwierdzenia Bing Webmaster Tools i IndexNow. Bing również korzysta z klasycznych fundamentów: crawlable links, canonical, sitemap, treść i autorytet.

Rekomendacja poza repo:

- dodać i zweryfikować domenę w Bing Webmaster Tools;
- zgłosić sitemapę;
- sprawdzić indeksację i błędy hosta;
- po uporządkowaniu publikacji rozważyć IndexNow jako mechanizm powiadamiania o zmianach, nie czynnik rankingowy;
- monitorować, czy Bing renderuje kompletne strony po wprowadzeniu prerenderingu.

---

# Core Web Vitals, performance i mobile

## Lighthouse mobile — laboratorium

Poniższe zakresy pochodzą z dwóch uruchomień Lighthouse 13.08.2026; wynik Performance w obu wyniósł 74, a różnice TBT/Speed Index/TTFB odzwierciedlają naturalną zmienność laboratorium.

| Metryka | Wynik |
|---|---:|
| Performance | 74 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |
| FCP | 2,4 s |
| LCP | 4,8 s |
| Speed Index | 4,0–4,5 s |
| TBT | 110–180 ms |
| CLS | 0 |
| TTI | 4,9 s |
| TTFB | ok. 55–110 ms |

LCP 4,8 s przekracza zalecany próg „dobry” 2,5 s. Brak CrUX oznacza, że nie można stwierdzić, czy produkcja spełnia CWV w 75. percentylu realnych użytkowników ani podać INP.

## Główne źródła kosztu

- `logo-Uzdrowisko-Marki.webp`: ok. 300 kB;
- hero: ok. 86 kB;
- treść ukryta do końca preloadu;
- ok. 43 kB potencjalnie nieużywanego JS i ok. 450 ms oszczędności wg Lighthouse;
- praca main thread ok. 2,7 s;
- brak jawnych `width`/`height` części obrazów;
- render delay LCP ok. 531 ms;
- assety mają cache tylko 4 h;
- `/icons/Kregoslup.webp` i `/icons/ludzik.webp` z homepage preloadu zwracają HTTP 404;
- katalog `public` zawiera około 9,23 MB, a audyt repo wskazał około 3,32 MB plików bez odwołań w aplikacji; przed usunięciem każdy musi zostać zweryfikowany także pod kątem użycia zewnętrznego.

## Hero

Nie rekomenduje się agresywnego pogarszania jakości zdjęcia dla wyniku 100. Hero ma już WebP, responsive `srcset` i preload. Najpierw należy usunąć blokujący preloader, zapewnić `fetchpriority=high` na właściwym żądaniu, rozmiary, odpowiedni wariant dla viewportu i przetestować wizualnie kompresję.

## Mobile UX

Pozytywy: brak overflow przy 390×844, czytelny hero, stabilny layout. Braki: hamburger i social ok. 32×32 px, „Przewiń dalej” ok. 20 px wysokości, część CTA 28–40 px, brak bezpośredniego telefonu/mapy w kluczowej sekcji i brak widocznej na stronie ścieżki Booksy.

---

# Accessibility

Automatyczny wynik 100 nie oznacza zgodności WCAG 2.2. Ręcznie zidentyfikowano:

- brak `<main>` i `<address>`;
- artykuły nie używają `<article>` i `<time>`;
- klikalne `Motion.div` certyfikatów nie są natywnymi buttonami/linkami;
- modal certyfikatów nie ma `role=dialog`, `aria-modal`, focus trap, Escape ani jawnych nazw ikonowych przycisków;
- hamburger nie ma `aria-expanded`/`aria-controls`, a etykieta jest po angielsku;
- małe cele dotykowe;
- dekoracyjne obrazy mają opisowe alty zamiast pustego `alt=""`;
- certyfikaty mają generyczne alty, nie rzeczywisty opis;
- główne nawigacyjne akcje sekcji są buttonami, nie linkami z `href`.

Automatyczne audyty Lighthouse nie wykryły naruszeń kontrastu w testowanym widoku. Nie wykonano jednak pełnej ręcznej macierzy wszystkich stanów i breakpointów, więc nie jest to potwierdzenie zgodności każdego elementu z WCAG. Widoczny focus jest zdefiniowany m.in. dla części linków i logo w navbarze, ale nie da się przejść klawiaturą do klikalnych miniaturek certyfikatów, a ikonowe kontrolki modalu nie mają kompletnej semantyki; dlatego focus/keyboard pozostają otwartym problemem mimo wyniku automatycznego 100.

Zmiany semantyczne poprawią jednocześnie accessibility, SEO, crawlability i machine readability.

---

# Social metadata

Po JavaScript podstrony mają OG/Twitter, ale raw HTML ma wyłącznie domyślne dane homepage. `og:image` jest względne, Twitter image absolutne. Brakuje potwierdzonego, dedykowanego obrazu społecznościowego o proporcjach 1,91:1. Należy generować metadata w prerenderowanym HTML i testować każdą klasę strony, szczególnie artykuły.

---

# TOP 10 zmian całego projektu

Kolejność według oczekiwanego wpływu na widoczność i pozyskiwanie pacjentów, nie łatwości:

1. **Ustalić na podstawie query × page i SERP właściciela intencji „rehabilitacja/fizjoterapia Zielonka” oraz „Marki”, a następnie wzmocnić jedną prawdziwą architekturę lokalną.**
2. **Wymusić jeden host/protokół/slash i prawdziwe 404**, aby skonsolidować sygnały widoczne w GSC.
3. **Prerenderować wszystkie istniejące trasy** wraz z treścią, head, linkami i schema; pozostawić React/Vite.
4. **Zbudować wiarygodny profil Hanny w tekście**: potwierdzone kwalifikacje, zakres, autorstwo, aktualizacje i realistyczne twierdzenia.
5. **Naprawić i rozbudować graf Schema.org** dla firmy, osoby, usług, stron i artykułów.
6. **Usunąć blokowanie treści przez preloadery i obniżyć LCP**, zachowując jakość hero.
7. **Ujednolicić GBP, Booksy, stronę i inne profile**: canonical URL, ceny, usługi, adres, godziny i opis.
8. **Rozwinąć oszczędną architekturę treści usług/FAQ/pierwszej wizyty** według potwierdzonego popytu i kompetencji.
9. **Uprościć mobilną konwersję i pomiar**: tel, trasa, rezerwacja, UTM/eventy po decyzji prywatności.
10. **Poprawić semantykę artykułów i dostępność**, a następnie rozwijać regularne treści eksperckie i lokalne authority.

Prywatność certyfikatów powinna zostać obsłużona natychmiast jako osobny obowiązek redukcji ryzyka, nawet jeśli nie jest zmianą o największym wpływie na pozyskiwanie pacjentów.

---

# Quick wins

- 301 `www → non-www` z zachowaniem ścieżki i query;
- zaktualizowanie URL witryny w GBP na non-www;
- naprawienie dwóch błędnych ścieżek `/icons/...` w preloaderze;
- przekształcenie telefonu w sekcji Kontakt i footerze w `tel:`;
- dodanie linku „Wyznacz trasę” i potwierdzonego linku rezerwacji;
- absolutne OG image i dedykowana karta social;
- poprawienie H1 artykułów, `<article>` i `<time>`;
- tekstowe nazwy/organizatorzy/lata certyfikatów po akceptacji Hanny;
- redakcja daty urodzenia i zbędnych numerów na webowych kopiach certyfikatów;
- `aria-expanded`, większe touch targets i natywne przyciski galerii;
- synchronizacja aktualnych cen z Booksy;
- zgłoszenie/ponowna walidacja sitemap i wykluczeń GSC po wdrożeniu URL normalization.

---

# Zmiany architektoniczne

## Prerendering / SSG

**Rekomendowane.** Osiem adresów jest statycznych i znanych na etapie builda. Każdy powinien mieć gotowy HTML. Dodać test builda, który sprawdza title, canonical, H1, JSON-LD i linki w każdym pliku/URL.

## SSR

**Obecnie nierekomendowany.** Nie ma dowodu, że potrzebny jest serwer dla tak małej, rzadko zmienianej treści. SSR zwiększyłby koszt operacyjny bez przewagi nad SSG.

## Migracja frameworka

**Nierekomendowana.** Vite/React nie są problemem; problemem jest obecna strategia outputu i statusów.

## Routing

- dodać catch-all i serwerowe 404;
- znormalizować host i slash;
- rozważyć czytelniejszy `/uslugi` zamiast `/dlaczego` dopiero z 301 i analizą query × page;
- dla nieistniejącego news `id` zwracać 404, nie indeksowalny placeholder.

## Landing pages

Tworzyć tylko dla odrębnej intencji i kompletnej treści. Najpierw Zielonka jako rzeczywista lokalizacja; Marki wyłącznie jako potwierdzony obszar usługi. Nie rozbijać synonimów „fizjoterapia” i „fizjoterapeuta” na osobne strony.

## Schema graph

Jeden spójny graph, współdzielone `@id`, route-specific WebPage/Article, bez niepotwierdzonych danych i self-serving ratings.

---

# Czego nie rekomenduję

1. Zmiany domeny z `uzdrowisko-marki.pl` na domenę z Zielonką bez pełnej analizy linków, historii, migracji i jednoznacznej przewagi.
2. Migracji do Next.js tylko „dla SEO”.
3. Dodawania `llms.txt` jako czynnika Google — Google oficjalnie go nie wykorzystuje do AI features.
4. Odblokowania GPTBot jako warunku ChatGPT Search — właściwym botem Search jest OAI-SearchBot.
5. Masowego generowania artykułów AI i dziesiątek stron `usługa × miasto`.
6. Tworzenia doorway pages sugerujących gabinet w Markach.
7. Keyword stuffing, rozwijania `meta keywords` albo sztucznego powtarzania lokalizacji.
8. Dodawania fałszywych ratingów, opinii, nagród, kwalifikacji, FAQ lub godzin do schema.
9. Kupowania opinii, linków lub wpisów w przypadkowych katalogach.
10. Traktowania IndexNow jako boostu rankingowego — to mechanizm powiadomienia o URL-ach.
11. Optymalizacji obrazu kosztem wyraźnego pogorszenia jakości tylko dla Lighthouse 100.
12. Automatycznej aktualizacji wszystkich zależności w jednym dużym commicie; każda grupa wymaga testów.
13. Twierdzenia, że każda fraza z wyświetleniami wymaga nowej podstrony.
14. Obietnic typu „100% poprawy”, „najlepszy gabinet” lub gwarancji efektu medycznego.

---

# Informacje potrzebne od właściciela gabinetu

Każdy poniższy punkt ma status **WYMAGA INFORMACJI OD WŁAŚCICIELA**:

1. Pełna, aktualna nazwa marki i podmiotu, preferowany publiczny zapis nazwy.
2. Potwierdzenie prawa wykonywania zawodu i zgoda na sposób jego publicznej prezentacji.
3. Wykształcenie, lata praktyki, aktualne kwalifikacje, ukończone egzaminy i kursy — dokładne nazwy, instytucje, daty.
4. Rozstrzygnięcie statusu ToonyTherapy/egzaminu i zakresu określenia „chiropraktyka”.
5. Które usługi są dziś rzeczywiście świadczone: onkologiczna, kardiologiczna, uroginekologiczna, dzieci 10+, okołoporodowa, drenaż, masaż, wizyty domowe.
6. Czy gabinet jest wyłącznie prywatny i czy w jakimkolwiek zakresie działa w NFZ.
7. Dokładny obszar wizyt domowych, zasady i koszty dla Marek, Zielonki, Warszawy i innych miejsc.
8. Aktualne ceny i jedna nadrzędna lista do synchronizacji z Booksy/GBP.
9. Pełne godziny tygodniowe, święta, zasady rezerwacji/odwołania.
10. Dojazd, wejście, piętro/winda, parking, komunikacja publiczna i dostępność dla osób z ograniczoną mobilnością.
11. Pochodzenie opinii, zgody na publikację, daty i platformy; czy teksty są dosłowne czy redagowane.
12. Zgoda/decyzja dotycząca publikacji certyfikatów; natychmiastowa decyzja o redakcji daty urodzenia i numerów.
13. Dostęp administracyjny do GBP, historia starego adresu/profilu w Markach, kategorie i duplikaty.
14. Oficjalne profile social/branżowe i publiczny profil rejestru zawodowego, które można użyć jako `sameAs`.
15. Dostęp do GSC dla eksportu query × page, query × device, Links i inspekcji URL.
16. Czy istnieją GA4/GTM/Cloudflare Analytics, consent management i jakie konwersje biznesowe mają być mierzone.
17. Najczęstsze prawdziwe pytania pacjentów oraz treści, które Hanna może autorsko przygotować/zatwierdzić.
18. Zgody/licencje do zdjęć gabinetu, osób i materiałów publikowanych na stronie.
19. Jakie usługi stron trzecich są akceptowane (Google Fonts, Maps, Booksy) i kto przygotuje właściwe informacje/politykę prywatności.

---

# Działania poza repozytorium

## Google Business Profile

- wykonać checklistę z sekcji Local;
- zmienić WWW na canonical non-www;
- rozstrzygnąć duplikat/stary adres;
- zsynchronizować Booksy i usługi;
- prowadzić etyczne pozyskiwanie prawdziwych opinii i odpowiedzi;
- zdjęcia wejścia, gabinetu, zespołu i lokalizacji;
- UTM po ustaleniu analityki.

## Google Search Console

- eksport `query × page` i `query × device` dla kluczowych grup;
- inspekcja homepage, `/onas`, `/cennik`, `/aktualnosci` i newsów;
- potwierdzenie zgłoszonej sitemap;
- po wdrożeniach uruchomić walidacje 2 redirectów, 1 alternate canonical i 3 crawled-not-indexed;
- eksport Links i ocena domen odsyłających;
- monitorować 28/90 dni przed i po zmianach, bez mieszania sezonowości.

## Bing Webmaster Tools

- zweryfikować domenę;
- przesłać sitemap;
- sprawdzić indeksację, crawl i backlinks;
- IndexNow rozważyć po uporządkowaniu publikacji.

## Opinie i profile

- nie kupować opinii;
- prosić wszystkich pacjentów neutralnie, bez korzyści za pozytywną ocenę;
- nie ujawniać diagnozy/leczenia w odpowiedziach;
- utrzymywać tylko wartościowe, prawdziwe profile: Google, Booksy, Facebook, ewentualne rejestry branżowe;
- poprawić NAP na wiarygodnych profilach, nie mnożyć wpisów w katalogach.

## Local authority i link building

- relacje z lokalnymi organizacjami, wydarzeniami, klubami i partnerami wyłącznie gdy są realne;
- eksperckie materiały Hanny, które zasługują na cytowanie;
- lokalne media/partnerzy bez kupowania anchorów;
- przed planem linkowym potrzebny eksport GSC Links/Bing lub narzędzie backlinkowe.

---

# ROADMAPA

## Faza 0 – krytyczne błędy i redukcja ryzyka

1. Zredagować publiczne certyfikaty zawierające datę urodzenia/nadmiarowe dane; osobno zdecydować o wartości publicznego numeru zawodowego.
2. Wymusić HTTP/www/slash do jednego canonical URL.
3. Wdrożyć prawdziwe 404 dla nieznanych tras i newsów.
4. Naprawić błędne zasoby `/icons/...`.
5. Zweryfikować osiem URL-i, statusy, canonical, sitemap i brak regresji deep links.

## Faza 1 – quick wins

1. Build-time prerender/SSG ośmiu tras wraz z route-specific HTML, meta, schema oraz prawidłową obsługą 404.
2. Mobile contact: tel, mapa, rezerwacja, większe touch targets.
3. GBP: canonical URL i synchronizacja cen/usług.
4. H1/`article`/`time` w aktualnościach.
5. OG absolutne i dedykowane karty.
6. Podstawowa semantyka `<main>`, `<address>`, aria/menu/modal.
7. Walidacja GSC po normalizacji i prerenderingu.

## Faza 2 – Local + Entity SEO

1. Zebrać dane właściciela i query × page.
2. Ustalić rolę homepage/trwałego landingu dla Zielonki oraz uczciwą stronę/sekcję obsługi Marek.
3. Tekstowy profil Hanny i kwalifikacje.
4. Uzupełnić dane do spójnego JSON-LD graph; publikować go route-specific w prerenderowanym HTML z Fazy 1, nie jako osobną warstwę klientową.
5. GBP categories/services/hours/photos/reviews/duplicates.
6. Zsynchronizować Booksy/Facebook/pozostałe wiarygodne cytowania.

## Faza 3 – content

1. Pierwsza wizyta, dojazd, dostępność, zasady kontaktu.
2. Hub usług.
3. 2–5 stron potwierdzonych usług według GSC i realnej oferty.
4. FAQ z prawdziwych pytań pacjentów.
5. Autorskie, podpisane treści Hanny z datą aktualizacji.
6. Przegląd twierdzeń zdrowotnych i opinii.

## Faza 4 – większe zmiany techniczne

1. Usunięcie blokujących preloaderów; optymalizacja LCP, pamięci podręcznej, obrazów i fontów.
2. Kontrolowane aktualizacje i usunięcie zależności.
3. Nagłówki bezpieczeństwa i poprawny MIME/cache.
4. Wersjonowanie i strategia aktualizacji service workera.
5. Testy Lighthouse + prawdziwy monitoring CrUX po uzyskaniu danych.
6. Ocenić SSR dopiero wtedy, gdy przyszła dynamiczna treść wykaże potrzebę większą niż zrealizowany prerendering.

## Faza 5 – rozwój authority

1. Regularne, użyteczne treści eksperckie zamiast masowej produkcji.
2. Etyczny proces opinii i odpowiedzi.
3. Realne partnerstwa lokalne/branżowe i wartościowe wzmianki.
4. Bing Webmaster Tools/IndexNow i monitoring AI referrals.
5. Kwartalny przegląd GSC, GBP, profili, cen, danych encji i treści YMYL.

---

# Źródła i standardy wykorzystane w ocenie

Źródła sprawdzone 13.08.2026:

- [Google: AI features and your website](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Business Profile: local ranking](https://support.google.com/business/answer/7091)
- [OpenAI crawler overview](https://developers.openai.com/api/docs/bots)
- [Schema.org: Physiotherapy](https://schema.org/Physiotherapy)
- [Schema.org: MedicalBusiness](https://schema.org/MedicalBusiness)
- [Schema.org: MedicalClinic](https://schema.org/MedicalClinic)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [IndexNow documentation](https://www.indexnow.org/documentation)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Publiczny profil Booksy](https://booksy.com/pl-pl/334824_uzdrowisko-marki_fizjoterapia_4283_zielonka)

---

# Wniosek końcowy

Projekt ma realną widoczność, rosnący popyt i publicznie widoczny w chwili testu profil lokalny, więc nie wymaga rebrandingu ani wymiany technologii. Największy wzrost powinien przyjść z połączenia trzech działań: skonsolidowania technicznych sygnałów URL i HTML, dopasowania trwałych stron do potwierdzonej intencji Zielonka/Marki oraz zbudowania weryfikowalnej encji Hanny i gabinetu w treści oraz schema.

Na tym etapie raport nie wdraża żadnej rekomendacji. Każda później zatwierdzona zmiana powinna powstać jako mała, zweryfikowana jednostka z osobnym commitem.
