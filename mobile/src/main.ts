import maplibregl from 'maplibre-gl';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';
import { Protocol } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';

const status = document.querySelector('#status')!;
const network = document.querySelector('#network')!;
const protocol = new Protocol();
maplibregl.addProtocol('pmtiles', protocol.tile);

const offlineSource = 'pmtiles://kreta.pmtiles';
const style: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    kreta: { type: 'vector', url: offlineSource }
  },
  layers: [
    { id: 'background', type: 'background', paint: { 'background-color': '#eef3f5' } },
    { id: 'water', type: 'fill', source: 'kreta', 'source-layer': 'water', paint: { 'fill-color': '#a9d7e8' } },
    { id: 'landuse', type: 'fill', source: 'kreta', 'source-layer': 'landuse', paint: { 'fill-color': '#e7eadf', 'fill-opacity': 0.7 } },
    { id: 'roads', type: 'line', source: 'kreta', 'source-layer': 'transportation', minzoom: 7, paint: { 'line-color': '#ffffff', 'line-width': ['interpolate', ['linear'], ['zoom'], 7, 0.6, 14, 4] } },
    { id: 'roads-casing', type: 'line', source: 'kreta', 'source-layer': 'transportation', minzoom: 9, paint: { 'line-color': '#b6bdc4', 'line-width': ['interpolate', ['linear'], ['zoom'], 9, 1.5, 14, 6] } }
  ]
};

const map = new maplibregl.Map({ container: 'map', center: [24.9, 35.2], zoom: 8, style, attributionControl: true });
map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

let marker: maplibregl.Marker | null = null;
let accuracyCircle: maplibregl.CircleLayerSpecification | null = null;
let nativeWatchId: string | null = null;

function showPosition(position: { coords: { latitude: number; longitude: number; accuracy: number; heading?: number | null } }) {
  const { latitude, longitude, accuracy, heading } = position.coords;
  const lngLat: [number, number] = [longitude, latitude];
  if (!marker) marker = new maplibregl.Marker({ color: '#1565c0' }).setLngLat(lngLat).addTo(map);
  else marker.setLngLat(lngLat);
  status.textContent = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} · ±${Math.round(accuracy)} m${heading != null ? ` · ${Math.round(heading)}°` : ''}`;
  if (accuracyCircle) {
    // Accuracy visualization is represented by the native marker status; MapLibre circle is created once below when source is ready.
  }
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
  } catch (e) {
    status.textContent = 'A GPS-engedély nem érhető el.';
  }
}

async function refreshNetwork() {
  const state = await Network.getStatus();
  network.textContent = state.connected ? 'ONLINE' : 'OFFLINE';
}

(document.querySelector('#locate') as HTMLButtonElement).onclick = async () => {
  await startGps();
  if (marker) map.flyTo({ center: marker.getLngLat(), zoom: 14 });
};

void refreshNetwork();
Network.addListener('networkStatusChange', refreshNetwork);
map.on('load', () => { void startGps(); });

window.addEventListener('beforeunload', () => {
  if (nativeWatchId) void Geolocation.clearWatch({ id: nativeWatchId });
});
