export default [
  {
    path: '/accounts/login',
    component: () => import('@/views/accounts/LoginPage.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/accounts/sign-up',
    component: () => import('@/views/accounts/SignupPage.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/accounts/password',
    component: () => import('@/views/accounts/PasswordPage.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/accounts/profile',
    component: () => import('@/views/accounts/ProfilePage.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/accounts/update',
    component: () => import('@/views/accounts/UpdatePage.vue'),
    meta: { requireAuth: true },
  },
];
