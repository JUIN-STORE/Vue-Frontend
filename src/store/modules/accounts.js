import {
  getAuthFromCookie,
  getEmailFromCookie,
  saveAuthToCookie,
  saveEmailToCookie,
} from '@/utils/cookies';
import { loginCall } from '@/api/accounts';

const state = {
  email: getEmailFromCookie() || '',
  name: '',
  phoneNumber: '',
  city: '',
  street: '',
  zipCode: '',
  token: getAuthFromCookie() || '',
};

const getters = {
  isLogin(state) {
    return state.email !== '' && state.token !== '';
  },
  readEmail(state) {
    return state.email;
  },
  readName(state) {
    return state.name;
  },
  readPhoneNumber(state) {
    return state.phoneNumber;
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
};

const mutations = {
  setRole(state, role) {
    state.accountRole = role;
  },
  setEmail(state, email) {
    state.email = email;
  },
  setName(state, name) {
    state.name = name;
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
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
};

// actions: 카멜 케이스
const actions = {
  async loginSetting({ commit }, payload) {
    const { data } = await loginCall(payload);
    commit('setEmail', data.data.email);
    commit('setToken', data.data.token);
    saveAuthToCookie(data.data.token);
    saveEmailToCookie(data.data.email);
    return data;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
