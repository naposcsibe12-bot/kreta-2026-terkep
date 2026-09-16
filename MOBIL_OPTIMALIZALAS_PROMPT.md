# Kréta 2026 – mobiloptimalizálási fejlesztési prompt

Fejleszd tovább a `naposcsibe12-bot/kreta-2026-terkep` GitHub Pages alkalmazást úgy, hogy elsődlegesen iPhone Safari és Android mobil képernyőn legyen gyors, áttekinthető és egy kézzel is használható.

## Kötelező célok
- A meglévő teljes térkép, napi tervező és útvonalterv funkciók maradjanak meg.
- A 14 nap minden útvonala mindig az adott napi szállásbázistól induljon.
- A napi programpontok sorrendje maradjon módosítható.
- Mobilon ne legyen szükség vízszintes görgetésre.
- A fő navigáció legyen nagy, jól megérinthető, lehetőleg alsó/sticky mobil navigációval.
- A route panel mobilon teljes képernyős, kártyás és könnyen görgethető legyen.
- A navigációs gombok közvetlenül Google Mapshez nyíljanak.
- Legyen jól látható „🏠 Szállásról indulás” és „🏠 Vissza a szálláshoz” végpont.
- D14 esetén a Chania repülőtér legyen külön, kiemelt végpont.
- A terv maradjon localStorage-ban, és legyen megosztható/exportálható.

## UX
- Minimum kb. 44 px érintési célméret.
- iPhone safe-area (`env(safe-area-inset-bottom)`) támogatás.
- Sticky fejlécek és navigáció, de ne takarják ki a térképet vagy a kártyák tartalmát.
- A hosszú listák ne nyomják ki az egész oldalt; belső görgetés legyen.
- Mobilon egyszerűsített tipográfia, rövid metaadatok, nagyobb elsődleges gombok.
- A napi választó D1–D14 mobilon két sorban vagy vízszintesen görgethető chipként működjön.
- Legyen gyors „Útvonal” és „Tervező” elérés.
- A felület legyen használható gyenge mobilnet mellett is; ne vezess be felesleges külső függőséget.

## Funkcionális fejlesztések
- Napi útvonal kártyák: szállás → 1. pont → 2. pont → … → szállás.
- Egyetlen gombbal lehessen megnyitni az adott napi teljes Google Maps útvonalat, ha a pontok száma ezt lehetővé teszi.
- Legyen „Megosztás” gomb a Web Share API-val, fallbackként másolással.
- Legyen „Terv exportálása” JSON formátumban.
- A tervező és az útvonal nézete között a localStorage állapot automatikusan szinkronizálódjon.
- A térkép mobilon ne takarja el a vezérlőket; a panel zárható legyen.
- Ha egy funkció nem támogatott Safari alatt, legyen kulturált fallback.

## Technikai elvek
- Vanilla HTML/CSS/JS maradjon, ha nincs erős ok keretrendszer bevezetésére.
- Ne töröld a meglévő POI-adatbázist.
- Ne változtasd meg a meglévő fájlneveket és URL-eket.
- Ellenőrizd a mobil viewportot, safe-area paddingot, touch-actiont és `100dvh` használatát.
- Kerüld a túl agresszív `setInterval` frissítést; eseményalapú frissítés előnyben.
- A GitHub Pages működését tartsd meg.
- A végén ellenőrizd a fő URL-eket és a JavaScript hibákat.

## Tesztlista
1. iPhone álló nézet.
2. iPhone fekvő nézet.
3. Android álló nézet.
4. D1–D14 váltás.
5. Szállásbázis → POI navigáció.
6. POI → POI navigáció.
7. POI → szállás visszaút.
8. D14 → Chania repülőtér.
9. localStorage mentés és újratöltés.
10. Megosztás/export működése.
11. Térkép és tervező közötti váltás.
12. Semmilyen meglévő látnivaló vagy napi terv ne vesszen el.
