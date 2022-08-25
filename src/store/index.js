import Vue from 'vue';
import Vuex from 'vuex';
import accounts from './modules/accounts';
import carts from './modules/carts';
import orders from './modules/orders';
import products from './modules/products';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    accounts,
    carts,
    orders,
    products,
  },
});

export default store;
