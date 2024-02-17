import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  return {
    plugins: [
      react()
    ],
    server: {
      port: process.env.PORT || 3000,
      proxy: {
        '/api': {
          // Assuming your local backend runs on port 3001
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    define: {
      'process.env': process.env,
    }
  };
});
