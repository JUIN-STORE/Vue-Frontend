import Vue from 'vue';
import VueRouter from 'vue-router';
import accounts from '@/routes/accounts';
import carts from '@/routes/carts';
import products from '@/routes/products';
import orders from '@/routes/orders';
import common from '@/routes/common';
import categories from '@/routes/categories';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...common,
    ...accounts,
    ...carts,
    ...products,
    ...orders,
    ...categories,
  ],
});
export default router;
