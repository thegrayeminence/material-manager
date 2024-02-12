import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  // const isDevelopment = mode === 'development';

  return {
    plugins: [
      react()
    ],
    // server: {
    //   port: process.env.PORT || 3000, // Specify the port for the Vite dev server
    //   // Conditional proxy configuration for development mode
    //   ...(isDevelopment && {
    //     proxy: {
    //       '/api': {
    //         target: process.env.VITE_API_URL || 'http://localhost:3000', // Proxy API requests to Flask backend
    //         changeOrigin: true,
    //         rewrite: (path) => path.replace(/^\/api/, ''),
    //       },
    //     },
    //   }),
    // },
    // base: '/', // The base public path when served in development or production
    // build: {
    //   outDir: 'build', // Specify the output directory (default is "dist")
    // },

    define: {
      'process.env': process.env, // Consider security implications
    }
  };
});
