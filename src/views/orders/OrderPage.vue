<template>
  <div class="container">
    <OrderForm />
  </div>
</template>

<script>
import OrderItemForm from '@/components/orders/OrderItemForm';
import OrderDeliveryInfoForm from '@/components/orders/OrderDeliveryInfoForm';
import OrderButtonForm from '@/components/orders/OrderButtonForm';
import OrderForm from '@/components/orders/OrderForm';

export default {
  components: {
    OrderForm,
  },
};
</script>

<style></style>
