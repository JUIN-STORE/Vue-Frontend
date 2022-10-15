<template>
  <form @submit.prevent="createOrder" class="form">
    <button type="submit" class="btn btn-outline-danger" style="float: right">
      주문하기
    </button>
  </form>
</template>

<script>
export default {
  methods: {
    async createOrder() {
      const payload = {
        count: this.$store.getters['orders/getCount'],
        grandTotal: this.$store.getters['orders/getGrandTotal'],
        orderStatus: 'READY',
        productIdList: this.$store.getters['orders/getProductIdList'],
      };
      try {
        await this.$store.dispatch('orders/createOrderAction', payload);
        alert('주문이 완료되었습니다.');
        await this.$router.push('/');
      } catch (e) {
        alert('주문에 실패하였습니다.');
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
}
.card-title {
  margin: 8px;
}
.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-login {
  margin: auto;
  margin-top: 125px;
}
.link a,
.link {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
</style>
