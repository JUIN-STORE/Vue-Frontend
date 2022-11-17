<template>
  <div id="app">
    <AppHeader2 />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader2 from '@/components/common/AppHeader2.vue';

export default {
  name: 'App',
  components: {
    AppHeader2,
  },
};
</script>

<style>
/* 새로운 헤더를 위해 잠시 주석 처리 (나중에 수정 예정) */
/* @import './css/reset.css'; */
/* @import './css/common.css'; */
@import './css/common-style.css';
</style>
