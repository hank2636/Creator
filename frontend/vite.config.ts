import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
  server: {
    host: '172.24.108.224',
    port: 5173,
    allowedHosts: [
      '4981-114-35-244-165.ngrok-free.app', //前端網域
      'localhost',
      '127.0.0.1'
    ]
  }
})
