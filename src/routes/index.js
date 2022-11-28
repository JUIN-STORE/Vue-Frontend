import Vue from 'vue';
import VueRouter from 'vue-router';
import accounts from '@/routes/accounts';
import addresses from '@/routes/addresses';
import carts from '@/routes/carts';
import products from '@/routes/products';
import orders from '@/routes/orders';
import common from '@/routes/common';
import categories from '@/routes/categories';
import personal from '@/routes/personal-color';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...common,
    ...accounts,
    ...addresses,
    ...carts,
    ...products,
    ...orders,
    ...categories,
    ...personal,
  ],
});
export default router;
