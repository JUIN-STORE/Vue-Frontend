<template>
  <div>
    <OrderItemForm />
    <OrderDeliveryInfoForm />
    <OrderButtonForm />
  </div>
</template>

<script>
import OrderItemForm from '@/components/orders/OrderItemForm';
import OrderDeliveryInfoForm from '@/components/orders/OrderDeliveryInfoForm';
import OrderButtonForm from '@/components/orders/OrderButtonForm';

export default {
  components: {
    OrderItemForm,
    OrderDeliveryInfoForm,
    OrderButtonForm,
  },
};
</script>

<style></style>
