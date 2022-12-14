<template>
  <div>
    <OrderItemForm />
    <OrderDeliveryInfoForm />
    <OrderButtonForm />
  </div>
</template>

<script>
import OrderItemForm from '@/components/orders/OrderItemForm2';
import OrderDeliveryInfoForm from '@/components/orders/OrderDeliveryInfoForm2';
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
