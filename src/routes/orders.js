export default [
  {
    path: '/new',
    component: () => import('@/views/orders/OrderPage.vue'),
  },
  {
    path: '/orders/info',
    component: () => import('@/views/orders/OrderInfoPage.vue'),
  },
];
