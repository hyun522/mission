import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/global.module.scss";`, // 전역으로 사용할 SCSS 파일을 추가할 수 있습니다.
      },
    },
  },
});
