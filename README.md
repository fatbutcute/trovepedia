# Webalkalmazás Projekt - Trovepedia
## Név: Varga Áron Gábor
### Neptun-kód: EWD5F3
* Email-cím: vargaarongabor@gmail.com
* Teams név: vargaarongabor

### Github Repo:
https://github.com/fatbutcute/trovepedia/tree/main



# Trovepedia

A **Trovepedia** egy modern, nem hivatalos, közösségvezérelt webalkalmazás a Trove című játékhoz. A célja, hogy a kezdő és veterán játékosok számára egyaránt naprakész útmutatókat, karakterosztály-bázist, eseményrotációkat és kalkulátorokat biztosítson egyetlen, lenyűgöző felületen.

## Hogy áll most a weboldal?

Jelenleg még fejlesztés alatt van, hiszen ez a legnagyobb projektem eddig, ráadásul az első React alapú weblapom, még bőven van mit fejlődni. Jelenleg az oldal jobb felső navigációban az alábbi oldalak működnek:


**Guides**: Itt találhatjuk meg az éppen aktív útmutatókat (*egyelőre itt is csak a design van megoldva, kattinthatóság, lényeges tartalom még nem elérhető ha bármelyik útmutatóra kattintunk (ha rákattintunk akkor csak szimplán bejön egy Placeholder oldal.)*)


**Classes**: Itt találhatóak a játékban jelen lévő karakterek leírásai (*szintúgy, mint a Guides oldalon, lényeges tartalom itt sincs, de a design, kattinthatóság megy + a Placeholderek.*),


**Delve Index**: Ez felel a játékban található, Depths nevű biome-ban található szobák kilistázására, ami egy json-t használ (*Fetcheli az adatot egy másik weboldalról*),

## Főbb Funkciók

*   **Továbbfejlesztett Főoldal:** Letisztult, szekciókra bontott kezdőlap egyedi kártyás navigációval (Features) és beépített scroll-reveal animációkkal.
*   **Immerzív Osztályválasztó (Classes Page):** Egy igazi, videojátékokat idéző karakterválasztó képernyő. 
    *   Teljes képernyős, upscalelt (eredeti képek minősége rossz volt, ezért upscalelő AI-t kellett alkalmaznom) háttérképek minden karakterhez.
    *   Alul elhelyezkedő "szalag" menü a gyors és látványos navigációért.
    *   Egyedi "morphing" háttér-átmosódás animáció, amely dinamikusan igazodik a különböző felbontású hátterekhez.
    *   Egyedi `useTypewriter` hook, ami stílusos írógép-effektussal jeleníti meg a karakterek leírását.
*   **Dinamikus Helykitöltők (Placeholders):** A még fejlesztés alatt álló menüpontok (pl. Fishing, Calculators) egyedi, helyi ikonokkal ellátott, esztétikus placeholder oldalakra vezetnek.

## Technikai Kiemelések & Optimalizáció

A fejlesztés során kiemelt figyelmet fordítottam a teljesítményre és a felhasználói élményre (UX):

*   **Ultra-gyors Képbetöltés (Preloading):** A nagy felbontású háttereket és karakter-rendereket egy egyedi JavaScript előtöltő (preloader) kód húzza be a böngésző memóriájába a háttérben. Ennek köszönhetően a karakterek közötti váltás 100%-ban akadásmentes és azonnali.
*   **WebP Optimalizáció:** A masszív PNG/JPG fájlok modern `.webp` formátumra lettek cserélve (1-2 helyen lehetnek még .png/.jpg formátumok, de azok nem a nagyon lényeges oldalakon vannak, így a projekt képállományának mérete drasztikusan (több mint 95%-kal) csökkent, villámgyors szerveroldali kiszolgálást biztosítva.
*   **React Router DOM:** Sima, oldalújratöltés nélküli navigáció a különböző modulok (Guides, Classes, Delve, Rotations, stb.) között.

## Használt Technológiák

*   **Frontend Framework:** React (Vite környezetben)
*   **Routing:** React Router DOM v6
*   **Stílus:** Tiszta CSS3 (fejlett animációk, flexbox, CSS Grid, egyedi változók és átmenetek)
*   **Média:** WebP és néhány helyen PNG képformátum a maximális minőségért és minimális méretért.

## Használt mesterséges intelligenciák és azok használati demonstrációjai (melyik AI mire volt éppen használva):

* **Gemini**: A projekt készítésbe közben, ha valamilyen komolyabb script-re volt szükségem, a Gemini-t használtam.
* **ChatGPT**: Nagyjából csak olyan helyeken volt használva, ahol hirtelen kellett valami apró hibára választ kapnom (ha pl. egy olyan problémával küszködtem, amit már egy ideje próbáltam megoldani).
* **Claude**: Nagyon az elején, amikor kipattant a fejembe ez az egész webalkalmazás, na akkor próbáltam ki a Claude-ot életembe először, hogy mit tud. Lényegében az elején az egész oldal alapját generálta meg, azóta nem használtam. Az elején kértem meg, hogy magyarázza el nagyvonalakban, hogy mégis hogy működik a React, a Vite, a Vercel/Netlify szolgáltatók, a React iránt való valamennyi tudásomat a Claude által adott információkból tudom, meg persze alkalmankénti utánanézésekből, hiszen a React, mint script nyelv, stb. ezek nekem új terep, ezért volt bőven átnéznivalóm.

## Mappa Szerkezet (Kiemelt részek)

```text
├── public/
│   ├── classbg/       # A karakterek nagy felbontású (WebP) háttérképei
│   ├── classes/       # A kivágott (render) karakterképek
│   └── icons/         # A navigációhoz és helykitöltőkhöz használt egyedi ikonok
├── src/
│   ├── components/    # Újrahasznosítható (bármely aloldalon felhasználható) UI elemek (Navbar, Features, Footer stb.)
│   ├── pages/         # Fő oldalak (Home, ClassesPage, PlaceholderPage stb.)
│   ├── hooks/         # Egyedi React Hook-ok (pl. useReveal, useTypewriter)
│   ├── App.jsx        # Fő belépési pont és Router konfiguráció
│   └── index.css      # Globális stílusok és animációk
