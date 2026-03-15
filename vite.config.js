import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 部署到 GitHub Pages 等子路径时，把 base 改成你的仓库名，例如 base: '/my-profile/'
  base: '/',
})
