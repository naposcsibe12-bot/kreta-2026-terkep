import maplibregl from 'maplibre-gl';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';
import { Protocol } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';

type OfflineManifest = {
  version: number;
  id: string;
  filename: string;
  format: string;
  minzoom: number;
  maxzoom: number;
  region: string;
  status: string;
  sourceLayers: string[];
  attribution: string;
};

const status = document.querySelector('#status')!;
const network = document.querySelector('#network')!;
const offline = document.querySelector('#offline')!;
const offlineDetail = document.querySelector('#offline-detail')!;
const protocol = new Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

const assetUrl = (path: string) => new URL(path, document.baseURI).toString();

async function loadOfflineManifest(): Promise<OfflineManifest | null> {
  try {
    const response = await fetch(assetUrl('offline/map.json'), { cache: 'no-store' });
    if (!response.ok) throw new Error(`manifest ${response.status}`);
    return await response.json() as OfflineManifest;
  } catch {
    return null;
  }
}

async function hasOfflineMap(manifest: OfflineManifest | null): Promise<boolean> {
  if (!manifest || manifest.format !== 'pmtiles') return false;
  try {
    const response = await fetch(assetUrl(`offline/${manifest.filename}`), {
      method: 'HEAD',
      cache: 'no-store'
    });
    return response.ok;
  } catch {
    return false;
  }
}

function baseStyle(): maplibregl.StyleSpecification {
  return {
    version: 8,
    sources: {},
    layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#eef3f5' } }]
  };
}

function offlineStyle(manifest: OfflineManifest): maplibregl.StyleSpecification {
  const source = `pmtiles://${assetUrl(`offline/${manifest.filename}`)}`;
  const has = (name: string) => manifest.sourceLayers.includes(name);
  const layers: maplibregl.LayerSpecification[] = [
    { id: 'background', type: 'background', paint: { 'background-color': '#eef3f5' } }
  ];
  if (has('water')) layers.push({ id: 'water', type: 'fill', source: 'kreta', 'source-layer': 'water', paint: { 'fill-color': '#a9d7e8' } });
  if (has('landuse')) layers.push({ id: 'landuse', type: 'fill', source: 'kreta', 'source-layer': 'landuse', paint: { 'fill-color': '#e7eadf', 'fill-opacity': 0.7 } });
  if (has('transportation')) {
    layers.push({ id: 'roads-casing', type: 'line', source: 'kreta', 'source-layer': 'transportation', minzoom: 9, paint: { 'line-color': '#b6bdc4', 'line-width': ['interpolate', ['linear'], ['zoom'], 9, 1.5, 14, 6] } });
    layers.push({ id: 'roads', type: 'line', source: 'kreta', 'source-layer': 'transportation', minzoom: 7, paint: { 'line-color': '#ffffff', 'line-width': ['interpolate', ['linear'], ['zoom'], 7, 0.6, 14, 4] } });
  }
  return { version: 8, sources: { kreta: { type: 'vector', url: source, attribution: manifest.attribution } }, layers };
}

let marker: maplibregl.Marker | null = null;
let nativeWatchId: string | null = null;
let map: maplibregl.Map;

function showPosition(position: { coords: { latitude: number; longitude: number; accuracy: number; heading?: number | null } }) {
  const { latitude, longitude, accuracy, heading } = position.coords;
  const lngLat: [number, number] = [longitude, latitude];
  if (!marker) marker = new maplibregl.Marker({ color: '#1565c0' }).setLngLat(lngLat).addTo(map);
  else marker.setLngLat(lngLat);
  status.textContent = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} · ±${Math.round(accuracy)} m${heading != null ? ` · ${Math.round(heading)}°` : ''}`;
}

async function startGps() {
  try {
    if (Capacitor.isNativePlatform()) {
      const perm = await Geolocation.requestPermissions();
      if (perm.location !== 'granted' && perm.coarseLocation !== 'granted') throw new Error('location permission denied');
      nativeWatchId = await Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 15000, maximumAge: 2000 }, (position, err) => {
        if (err) status.textContent = `GPS hiba: ${err.message}`;
        else if (position) showPosition(position);
      });
    } else if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(showPosition, err => { status.textContent = `GPS hiba: ${err.message}`; }, { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 });
    } else status.textContent = 'A készülék nem támogat GPS-helymeghatározást.';
  } catch {
    status.textContent = 'A GPS-engedély nem érhető el.';
  }
}

async function refreshNetwork() {
  try {
    const state = await Network.getStatus();
    network.textContent = state.connected ? 'ONLINE' : 'OFFLINE';
  } catch {
    network.textContent = navigator.onLine ? 'ONLINE' : 'OFFLINE';
  }
}

async function init() {
  const manifest = await loadOfflineManifest();
  const installed = await hasOfflineMap(manifest);
  offline.classList.toggle('installed', installed);
  offline.classList.toggle('missing', !installed);
  offline.textContent = installed ? '✓ Offline térkép' : '○ Offline térkép';
  offlineDetail.textContent = installed
    ? `Kréta vektoros térkép · zoom ${manifest?.minzoom}–${manifest?.maxzoom}`
    : 'A PMTiles adatcsomag még nincs telepítve.';

  map = new maplibregl.Map({
    container: 'map',
    center: [24.9, 35.2],
    zoom: 8,
    style: installed && manifest ? offlineStyle(manifest) : baseStyle(),
    attributionControl: true
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');
  map.on('load', () => { void startGps(); });

  await refreshNetwork();
  try { await Network.addListener('networkStatusChange', refreshNetwork); } catch { /* browser fallback */ }
}

(document.querySelector('#locate') as HTMLButtonElement).onclick = async () => {
  await startGps();
  if (marker) map.flyTo({ center: marker.getLngLat(), zoom: 14 });
};

void init();

window.addEventListener('beforeunload', () => {
  if (nativeWatchId) void Geolocation.clearWatch({ id: nativeWatchId });
});
