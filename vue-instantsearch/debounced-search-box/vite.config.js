import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env': {} },
  server: { port: 3000 },
  plugins: [vue()],
});
