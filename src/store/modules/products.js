import { detailCall, searchCall } from '@/api/products';

// state: 소문자 스네이크
const state = {
  product: {},
  searchTitle: '',
};

// mutations: 대문자 스네이크
const mutations = {
  SET_SEARCH_TITLE(state, searchTitle) {
    state.searchTitle = searchTitle;
  },
  SET_PRODUCT(state, product) {
    state.product = product;
  },
};

// getters: 카멜 케이스
const getters = {
  getSearchTitle(state) {
    return state.searchTitle;
  },
  getProduct(state) {
    return state.product;
  },
};

// actions: 카멜 케이스
const actions = {
  async searchAction({ commit }, payload) {
    let page = payload.p;
    let size = payload.s;
    let searchTitle = payload.st;

    const { data } = await searchCall(page, size, searchTitle);
    return data.data;
  },

  async detailAction({ commit }, productId) {
    const { data } = await detailCall(productId);
    let p = data.data;
    commit('SET_PRODUCT', p);
    return p;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
