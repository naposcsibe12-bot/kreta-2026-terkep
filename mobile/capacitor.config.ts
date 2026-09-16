import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'hu.kreta2026.app',
  appName: 'Kréta 2026',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: false
  }
};

export default config;
