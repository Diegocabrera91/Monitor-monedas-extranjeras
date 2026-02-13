import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Monitor-monedas-extranjeras/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@services': resolve(__dirname, './src/services'),
      '@types': resolve(__dirname, './src/types'),
      '@utils': resolve(__dirname, './src/utils'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'chart': ['chart.js'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});