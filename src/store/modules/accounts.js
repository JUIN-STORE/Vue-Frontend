import {
  getEmailFromCookie,
  saveEmailToCookie,
  saveRefreshTokenAtCookie,
  getRefreshTokenFromCookie,
} from '@/utils/cookies';
import { loginCall } from '@/api/accounts';

// state: 소문자 스네이크
const state = {
  id: 0,
  accountRole: '',
  email: getEmailFromCookie() || '',
  name: '',
  phoneNumber: '',
  city: '',
  street: '',
  zipCode: '',
  accessToken: '',
  refreshToken: getRefreshTokenFromCookie() || '',
};

// mutations: 대문자 스네이크
const mutations = {
  SET_ID(state, id) {
    state.id = id;
  },
  SET_ACCOUNT_ROLE(state, accountRole) {
    state.accountRole = accountRole;
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

  SET_ACCESS_TOKEN(state, accessToken) {
    state.accessToken = accessToken;
  },

  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken;
  },

  CLEAR_COOKIE(state) {
    state.email = '';
    state.accessToken = '';
    state.refreshToken = '';
  },
};

// getters: 카멜 케이스
const getters = {
  isLogin(state) {
    return state.email !== '' && state.accessToken !== '';
  },
  readId(state) {
    return state.id;
  },
  readAccountRole(state) {
    return state.accountRole;
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
    commit('SET_ACCESS_TOKEN', data.data.token.accessToken);
    saveEmailToCookie(data.data.email);
    saveRefreshTokenAtCookie(data.data.token.refreshToken);
    return data;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
