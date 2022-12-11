import Vue from 'vue';
import Vuex from 'vuex';
import accounts from './modules/accounts';
import carts from './modules/carts';
import orders from './modules/orders';
import items from './modules/items';

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
    items,
  },
});

export default store;
