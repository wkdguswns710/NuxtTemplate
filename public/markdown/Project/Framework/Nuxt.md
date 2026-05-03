# Nuxt

## Nuxt란?

Vue를 더 빠르고 체계적으로 쓰게 해주는 풀 패키지 프레임워크. 다양한 모듈 제공

### Vue vs Nuxt

Vue는 직접 구성을 더 많이 해야 함. 대신 가볍고 유연함. Nuxt는 다양한 모듈이 내장되어있음. 대신 조금 더 무거움.

단순한 내부용 관리자 페이지/대시보드 등은 Vue로도 충분하고, 검색엔진 노출(SEO)과 초기 로딩 속도가 중요한 블로그/쇼핑몰/포털 등의 서비스는 Nuxt가 더 적합함

### Option API vs Composition API

Vue 2 Option API는 옵션 단위(data, methods 등)로 코드 작성. 이는 직관적이고 쉬우나 컴포넌트가 커질수록 관련 로직이 흩어져서 같은 파일 내여도 관리 어려움.

Vue 3 Compostion API는 기능 단위로 코드 작성. 이는 재사용성과 가독성이 높음.

## Build Tool, Bundler

Nuxt.js 3는 기본적으로 Vite를 빌드 도구로 사용

설정을 통해 Vite 대신 Webpack도 선택적으로 사용 가능

### 빌드

코드를 실행할 수 있도록 컴파일, 번들링 하는 과정

불필요한 모듈, 최적화 되지 않은 번들링 설정은 개발 생산성 저하

HMR(Hot Module Replacement) 활용, 코드 스플릿으로 번들 크기 축소, 트리셰이킹 활성화 등의 설정으로 해결

### 컴파일

사람이 작성한 코드를 브라우저나 런타임이 이해 가능한 코드로 변환(TypeScript, Babel 등)

### 런타임

애플리케이션이 실제 실행될 때

### 번들링

여러 개의 파일을 최적화된 파일로 묶는 과정

### HMR(Hot Module Replacement)

코드 수정 시 전체 페이지를 새로고침하지 않고 변경된 모듈만 교체하는 방식

### 코드 스플릿

Vue router 파일에서 import 방식을 바꿔 코드 스플릿 가능. 컴포넌트를 한 번에 로딩하는 방식에서, 해당 라우트로 이동할 때 로딩하는 방식으로 바꿔 초기 로딩 속도 향상. 빌드 시 import 문법을 감지하여 별도의 청크 파일 생성. 주석으로 파일 이름 제어 가능

<br>

🔧 빌드 도구 (Build Tool)

정의: 프론트엔드 프로젝트를 개발 → 배포 가능한 형태로 만드는 전체 프로세스를 자동화하는 도구

기능:
코드 번들링, 코드 변환(예: TypeScript → JS, Sass → CSS), 압축, 이미지 최적화, dev 서버 실행(HMR 등), 파일 복사, 환경변수 처리 등

종류: Vite, Parcel, Gulp, Webpack (Webpack은 빌드 도구이자 번들러)

<br>

📦 번들러 (Bundler)
정의: 여러 개의 JS/TS/CSS 모듈을 하나의 파일 또는 몇 개의 파일로 묶어주는 도구

기능: import/export 분석, dependency graph 생성, 트리 셰이킹, 코드 분할

종류: Webpack, Rollup, ESBuild

<br>

✅ Webpack
빌드 도구 O, 번들러 O

자신이 직접 번들링 로직을 내장

의존성 그래프 분석, 번들 생성, 트리 셰이킹 등 모두 자체적으로 수행

<br>

✅ Vite
빌드 도구 O, 번들러 X

대신 내부적으로 ESBuild(개발 시)와 Rollup(프로덕션 빌드 시)을 사용

개발 서버 (dev): ESBuild를 써서 빠르게 모듈을 변환

빌드 시 (build): Rollup을 이용해 최종 번들 파일 생성

## Project Version

### Nuxt, Vue Version Update

