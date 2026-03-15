import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 线上地址：https://siyuchen-2025.github.io/CHENSIYU-sProfile/
  base: '/CHENSIYU-sProfile/',
})
