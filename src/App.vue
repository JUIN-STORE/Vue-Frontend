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
@import './css/reset.css';
@import './css/common.css';
</style>