```bash
npm list nuxt, vue    // 현재 버전 확인
npm show nuxt version, vue version    // 최신 버전 확인
npm remove nuxt, vue    // nuxt, vue 삭제
npm install nuxt@(버전), vue@(버전)     // 특정 버전 설치
npm install nuxt@latest vue@latest    // 최신 버전 설치
```

### NPM Version Update

```bash
npm -v    // 현재 버전 확인
npm view npm version    // 최신 버전 확인
npm install -g npm@(버전)    // 특정 버전으로 변경
npm install -g npm    // 최신 버전 설치
```

<br>

dependencies: 앱이 실행(run-time) 되는 데 필요한 패키지 (nuxt, vue, vuetify-nuxt-module 등)

devDependencies: 앱을 개발(build-time) 할 때만 필요한 패키지 타입 (타입 정의, 빌드 도구, 린터 등)

(npm install -D, --save-dev)

## Project Setting

### nuxt.config.ts

nuxt.config.ts 변경사항은 실시간으로 반영됨

#### 파일 경로 별칭 설정

```typescript
// nuxt.config.ts
import { fileURLToPath } from 'url'

vite: {
    resolve: {
        alias: {
            // 파일 경로 별칭 설정
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
},

```

Error: 'url' 모듈 또는 해당 형식 선언을 찾을 수 없습니다.ts(2307)

Nuxt 3는 브라우저 중심이지만, fileURLToPath는 Node.js 전용 함수

TypeScript는 이 함수를 사용할 때 node 타입 정의가 있어야 함

하지만 프로젝트의 tsconfig.json에 "node" 타입이 빠져 있으면 이 에러가 발생

```bash
npm install --save-dev @types/node
```

### 그 외

TypeScript 설정 - tsconfig.json

Prettier 설정 - settings.json, .prettierrc.json

Code Snippet 설정 - 파일 > 기본 설정 > 코드 조각 설정

폴더 구조 정리

그 외 Lint 설정, .env 환경 변수 설정 등

## Vue.js 3 LifeCycle

setup(): 컴포넌트 생성 시, 가장 먼저 실행됨 (Vue2의 created, beforeCreate가 통합됨)

onBeforeMount(): DOM에 마운트되기 전

onMounted(): DOM에 마운트된 후 (렌더링 완료)

onBeforeUpdate(): 반응형 상태가 바뀌어 DOM 업데이트 직전

onUpdated(): DOM 업데이트 직후

onBeforeUnmount(): 컴포넌트가 제거되기 직전

onUnmounted(): 컴포넌트가 완전히 제거된 후

## BackEnd API 호출

### Directory

/server/api: API 등록

/server/middleware: 미들웨어 핸들러는 헤더를 추가하거나 확인하고, 요청을 기록하거나, 이벤트의 요청 객체를 확장하기 위해 다른 서버 경로보다 먼저 모든 요청에 ​​대해 실행

fetch, axios

## 상태 관리

Vuex는 Vue 2 공식 상태 관리 라이브러리. state, getters, mutations(settes), actions(methods) 구조

Pinia는 Vue 3 공식 권장 상태 관리 라이브러리. TypeScript 친화적이며 Composition API와 호환성 좋음. defineStore 내 Composition API 구조로 정의

## HTTP 통신

### Axios

브라우저와 Node.js에서 사용하는 프로미스 기반 HTTP 클라이언트 라이브러리

Restful API와 통신할 때 사용. asnyc-await 문법을 활용해 비동기 요청 사용 가능. 요청/응답 인터셉터 기능 있음. 응답받은 json을 자동으로 객체로 변환. 오래된 브라우저와도 호환되며 타임아웃/취소 기능 있음. HTTP 메서도 지원함.

### Fetch

브라우저에 내장된 프로미스 기반 HTTP 클라이언트 라이브러리

가볍고 표준화 되어있지만 json 추가 파싱이 필요해 reponse.json() 사용. 자동 에러 처리, 타임아웃 기본 기능 없음
