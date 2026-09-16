import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'www',
    emptyOutDir: true,
    target: 'es2022'
  }
});
