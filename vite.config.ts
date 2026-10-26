import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 專案網站使用存放庫名稱作為資源路徑；個人根網站則使用根路徑。
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY
    ? process.env.GITHUB_REPOSITORY.split('/')[1] === `${process.env.GITHUB_REPOSITORY.split('/')[0]}.github.io`
      ? '/'
      : `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
});
