# Kréta 2026 — iOS build

## Local build

```bash
cd mobile
npm ci
npm run check
npm run sync
npx cap open ios
```

In Xcode, select an iPhone simulator or a connected iPhone and build with the `App` scheme.

## CI

The repository workflow builds an unsigned iOS Simulator `.app` and publishes it as a GitHub Actions artifact.

A physical iPhone build requires Apple code signing (Apple Developer team, certificate and provisioning profile). These credentials are intentionally not stored in the repository.

## Offline map

The app runtime supports a bundled PMTiles vector map at `public/offline/kreta.pmtiles`. The repository currently contains the manifest and loader, but the binary map package must be supplied from a licensed/self-generated OSM-compatible source before an offline-map release is declared complete.

The offline map must include attribution for OpenStreetMap contributors and comply with the source dataset's licence and distribution terms.
