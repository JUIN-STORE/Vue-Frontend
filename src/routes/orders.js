export default [
  {
    path: '/new',
    component: () => import('@/views/orders/OrderPage.vue'),
  },
  {
    path: '/order/info',
    component: () => import('@/views/orders/OrderInfoPage.vue'),
  },
];
