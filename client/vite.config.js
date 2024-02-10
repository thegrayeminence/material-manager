import react from '@vitejs/plugin-react'
import {defineConfig, loadEnv} from "vite";




export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  const VITE_API_URL = process.env.VITE_API_URL || 'http://localhost:3001/';

  return {
    plugins: [react()],
    server: {
      port: env.PORT,
      proxy: {
        '/api': VITE_API_URL,
      },
    },
  };
});
