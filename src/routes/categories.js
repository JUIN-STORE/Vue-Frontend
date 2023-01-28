export default [
  {
    path: '/admin/categories/new',
    component: () => import('@/views/categories/CreatePage.vue'),
    meta: { requireAuth: true },
  },
];
