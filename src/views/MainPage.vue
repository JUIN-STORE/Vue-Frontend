<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
    </div>
  </div>
</template>

<script>
import { profile } from '@/api/accounts';

export default {
  methods: {
    async myInfoData() {
      let newVar = await profile();
      console.log(newVar);
    },
  },
  created() {
    this.myInfoData();
  },
};
</script>

<style></style>
