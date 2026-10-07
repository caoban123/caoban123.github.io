import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-framer': ['framer-motion'],
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          'vendor-icons': ['lucide-react'],
          'vendor-fluid': ['webgl-fluid-enhanced'],
        },
      },
    },
  },
})
