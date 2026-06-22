import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png', 'icon.svg'],
      manifest: {
        name: 'Agón — moderador de debates',
        short_name: 'Agón',
        description: 'Moderador profesional de debates con timer, turnos, estadísticas y simulador de dinámicas. Parte del ecosistema Mouseîon.',
        lang: 'es',
        theme_color: '#0b1417',
        background_color: '#0b1417',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'cdn-cache', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 } }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // react-bootstrap must stay with React (it imports it). Splitting it
        // into its own chunk created a circular bootstrap<->vendor edge that
        // could run before React initialized → __SECRET_INTERNALS crash in prod.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', 'redux-persist', 'react-bootstrap'],
          bootstrap: ['bootstrap'],
          icons: ['react-icons'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities']
        }
      }
    }
  }
})
