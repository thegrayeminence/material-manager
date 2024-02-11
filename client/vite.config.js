
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

// Define the configuration
export default defineConfig(({mode}) => {
  // Determine if running in development mode
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    server: {

      port: 3000,
      ...(isDevelopment && {
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      }),
    },
  };
});