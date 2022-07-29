import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/products/HomePage.vue'),
    },
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

    // order
    {
      path: '/admin/register',
      component: () => import('@/views/products/RegisterPage.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

// 2번째
