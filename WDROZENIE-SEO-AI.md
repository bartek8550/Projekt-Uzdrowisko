# Wdrożenie SEO / Local SEO / AI Search – 2026-08-13

# Executive summary

Zrealizowano uzgodniony zakres bezpiecznych zmian repozytoryjnych bez wymyślania danych medycznych, kwalifikacji, autorstwa, cen lub decyzji prawnych właścicielki. Zachowano React/Vite i obecną domenę. Powstało 20 małych commitów technicznych; ten raport i aneks audytu tworzą osobny finalny commit dokumentacyjny.

Najważniejszy rezultat techniczny: osiem publicznych tras ma pełny statyczny HTML, route-specific metadata i poprawny graf encji, a build tworzy prawdziwą stronę 404. Usunięto blokujące preloadery, naprawiono ścieżki assetów, poprawiono mobile/contact/accessibility, ograniczono ekspozycję danych certyfikatów, wyzerowano znane podatności npm i przygotowano reguły hostingu/cache/nagłówków.

Zmiany nie zostały pushnięte ani wdrożone. Końcowa produkcja nadal serwuje starą wersję z `www=200` i soft 404. Stan „DONE” w tym dokumencie oznacza gotowe i przetestowane w repo, a nie aktywne na domenie.

## Stan Git przed pracą

- branch: `main`;
- working tree: czysty;
- HEAD: `ac0b5b9` (`docs: add complete SEO local and AI visibility audit`);
- `origin/main`: `6641592`;
- po `git fetch --prune origin`: brak nowszych zmian z origin;
- `HEAD...origin/main`: 1 commit lokalny / 0 zdalnych, czyli audyt był jedyną zmianą przed wdrożeniem.

## Analiza dodatkowych eksportów GSC query → page

Siedem eksportów objęło łącznie 4 kliknięcia i 2 418 wyświetleń. Zielonka: 2/1 011, średnia pozycja 4,72; Marki: 2/1 407, średnia pozycja 25,78. Wszystkie kliknięcia trafiły na homepage. Widoczne były warianty HTTP/www/non-www, co wzmacnia potrzebę konsolidacji hosta, ale nie wykazano materialnej kanibalizacji wymagającej nowych URL-i. Pozostawienie homepage jako właściciela ogólnej intencji jest decyzją wdrożeniową do walidacji w SERP/Local Pack i GSC po deployu, nie dowodem optymalnego landingu.

| Zapytanie | Kliknięcia | Wyświetlenia | CTR | Śr. pozycja | Decyzja |
| --- | ---: | ---: | ---: | ---: | --- |
| rehabilitacja zielonka | 1 | 765 | 0,13% | 2,16 | wzmacniać homepage i sprawdzić Local Pack po deployu |
| fizjoterapia zielonka | 1 | 49 | 2,04% | 9,69 | homepage pozostaje właścicielem intencji |
| drenaż limfatyczny zielonka | 0 | 124 | 0% | 14,90 | osobny landing dopiero po treści eksperckiej Hanny |
| fizjoterapeuta zielonka | 0 | 73 | 0% | 10,93 | nie tworzyć strony tylko dla wariantu słowa kluczowego |
| grupy Marki | 2 | 1 407 | 0,14% | 25,78 | komunikować tylko potwierdzone wizyty domowe, bez fikcyjnego gabinetu w Markach |

## Wykonane zmiany

- prerender/SSG ośmiu tras w istniejącym Vite, bez migracji frameworka;
- prawdziwe `404.html`, `noindex` i brak fallbacku SPA dla nieznanych tras/newsów;
- jeden standard URL: HTTPS, non-www, bez `.html` i bez trailing slash dla podstron;
- route-specific title, description, canonical, Open Graph i Twitter w initial HTML;
- dedykowana, wierna materiałom marki karta social 1200×630;
- graf JSON-LD: `WebSite`, `MedicalBusiness`, `Person`, `WebPage`/`ProfilePage`, `Article`, `BreadcrumbList`, stabilne `@id`;
- homepage jednoznacznie opisuje gabinet w Zielonce i wizyty domowe w Markach;
- artykuły: H1, `<article>`, `<time>`, semantyczna treść i metadata;
- mobile: `tel:`, mapa, Booksy, skip link, prawdziwe linki, `<address>`, większe cele dotykowe;
- menu i galerie: Escape, aria state, natywny modal, strzałki, focus restore, live status, reduced motion;
- usunięcie siedmiu skanów w ramach redukcji ekspozycji, w tym skanu z potwierdzoną pełną datą urodzenia;
- poprawiona strategia SW/cache i nagłówki bezpieczeństwa, CSP w trybie Report-Only;
- usunięte nieużywane pakiety i aktualizacja zależności bez `--force`; oba audyty npm = 0;
- zgodne robots/sitemap oraz testy botów wyszukiwarkowych; bez niepotrzebnego `llms.txt` i bez odblokowywania GPTBot;
- kompatybilne ikony PNG dla favicon i Apple touch.

