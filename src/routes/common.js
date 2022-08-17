export default [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '*',
    component: () => import('@/views/NotFoundPage.vue'),
  },
];
