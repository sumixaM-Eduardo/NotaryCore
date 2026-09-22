import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/persons': {
        target: 'http://localhost:5257',
        changeOrigin: true,
      },
      '/protocols': {
        target: 'http://localhost:5257',
        changeOrigin: true,
      },
      '/acts': {
        target: 'http://localhost:5257',
        changeOrigin: true,
      },
    },
  },
});
