import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages serves the site from /<repo>/. Override with BASE_PATH=/ for a root-domain host.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? (process.env.BASE_PATH ?? '/Portfolio/') : '/',
  plugins: [react(), tailwindcss()],
  build: { chunkSizeWarningLimit: 1200 },
}))
