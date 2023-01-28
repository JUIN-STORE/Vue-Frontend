export default [
  {
    path: '/addresses/all',
    component: () => import('@/views/addresses/AddressListPage.vue'),
    meta: { requireAuth: true },
  },
];
