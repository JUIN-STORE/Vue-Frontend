<template>
  <div>
    <OrderProductForm />
    <OrderDeliveryInfoForm />
    <OrderButtonForm />
  </div>
</template>

<script>
import OrderProductForm from '@/components/orders/OrderProductForm';
import OrderDeliveryInfoForm from '@/components/orders/OrderDeliveryInfoForm';
import OrderButtonForm from '@/components/orders/OrderButtonForm';

export default {
  components: {
    OrderProductForm,
    OrderDeliveryInfoForm,
    OrderButtonForm,
  },
};
</script>

<style></style>
