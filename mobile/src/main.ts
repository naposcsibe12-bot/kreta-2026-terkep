import maplibregl from 'maplibre-gl';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';

const map = new maplibregl.Map({
  container: 'map',
  center: [24.9, 35.2],
  zoom: 8,
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
  },
  attributionControl: true
});

map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'top-right');

let marker: maplibregl.Marker | null = null;
let watchId: string | null = null;

async function updatePosition(position: { coords: { latitude: number; longitude: number; accuracy: number } }) {
  const { latitude, longitude, accuracy } = position.coords;
  const lngLat: [number, number] = [longitude, latitude];
  if (!marker) marker = new maplibregl.Marker({ color: '#1565c0' }).setLngLat(lngLat).addTo(map);
  else marker.setLngLat(lngLat);
  document.querySelector('#status')!.textContent = `GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} · ±${Math.round(accuracy)} m`;
}

async function startGps() {
  try {
    if (Capacitor.isNativePlatform()) {
      await Geolocation.requestPermissions();
      const result = await Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 }, (position, err) => {
        if (err) return void (document.querySelector('#status')!.textContent = `GPS hiba: ${err.message}`);
        if (position) updatePosition(position);
      });
      watchId = result;
    } else if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(updatePosition, err => {
        document.querySelector('#status')!.textContent = `GPS hiba: ${err.message}`;
      }, { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 });
    } else {
      document.querySelector('#status')!.textContent = 'A készülék nem támogat GPS-helymeghatározást.';
    }
  } catch (e) {
    document.querySelector('#status')!.textContent = 'A GPS-engedély nem érhető el.';
  }
}

async function refreshNetwork() {
  const state = await Network.getStatus();
  document.querySelector('#network')!.textContent = state.connected ? 'ONLINE' : 'OFFLINE';
}

(document.querySelector('#locate') as HTMLButtonElement).onclick = async () => {
  await startGps();
  if (marker) map.flyTo({ center: marker.getLngLat(), zoom: 13 });
};

void refreshNetwork();
Network.addListener('networkStatusChange', refreshNetwork);
map.on('load', () => { void startGps(); });
