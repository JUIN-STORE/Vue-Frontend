export default [
  {
    path: '/seller/register',
    component: () => import('@/views/products/RegisterPage.vue'),
  },

  {
    path: '/products/search',
    component: () => import('@/views/products/SearchPage.vue'),
  },
  {
    path: '/products/:productId',
    component: () => import('@/views/products/DetailPage.vue'),
  },
  {
    path: '/products',
    component: () => import('@/views/products/ByCategoryPage.vue'),
  },
];
