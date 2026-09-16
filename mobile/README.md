# Kréta 2026 Mobile

Natív iOS/Android shell Capacitor + MapLibre alapokon. Az online webapp külön továbbra is működik.

## Fejlesztői indítás

```bash
cd mobile
npm install
npm run build:web
npx cap add ios
npx cap add android
npx cap sync
```

Ezután Xcode/Android Studio segítségével indítható a natív projekt.

## Térkép és offline stratégia

A mobil kliens MapLibre-t használ. A végleges offline térképrégiót licencelt vector-tile/PMTiles adatcsomagként kell a `mobile/public/maps/` alá helyezni, majd a stílusban erre átállni. A nyilvános OSM tile szerver tömeges előtöltése nem használható offline cache forrásként.

A jelenlegi mobil shell online OSM raster fallbacket használ fejlesztési célra. Ez nem tekintendő a végleges offline térképnek.

## GPS

A `@capacitor/geolocation` natív helymeghatározást használ. A webes fallback `navigator.geolocation`.

## Online felület

A webes alkalmazás változatlanul a GitHub Pages címen marad elérhető:

https://naposcsibe12-bot.github.io/kreta-2026-terkep/app.html

## Készültségi állapot

- [x] mobil projektváz
- [x] MapLibre térképmotor
- [x] GPS pozíciókezelés
- [x] online/offline hálózati állapot kijelzése
- [x] Capacitor iOS/Android célplatform
- [x] teljes fejlesztési specifikáció (`../MOBILAPP_PROMPT.md`)
- [ ] licencelt, teljes Kréta offline vector-tile csomag beemelése
- [ ] natív iOS/Android CI build és eszközteszt
- [ ] App Store / Google Play kiadás

A „kész” státusz csak az utolsó három pont ellenőrzése után adható ki.
