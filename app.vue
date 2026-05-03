<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();

// data
const layout = ref<'default' | 'login' | 'main'>('default');

// setup()
layout.value = 'main';
provide('layoutType', layout.value); // 하위 모든 페이지에서 inject로 받을 수 있음
onMounted(() => {
  runtimeConfig.public.apiBase = '/api2';
  appConfig.title = 'Hello Nuxt 2';

  utils.log('runtimeConfig.public.apiBase : ' + runtimeConfig.public.apiBase);
  utils.log('appConfig.title : ' + appConfig.title);
});
</script>

<template>
  <div class="app-div">
    <!-- v-app: Vuetify 용. v-app-bar 사용 시 필요 -->
    <v-app>
      <NuxtLoadingIndicator />

      <NuxtLayout :name="layout">
        <NuxtPage class="nuxt-page" :style="[layout === 'main' ? 'margin-top: 64px;' : '']" />
      </NuxtLayout>
    </v-app>
  </div>
</template>

<style lang="scss">
// 화면 레이아웃, 스크롤바
html,
body {
  height: 100vh;
  overflow: hidden;

  #__nuxt {
    height: 100%;

    .app-div {
      height: 100%;

      .v-application {
        height: 100%;

        .v-application__wrap {
          height: 100%;

          .nuxt-page {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>
