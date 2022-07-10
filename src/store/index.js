import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    token: '',
  },
  getters: {
    isLogin(state) {
      return state.email !== '';
    },
  },
  mutations: {
    setUsername(state, email) {
      state.email = email;
    },
    clearUsername(state) {
      state.email = '';
    },
    setToken(state, token) {
      state.token = token;
    },
  },
});
