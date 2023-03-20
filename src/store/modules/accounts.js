import {
  getEmailFromCookie,
  saveEmailToCookie,
  saveRefreshTokenAtCookie,
  getRefreshTokenFromCookie,
} from '@/utils/cookies';
import { signIn } from '@/api/accounts';

// state: 소문자 스네이크
const state = {
  id: 0,
  identification: '',
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
  SET_IDENTIFICATION(state, identification) {
    state.identification = identification;
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
  isSignIn(state) {
    return state.identification !== '' && state.accessToken !== '';
  },
  getIdentification(state) {
    return state.identification;
  },
  getAccessToken(state) {
    return state.accessToken;
  },
  getId(state) {
    return state.id;
  },
  getAccountRole(state) {
    return state.accountRole;
  },
  getEmail(state) {
    return state.email;
  },
  getName(state) {
    return state.name;
  },
  getPhoneNumber(state) {
    return state.phoneNumber;
  },
  getCity(state) {
    return state.city;
  },
  getStreet(state) {
    return state.street;
  },
  getZipCode(state) {
    return state.zipCode;
  },
};

// actions: 카멜 케이스
const actions = {
  async signInSetting({ commit }, payload) {
    const { data } = await signIn(payload);
    commit('SET_IDENTIFICATION', data.data.identification);
    commit('SET_ACCESS_TOKEN', data.data.token.accessToken);
    saveEmailToCookie(data.data.email);
    saveRefreshTokenAtCookie(data.data.token.refreshToken);
    return data;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