## Commity

| Commit | Zmiana | Test przy zmianie / finalna regresja |
| --- | --- | --- |
| `57c1202` | usunięcie najbardziej wrażliwych skanów z publicznej galerii | inwentaryzacja 12 obrazów, lint/build, kontrola galerii |
| `54ab63a` | poprawa błędnych ścieżek preload ikon | build, brak wskazanych 404 |
| `60dd428` | natychmiastowy render bez globalnego blokowania preloadem | lint/build, Lighthouse mobile |
| `9fde519` | wygaszenie starych i wrażliwych cache SW | test SW i build |
| `40e5af1` | SSG ośmiu tras i dokument 404 | lint/build, test outputu HTML i przeglądarka |
| `61b1b78` | metadata, OG i graf encji | build, parsowanie JSON-LD i unikalność metadata |
| `637c80c` | semantyka stron i artykułów | lint/build, kontrola H1/article/time |
| `92b1d99` | lokalne sygnały Zielonka/Marki oparte o GSC | lint/build, analiza 7 eksportów query→page |
| `cabc538` | CTA telefonu, mapy, Booksy i mobile nav | lint/build, test przeglądarkowy |
| `1b43d7c` | dostępny wspólny lightbox | lint/build, Escape/strzałki/focus restore |
| `3948807` | listy/semantyka/reduced motion i mniej overclaimów | lint/build, kontrola treści |
| `46acf65` | usunięcie nieużywanych zależności i poprawa scope | lint/build, analiza importów |
| `7e8b481` | bezpieczne aktualizacje runtime/build | lint/build, pełny i prod-only npm audit = 0 |
| `23517b2` | jawne aliasy canonical i ochrona 404 | build, test konfiguracji redirectów |
| `2c5ef1f` | cache policy i bazowe nagłówki bezpieczeństwa | build, test `_headers`/SW/manifestu |
| `ad9784a` | testy robots/sitemap/crawler output | build, 12 testów Node PASS |
| `9360116` | priorytet obrazu LCP `/onas` i nieblokujące fonty | lint/build, 3 pomiary Lighthouse po poprawce |
| `6f3dcf0` | `ProfilePage.mainEntity` do encji Hanny | lint/build, test relacji schema |
| `72e70ad` | prawdziwe linki, `<address>` i większe cele kontaktu | lint/build, mobile/menu/dialog regression |
| `5adb6dc` | favicon i Apple touch PNG | lint/build, 13 testów PASS |

Niniejszy plik i końcowy aneks w `AUDYT-SEO-AI.md` są zapisywane jako osobny finalny commit dokumentacyjny; jego hash powstaje dopiero po utworzeniu dokumentów.

## Wyniki przed / po

| Obszar | Przed – produkcja/audyt | Po – lokalne repo | Granica wniosku |
| --- | --- | --- | --- |
| Initial HTML | wspólny pusty app shell ok. 5,3 kB | 8 prerenderów z treścią, H1, metadata, linkami i JSON-LD | wymaga deployu |
| Nieznane URL-e | HTTP 200, soft 404 | `404.html`, noindex, brak canonical/schema i reguły statusu 404 | status serwera potwierdzić na deploy preview/produkcji |
| Host | HTTPS www i non-www oba 200 | reguły jednego hopu do HTTPS non-www | produkcja nadal stara |
| Schema | błędne `Physiotherapy` jako typ firmy | spójny, parsowalny graf encji na 8 trasach | bez wymyślonych usług, autora i kwalifikacji |
| Social | względny OG, homepage-only | absolutne route-specific OG/Twitter i obraz 1200×630 | odświeżyć cache social po deployu |
| Zależności | 1 critical + 7 high w bazowym audycie | pełny i `--omit=dev`: 0 podatności | breaking major upgrades świadomie nie wykonane |
| Lighthouse home | Performance 74, FCP 2,4 s, LCP 4,8 s, TBT 110–180 ms, CLS 0 | finalny lokalny run: 86, FCP 3,09 s, LCP 3,20 s, TBT 0, CLS 0; seria lokalna po zmianach: Performance 85–97 | inne środowisko niż produkcja; nie jest to CrUX |
| Lighthouse `/onas` | brak reprezentatywnego wyniku bazowego w audycie | po wykryciu lazy LCP: z 67/LCP 6,09 s do finalnych 95/LCP 2,93 s | lokalny pomiar laboratoryjny |
| A11y/SEO Lighthouse | 100/100 | 100/100 na home i `/onas` | BP 96 przez błąd ładowania zewnętrznego zasobu w ograniczonym środowisku Lighthouse |

