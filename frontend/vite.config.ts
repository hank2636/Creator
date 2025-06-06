import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
  server: {
    host: 'localhost',
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1'
    ]
  }
})
