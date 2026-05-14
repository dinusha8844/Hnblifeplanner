import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative paths to make the deployment work on any subdirectory (like GitHub Pages)
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
