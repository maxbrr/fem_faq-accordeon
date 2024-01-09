import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/fem_faq-accordeon/',
  resolve: {
    alias: {
      '@': '/src'
    },
  },
});