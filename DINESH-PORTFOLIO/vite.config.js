import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  base: './',
  build: { outDir: 'dist', rollupOptions: { input: {
    main: resolve(__dirname, 'index.html'),
    fullStack: resolve(__dirname, 'full-stack.html'),
    cyber: resolve(__dirname, 'cyber.html'),
    hardware: resolve(__dirname, 'hardware.html'),
  } } }
});
