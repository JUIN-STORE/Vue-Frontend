import {
  getAuthFromCookie,
  getEmailFromCookie,
  saveAuthToCookie,
  saveEmailToCookie,
} from '@/utils/cookies';
import { loginCall } from '@/api/accounts';

// state: 소문자 스네이크
const state = {
  id: 0,
  email: getEmailFromCookie() || '',
  name: '',
  phoneNumber: '',
  city: '',
  street: '',
  zipCode: '',
  token: getAuthFromCookie() || '',
};

// mutations: 대문자 스네이크
const mutations = {
  SET_ID(state, id) {
    state.id = id;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_PHONE_NUMBER(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  SET_CITY(state, city) {
    state.city = city;
  },
  SET_STREET(state, street) {
    state.street = street;
  },
  SET_ZIP_CODE(state, zipCode) {
    state.zipCode = zipCode;
  },

  SET_TOKEN(state, token) {
    state.token = token;
  },

  CLEAR_COOKIE(state) {
    state.email = '';
    state.token = '';
  },
};

// getters: 카멜 케이스
const getters = {
  isLogin(state) {
    return state.email !== '' && state.token !== '';
  },
  readId(state) {
    return state.id;
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

// actions: 카멜 케이스
const actions = {
  async loginSetting({ commit }, payload) {
    const { data } = await loginCall(payload);
    commit('SET_EMAIL', data.data.email);
    commit('SET_TOKEN', data.data.token);
    saveAuthToCookie(data.data.token);
    saveEmailToCookie(data.data.email);
    return data;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
