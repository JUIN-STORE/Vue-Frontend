export default [
  {
    path: '/',
    component: () => import('@/views/items/ItemPage.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '*',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { requireAuth: false },
  },
];
