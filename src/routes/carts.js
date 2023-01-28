export default [
  {
    path: '/carts',
    component: () => import('@/views/carts/CartPage.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/carts/buy',
    component: () => import('@/views/orders/OrderPage.vue'),
    meta: { requireAuth: true },
  },
];
