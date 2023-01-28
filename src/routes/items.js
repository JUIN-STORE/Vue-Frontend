export default [
  {
    path: '/seller/items/new',
    component: () => import('@/views/items/RegisterPage.vue'),
    meta: { requireAuth: true },
  },

  {
    path: '/items/search',
    component: () => import('@/views/items/SearchPage.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/items/:itemId',
    component: () => import('@/views/items/DetailPage.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/items',
    component: () => import('@/views/items/ByCategoryPage.vue'),
    meta: { requireAuth: false },
  },
];
