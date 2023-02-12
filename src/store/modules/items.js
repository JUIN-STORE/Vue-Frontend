import { detailCall, readAllItem } from '@/api/items';

// state: 소문자 스네이크
const state = {
  item: {},
  searchTitle: null,
  categoryId: null,
};

// mutations: 대문자 스네이크
const mutations = {
  SET_CATEGORY_ID(state, categoryId) {
    state.categoryId = categoryId;
  },
  SET_SEARCH_TITLE(state, searchTitle) {
    state.searchTitle = searchTitle;
  },
  SET_ITEM(state, item) {
    state.item = item;
  },
};

// getters: 카멜 케이스
const getters = {
  getCategoryId(state) {
    return state.categoryId;
  },
  getSearchTitle(state) {
    return state.searchTitle;
  },
  getItem(state) {
    return state.item;
  },
};

// actions: 카멜 케이스
const actions = {
  async searchAction({ commit }, payload) {
    let page = payload.p;
    let size = payload.s;
    let categoryId = payload.ci;
    let searchTitle = payload.st;

    const { data } = await readAllItem(page, size, categoryId, searchTitle);
    return data.data;
  },

  async detailAction({ commit }, itemId) {
    const { data } = await detailCall(itemId);
    let p = data.data;
    commit('SET_ITEM', p);
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
