import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getEmailFromCookie,
  saveAuthToCookie,
  saveEmailToCookie,
} from '@/utils/cookies';
import { login } from '@/api/accounts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: getEmailFromCookie() || '',
    name: '',
    city: '',
    street: '',
    zipCode: '',
    token: getAuthFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return state.email !== '' && state.token !== '';
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
    clearCookie(state) {
      state.email = '';
      state.token = '';
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async LOGIN({ commit }, payload) {
      const { data } = await login(payload);
      commit('setEmail', data.data.email);
      commit('setToken', 'Bearer ' + data.data.token);
      saveAuthToCookie('Bearer ' + data.data.token);
      saveEmailToCookie(data.data.email);
      return data;
    },
  },
});
