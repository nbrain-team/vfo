import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'app.liftedvfo.io',
      'liftedvfo-frontend.onrender.com',
      'agentiq-vfo-frontend.onrender.com',
      'localhost'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    allowedHosts: [
        'app.liftedvfo.io',
        'liftedvfo-frontend.onrender.com',
        'agentiq-vfo-frontend.onrender.com'
    ]
  }
}) 