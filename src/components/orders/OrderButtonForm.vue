<template>
  <div>
    <form @submit.prevent="createOrder" class="form">
      <button
        type="submit"
        class="btn btn-primary"
        style="float: right; width: 8em; margin-bottom: 20%"
      >
        주문하기
      </button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    async createOrder() {
      if (!confirm('주문하시겠습니까?')) return;

      const payload = {
        count: this.$store.getters['orders/getCount'],
        orderStatus: 'READY',
        itemIdList: this.$store.getters['orders/getItemList'].map(
          item => item.id,
        ),
        deliveryReceiver: this.$store.getters['orders/getDeliveryReceiver'],
        deliveryAddress: this.$store.getters['orders/getDeliveryAddress'],
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
