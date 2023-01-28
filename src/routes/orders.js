export default [
  {
    path: '/new',
    component: () => import('@/views/orders/OrderPage.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/orders/info',
    component: () => import('@/views/orders/OrderInfoPage.vue'),
    meta: { requireAuth: true },
  },
];
