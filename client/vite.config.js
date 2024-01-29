import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    proxy: {
      // Proxy requests with '/api' prefix to your backend server
      '/api': 'http://localhost:3001',
    },
  },
});
