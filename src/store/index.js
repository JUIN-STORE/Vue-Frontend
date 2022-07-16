import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    name: '',
    city: '',
    street: '',
    zipCode: '',
    token: '',
  },
  getters: {
    isLogin(state) {
      return state.email !== '';
    },
    readEmail(state) {
      return state.email;
    },
    readName(state) {
      return state.name;
    },
    readCity(state) {
      return state.city;
    },
    readStreet(state) {
      return state.street;
    },
    readZipCode(state) {
      return state.zipCode;
    },
  },
  mutations: {
    setRole(state, role) {
      state.accountRole = role;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setName(state, name) {
      state.name = name;
    },
    setCity(state, city) {
      state.city = city;
    },
    setStreet(state, street) {
      state.street = street;
    },
    setZipCode(state, zipCode) {
      state.zipCode = zipCode;
    },
    clearEmail(state) {
      state.email = '';
    },
    setToken(state, token) {
      state.token = token;
    },
  },
});
