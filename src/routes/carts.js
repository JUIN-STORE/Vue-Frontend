export default [
  {
    path: '/carts',
    component: () => import('@/views/carts/CartPage.vue'),
  },
  {
    path: '/carts/buy',
    component: () => import('@/views/orders/OrderPage.vue'),
  },
];
