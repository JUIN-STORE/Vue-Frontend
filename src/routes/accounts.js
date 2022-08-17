export default [
  {
    path: '/login',
    component: () => import('@/views/accounts/LoginPage.vue'),
  },
  {
    path: '/signup',
    component: () => import('@/views/accounts/SignupPage.vue'),
  },
  {
    path: '/profile',
    component: () => import('@/views/accounts/ProfilePage.vue'),
  },
  {
    path: '/modify',
    component: () => import('@/views/accounts/ModifyPage.vue'),
  },
];
