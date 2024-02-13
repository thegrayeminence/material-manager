import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      react()
    ],
    server: {
      port: process.env.PORT || 3000,
      ...(isDevelopment && {
        proxy: {
          '/api': {
            target: process.env.VITE_API_URL || 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      }),
    },

    define: {
      'process.env': process.env,
    }
  };
});
