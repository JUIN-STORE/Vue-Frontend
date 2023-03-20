import Vue from 'vue';
import VueRouter from 'vue-router';
import accounts from '@/routes/accounts';
import addresses from '@/routes/addresses';
import carts from '@/routes/carts';
import items from '@/routes/items';
import orders from '@/routes/orders';
import common from '@/routes/common';
import categories from '@/routes/categories';
import personal from '@/routes/personal-color';
import store from '@/store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...common,
    ...accounts,
    ...addresses,
    ...carts,
    ...items,
    ...orders,
    ...categories,
    ...personal,
  ],
});

router.beforeEach(function (to, from, next) {
  const requireAuth = to.meta.requireAuth;
  const accessToken = store.getters['accounts/getAccessToken'];

  if (requireAuth && !accessToken) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
    next('/accounts/sign-in');
  } else {
    next();
  }
});

export default router;
