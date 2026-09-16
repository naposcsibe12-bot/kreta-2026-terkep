# Kréta 2026 – mobilapp fejlesztési prompt

## Cél
A meglévő `kreta-2026-terkep` online webalkalmazás megtartása mellett készüljön valódi iOS/Android mobilalkalmazás. Az online felület és a mobilapp ugyanazt a POI- és útiterv-logikát használja, de a mobilapp utazás közben offline is használható.

## Alapelv
Ne készíts egyszerű webview-csomagolást. A mobilapp legyen valódi, mobilra optimalizált alkalmazás, amelyben a térkép, GPS, offline adatok és napi útiterv első osztályú funkciók.

## Meglévő webes rendszer
- `index.html`: teljes krétai látnivaló-térkép és POI-adatbázis
- `tervezo.html`: D1–D14 tervező
- `ajanlo.html`: intelligens, szabályalapú napi programajánló
- `app.html`: egységes online felület
- `sw.js`: jelenlegi PWA cache
- GitHub Pages: `https://naposcsibe12-bot.github.io/kreta-2026-terkep/`

## Utazás
2026.09.25–2026.10.08., 14 nap.
Bázisok: Kolymvari, Chora Sfakion, Selakano, Sitia/Papoura környéke, Rethymno.
Minden napi útvonal az adott napi szállásbázistól indul; D14 végpontja Chania repülőtér.

## Mobilapp főképernyők
1. Térkép
2. Mai nap
3. Tervező D1–D14
4. Ajánló
5. Útvonal
6. Beállítások / offline térképek

## Térkép
- valódi vektoros térképmotor, MapLibre Native vagy azzal egyenértékű megoldás
- utak, települések, partvonal, domborzat, turistautak és POI-rétegek
- kategória-rétegek ki/be kapcsolása
- saját Kréta POI-k
- klaszterezés sok POI esetén
- POI-adatlap koppintásra
- aktuális GPS-pozíció kék ponttal
- pontossági kör
- követés mód
- iránytű/haladási irány, ahol az eszköz biztosítja
- „Saját helyzet” gomb

## GPS
- engedélykérés érthető magyar szöveggel
- foreground helyzetkövetés
- utazás közben folyamatos pozíciófrissítés
- GPS kikapcsolása esetén az app maradjon használható
- pozíciót ne küldje szerverre alapértelmezés szerint
- hibás/gyenge pontosságot jelezze

## Offline mód
A felhasználó még indulás előtt tölthesse le Kréta térképrégióját.
Az offline csomag tartalmazza:
- vektoros térképet
- szükséges zoomszinteket
- saját POI-adatbázist
- szállásbázisokat
- D1–D14 útiterveket
- mentett sorrendet
- ajánlóhoz szükséges szabályokat

Az offline térkép ne az OpenStreetMap nyilvános tile-szerverének tömeges letöltésére épüljön. Használj megfelelő licencű offline tile/vector-tile szolgáltatót vagy saját előállítású adatcsomagot.

## Útvonal
- napi indulás az adott szállásbázistól
- kiválasztott megállók sorrendje
- térképen összekötött útvonal
- D14 végpont: Chania International Airport
- légvonalas optimalizálás csak előrendezésként használható; navigációs útvonalat közúti útvonaltervező adjon
- offline módban legalább a mentett útvonal és pontok legyenek láthatók
- online módban külső navigáció is indítható

## Intelligens napi program
Bemenetek:
- nap D1–D14
- időjárási forgatókönyv
- vezetési tolerancia
- rendelkezésre álló idő
- tempó
- érdeklődési kategóriák
- már meglátogatott / már betervezett helyek

Kimenet:
- koherens egész napos program
- 2–4 fő megálló
- kategória-diverzitás
- földrajzi klaszterezés
- minimális felesleges vezetés
- pihenő/ebéd hely javaslata
- visszatérés a szállásra, D14 esetén reptér

Legyenek: „Nap összeállítása”, „Újratervezés”, „Megálló zárolása”, „Hozzáadás a tervhez”, „Miért ezt ajánlja?” funkciók.

## Online webapp
A meglévő webes felületet nem szabad megszüntetni vagy lecserélni. A fejlesztés végén továbbra is működjön:
- `app.html`
- teljes térkép
- tervező
- ajánló
- útvonalnézet
- PWA/offline webes működés

Ha a mobilapp adatmodellje fejlődik, a webapp kapjon kompatibilis frissítést.

## Adatmodell
Legyen közös, verziózott JSON-adatmodell, például `data/kreta.json`, amelyből a web és a mobilapp is dolgozhat. POI mezők:
- id
- name
- lat
- lon
- category
- subcategory
- base
- recommendedDays
- difficulty
- duration
- driveLoad
- weatherSuitability
- description
- tags

Az adatok legyenek Unicode-normalizáltak.

## Technológiai javaslat
Elsődleges irány: Capacitor vagy natív MapLibre-alapú iOS/Android megoldás. Ha cross-platform technológia gyorsabban ad stabil eredményt, használható Flutter vagy React Native is, de a térképnek natív/offline képességűnek kell lennie.

## Tesztelés
A fejlesztés nem tekinthető késznek pusztán a forráskód elkészítésével.
Ellenőrizd:
1. TypeScript/JavaScript lint és build
2. JSON séma és adatduplikációk
3. D1–D14 betöltés
4. GPS engedélykérés és pozíciómegjelenítés
5. térképrétegek ki/be kapcsolása
6. POI keresés
7. napi terv mentése és visszatöltése
8. offline indulás
9. offline térképadat betöltése
10. útvonal megjelenítése
11. D14 reptéri végpont
12. ajánló működése minden időjárási/vezetési kombinációban
13. iPhone kis képernyő és nagyobb betűméret
14. Android képernyő
15. online webapp regressziós ellenőrzése
16. service worker cache frissítés

## Elfogadási kritérium
A projekt csak akkor legyen „KÉSZ”, ha:
- az online felület változatlanul elérhető és működik;
- a mobilapp buildelhető;
- a térkép valódi térképi rétegeket jelenít meg;
- GPS-pozíció megjelenik a térképen megfelelő engedéllyel;
- az offline csomag telepíthető és internet nélkül betölthető;
- D1–D14 terv működik;
- az intelligens napi ajánló működik;
- a fő funkciók automatizáltan teszteltek;
- a build hibamentes.

## Fontos
Ne állítsd késznek a projektet olyan funkcióra hivatkozva, amelyet csak forráskódban deklaráltál, de builddel vagy teszttel nem ellenőriztél. Ha valódi iOS/Android buildhez Apple/Google aláírás vagy külső szolgáltatás kell, azt dokumentáld külön.
