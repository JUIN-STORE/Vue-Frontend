export default [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '*',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { requireAuth: false },
  },
];
