export default [
  {
    path: '/admin/register',
    component: () => import('@/views/products/RegisterPage.vue'),
  },

  {
    path: '/products/search',
    component: () => import('@/views/products/SearchPage.vue'),
  },
];
