import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifestPath = resolve(root, 'public/offline/map.json');
const mainPath = resolve(root, 'src/main.ts');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const required = ['version', 'id', 'filename', 'format', 'minzoom', 'maxzoom', 'region', 'sourceLayers', 'attribution'];
for (const key of required) if (!(key in manifest)) throw new Error(`Missing manifest field: ${key}`);
if (manifest.format !== 'pmtiles') throw new Error('Offline format must be PMTiles');
if (!Array.isArray(manifest.sourceLayers) || manifest.sourceLayers.length === 0) throw new Error('sourceLayers must be non-empty');
if (manifest.minzoom > manifest.maxzoom) throw new Error('Invalid zoom range');
const expected = resolve(root, 'public/offline', manifest.filename);
if (!existsSync(expected) || statSync(expected).size < 1024) {
  throw new Error(`Offline PMTiles is missing or invalid: ${manifest.filename}. Run npm run prepare:offline first.`);
}
const source = readFileSync(mainPath, 'utf8');
if (!source.includes('offline/map.json')) throw new Error('Runtime does not load the offline manifest');
if (!source.includes('manifest.filename')) throw new Error('Runtime does not use manifest filename');
console.log(`Offline manifest OK: ${manifest.region}, zoom ${manifest.minzoom}-${manifest.maxzoom}`);
console.log(`Offline PMTiles present: ${manifest.filename} (${statSync(expected).size} bytes)`);
