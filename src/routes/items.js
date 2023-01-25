export default [
  {
    path: '/seller/items/new',
    component: () => import('@/views/items/RegisterPage.vue'),
  },

  {
    path: '/items/search',
    component: () => import('@/views/items/SearchPage.vue'),
  },
  {
    path: '/items/:itemId',
    component: () => import('@/views/items/DetailPage.vue'),
  },
  {
    path: '/items',
    component: () => import('@/views/items/ByCategoryPage.vue'),
  },
];
