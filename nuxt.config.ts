// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // 기본 옵션
  // 호환성 날짜 설정. 해당 날짜의 Nuxt 동작 방식을 기준으로 애플리케이션 동작
  compatibilityDate: '2024-11-01',
  // Nuxt DevTools 활성화 여부. 개발 중 애플리케이션 상태 모니터링 및 디버깅 도구
  devtools: {
    enabled: true
  },

  // Nuxt port 설정
  //  devServer: {
  //   port: 3001
  // },

  // Vite 설정
  vite: {
    resolve: {
      alias: {
        // 파일 경로 별칭 설정
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        // /api로 시작하는 요청은 백엔드로 프록시
        '/api': {
          target: 'http://localhost:8081'
          // changeOrigin: true // 요청 헤더의 Origin 및 Host 값을 대상 서버의 도메인으로 변경
          // secure: false // SSL 인증서 검증을 생략하고 통과
        }
      }
    },
    assetsInclude: ['**/*.md'] // 마크다운 파일을 문자열로 파싱
  },

  // SSR or SPA 설정
  ssr: true,

  // 환경 변수를 사용하여 빌드 후 지정해야 하는 개인 또는 공개 토큰
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },

  // 자동 import할 폴더
  imports: {
    dirs: ['types/**']
  },

  // 모듈 설정
  modules: ['vuetify-nuxt-module', 'dayjs-nuxt'],

  // dayjs 옵션 설정
  dayjs: {
    locales: ['ko', 'en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Korea/Seoul'
  }
});
