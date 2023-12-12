/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})*/
/*
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});
*/

import dotenv from 'dotenv';
import config from '../config/config.js';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = config.backendPort;

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${PORT}`,
        changeOrigin: true,
      },
      '/auth': {
        target: `http://127.0.0.1:${PORT}`,
        changeOrigin: true,
      },
    },
    port: config.frontendPort,
  },
  build: {
    outDir: '../server/dist/app',
  },
});
