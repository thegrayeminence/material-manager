
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {

  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    server: {

      port: process.env.PORT || 3000,
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