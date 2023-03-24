<template>
  <div id="app">
    <AppHeader />
    <div style="position: relative; min-height: 75vh">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import AppFooter from './components/common/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
/* 새로운 헤더를 위해 잠시 주석 처리 (나중에 수정 예정) */
/* @import './css/reset.css'; */
/* @import './css/common.css'; */
@import './css/common-style.css';
</style>