## Walidacja końcowa

- `npm run lint`: PASS;
- `npm run build`: PASS;
- Node/HTML/SW: 13/13 PASS;
- `npm audit`: 0 podatności;
- `npm audit --omit=dev`: 0 podatności;
- 8 publicznych tras: HTTP 200 w lokalnym preview, jeden H1, pełne title/description/canonical, jeden poprawny JSON-LD, jeden `<main>`, brak pustego shellu;
- 8 tras w Chrome mobile 390×844: brak błędów hydracji/aplikacji i poziomego overflow;
- mobile menu: poprawne hidden/`aria-expanded`, Escape zamyka;
- dialog certyfikatów: modal otwiera się na przycisku zamknięcia, strzałka zmienia element, Escape zamyka i oddaje focus;
- requesty artykułów: brak 4xx i request failures w finalnym teście;
- Lighthouse mobile finalny: home 86/100/96/100, `/onas` 95/100/96/100 (Performance/Accessibility/Best Practices/SEO).

Lighthouse na Windows zapisał kompletne raporty, po czym zwracał warning `EPERM` podczas sprzątania własnego katalogu tymczasowego. Metryki są kompletne; warning nie pochodzi z aplikacji.

## Structured data

Automatycznie zweryfikowano każdy wygenerowany blok: poprawny JSON, jeden blok na trasę, brak zduplikowanych `@id`, zgodne relacje WebPage–Article, BreadcrumbList, Person–MedicalBusiness i `ProfilePage.mainEntity`. Nie dodano ratingów, review count, nagród, numerów zawodowych, chorób ani niepotwierdzonych usług. Brak autora i dat publikacyjnych jest świadomym blockerem, a nie zgadywaną wartością.

