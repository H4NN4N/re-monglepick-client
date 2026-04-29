import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react({
      plugins: [
        ['@swc/plugin-styled-components', { displayName: true, ssr: false }],
      ],
    }),
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    /**
     * 청크 분리 전략 (2026-04-29).
     *
     * 1. react / react-dom / react-router-dom — 거의 모든 페이지가 사용. 단일 vendor-react.
     * 2. styled-components — CSS-in-JS 라이브러리. 모든 화면에 깔린다. vendor-styled.
     * 3. axios — 인증 헤더 인터셉터 등 거의 전 페이지. vendor-http.
     * 4. zustand — 전역 스토어 (auth/theme/match/loading). vendor-state.
     * 5. @tosspayments/tosspayments-sdk — 결제 페이지에서만 사용. vendor-payment (lazy 가능).
     *
     * 효과: 라이브러리 업그레이드만 했을 때 어플리케이션 코드 청크의 캐시가 유지되어
     *       사용자 재방문 시 다운로드량이 줄어든다. 또한 App 청크가 1,444 → ~700 kB 수준으로
     *       추가 절감됨 (vendor 분리분 만큼).
     */
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-styled': ['styled-components'],
          'vendor-http': ['axios'],
          'vendor-state': ['zustand'],
          'vendor-payment': ['@tosspayments/tosspayments-sdk'],
        },
      },
    },
    /* 분리 후에도 chunkSizeWarningLimit 기본 500 kB 는 유지 (실측 후 필요 시 조정). */
  },
})
