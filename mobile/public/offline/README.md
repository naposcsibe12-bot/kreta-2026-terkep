# Offline térképréteg

A mobilapp offline térképe PMTiles/vector-tile formátumra van előkészítve.

## Adatforrás
A végleges `kreta.pmtiles` fájlt csak megfelelő licencű vagy saját előállítású vektortérképből szabad létrehozni. Az OpenStreetMap nyilvános tile szerverének tömeges tile-letöltése nem használható erre.

## Ajánlott tartalom
- Kréta teljes területe
- zoom 6–14
- utak és települések
- partvonal és vízfelületek
- turistautak, ahol az adatlicenc engedi
- domborzati réteg, külön adatforrással

A fájl helye: `mobile/public/offline/kreta.pmtiles`.
A repository nem tartalmaz bináris térképadatot, ezért ezt a csomagot build előtt kell előállítani/licencelni.