Do kontroli użyto aktualnych wytycznych [Google ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Google Article](https://developers.google.com/search/docs/appearance/structured-data/article) i modelu [Schema.org](https://schema.org/docs/datamodel.html). Po deployu należy dodatkowo użyć testu Rich Results/Schema Markup Validator na publicznych URL-ach.

## Blockery – WYMAGA INFORMACJI OD WŁAŚCICIELA

1. Potwierdzone, bezpieczne do publikacji kwalifikacje Hanny: stopień/tytuł, nazwy kursów, organizatorzy, lata, zakres kompetencji i ewentualny link do właściwego rejestru.
2. Decyzja, czy pozostawić publiczny identyfikator zawodowy i numery certyfikatów na obrazach 1/8/9/11/12; nie są automatycznie „zbędne”, ale wymagają świadomej decyzji.
3. Autor, recenzent, rzeczywiste `datePublished` i `dateModified` artykułów.
4. Wyjaśnienie niespójności: wpis z 2025 mówi o ukończeniu szkolenia TT, a wpis z 2026 o przygotowaniu do egzaminu ToonyTherapy Basic.
5. Źródło prawdy dla usług, cen i godzin oraz zatwierdzona treść ekspercka dla ewentualnych landingów drenażu/Toony/masażu.
6. Źródło, zgody i sposób prezentacji opinii oraz decyzja o zbyt mocnych twierdzeniach o efektach.
7. Decyzja prawna/prywatnościowa: polityka prywatności, Google Fonts, osadzona mapa, cookies/CMP i narzędzie analytics.
8. Decyzja, czy i jak mierzyć kliknięcia telefonu, mapy, Booksy i kontaktu; kod nie instaluje automatycznie GA4/GTM.

## Dane certyfikatów i historia Git

Usunięcie plików z lokalnego bieżącego drzewa ograniczy ekspozycję strony dopiero po pushu i deployu. Przed pushem pliki są bezpośrednio dostępne w bieżącym drzewie `origin/main`; produkcja/CDN także nadal je serwują. Po pushu wcześniejsze wersje pozostaną w historii, ewentualnych forkach i cache. Pełne ograniczenie wymaga:

1. szybkiego push/deploy bieżącego drzewa i purgu Cloudflare;
2. osobnej, zatwierdzonej operacji `git-filter-repo` obejmującej wszystkie refs;
3. force push, koordynacji klonów/forków i ewentualnego zgłoszenia do GitHub Support/cache cleanup zgodnie z [instrukcją GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

History rewrite nie został wykonany, ponieważ jest destrukcyjny, zmienia publiczną historię i wymaga jednoznacznej zgody właściciela.

## Zmiany wymagane poza repozytorium

### Hosting i Cloudflare

1. Utworzyć deploy preview z bieżącego brancha; ustalić aktywny łańcuch DNS → Cloudflare → Netlify/Apache.
2. Przetestować GET, nie tylko HEAD: 8 canonicali = 200; `.html`/`index` = jeden 301; slash = 301 do bez-slash; dwa losowe URL-e i nieznany news = 404 z treścią 404.
3. Zweryfikować HTTP non-www, HTTP www, HTTPS www i HTTPS non-www wraz z path/query; każdy wariant ma trafić jednym hopem na `https://uzdrowisko-marki.pl`.
4. Potwierdzić `_headers` albo odpowiednik Apache: HSTS, nosniff, framing, referrer, permissions, CSP Report-Only; po okresie obserwacji i braku naruszeń rozważyć CSP enforcing.
5. Dodać Cloudflare Cache Rule BYPASS/no-store dla `/sw.js`; HTML revalidate; `/assets/*` immutable; następnie purge całego cache po deployu, szczególnie `/HannaNow/*`, HTML, manifest i SW.
6. Nie włączać HSTS preload/includeSubDomains przed audytem wszystkich subdomen.

### GBP, Booksy i Facebook

1. W GBP ustawić bezpośredni URL `https://uzdrowisko-marki.pl/`, nie `www`; sprawdzić adres, telefon, godziny, kategorię, usługi i rezerwację.
2. Uzgodnić jeden cennik i nazwy usług. Publiczny [profil Booksy](https://booksy.com/pl-pl/334824_uzdrowisko-marki_fizjoterapia_4283_zielonka) potwierdza nazwę/adres, ale część cen i nazw różni się od strony; nie zmieniono ich bez decyzji Hanny.
3. Ujednolicić NAP oraz URL w Facebooku i innych katalogach. Nie dodawać ratingów z profili do własnego JSON-LD.

### GSC, Bing i social

1. Po deployu zgłosić `https://uzdrowisko-marki.pl/sitemap.xml`, wykonać inspekcję wszystkich 8 canonicali i walidację problemów duplicate/soft 404/crawled-not-indexed.
2. Sprawdzić zmianę hosta dla URL-i `www` i HTTP; nie usuwać ich ręcznie zamiast prawidłowego 301.
3. W Bing Webmaster Tools przesłać sitemapę i sprawdzić URL-e. IndexNow jest opcjonalnym mechanizmem powiadamiania, nie boostem rankingowym.
4. Odświeżyć karty w debuggerach Facebook/LinkedIn/X.
5. Robots repo pozwala Googlebot, Bingbot i OAI-SearchBot przez wildcard. Nie odblokowano GPTBot, bo nie jest warunkiem ChatGPT Search; produkcyjna warstwa Cloudflare może nadal dopisywać własne reguły `Content-Signal`.

## Zależności pozostawione świadomie

Końcowe `npm outdated` pokazuje dostępne nowsze wersje, w tym breaking majors (m.in. Vite 8, ESLint 10, Framer Motion 13, Lucide 1, plugin React 6). Nie aktualizowano ich bez potrzeby po osiągnięciu 0 podatności, ponieważ nie rozwiązują problemu audytu, a wymagają osobnej migracji i testów. To backlog utrzymaniowy, nie otwarta podatność.

## Sitemap i daty

Sitemap zawiera dokładnie osiem canonicali, bez www, redirectów, 404 i noindex. Nie dodano `lastmod`, ponieważ repo nie ma wiarygodnych dat modyfikacji dokumentów. Daty widoczne przy newsach opisują wydarzenie/szkolenie i nie zostały arbitralnie uznane za datę publikacji.

## Co obserwować po wdrożeniu

### Po 7 dniach

- statusy 8 URL-i, redirecty i 404 w logach/GSC;
- błędy renderowania, Core Web Vitals lab, naruszenia CSP Report-Only;
- działanie telefonu, mapy i Booksy na mobile;
- brak dostępności usuniętych certyfikatów i brak starego SW/cache.

### Po 28 dniach

- query→page, CTR i landing dla: rehabilitacja/fizjoterapia/fizjoterapeuta Zielonka, drenaż limfatyczny Zielonka oraz trzy grupy Marki;
- host/protokół w raportach GSC;
- crawled-not-indexed i wybrany canonical;
- rezerwacje/kontakty, jeśli właściciel zatwierdzi pomiar.

### Po 90 dniach

- trend kliknięć, impressions, CTR i pozycji względem równoważnego okresu;
- czy homepage utrzymał właściciela ogólnej intencji lokalnej;
- decyzja o jednej lub kilku stronach usług wyłącznie na podstawie popytu, realnej oferty i treści eksperckiej;
- kwartalna synchronizacja strony, GBP, Booksy, Facebook i danych encji.

Nie należy oczekiwać natychmiastowej zmiany pozycji po deployu ani interpretować Lighthouse jako danych CrUX.
