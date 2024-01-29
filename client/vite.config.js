import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// Use an environment variable for the API URL
const API_URL = process.env.VITE_API_URL || 'http://localhost:3001';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    proxy: {
      '/api': API_URL,
    },
  },
});
