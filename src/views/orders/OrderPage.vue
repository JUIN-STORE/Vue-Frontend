<template>
  <div>
    <OrderProductForm />
    <OrderAccountForm />
    <OrderAddressForm />
    <OrderButtonForm />
  </div>
</template>

<script>
import OrderProductForm from '@/components/orders/OrderProductForm';
import OrderAccountForm from '@/components/orders/OrderAccountForm';
import OrderAddressForm from '@/components/orders/OrderAddressForm';
import OrderButtonForm from '@/components/orders/OrderButtonForm';

export default {
  components: {
    OrderProductForm,
    OrderAccountForm,
    OrderAddressForm,
    OrderButtonForm,
  },
};
</script>

<style></style>
