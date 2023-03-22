import { detailCall, searchItem, readAllItem } from '@/api/items';

// state: 소문자 스네이크
const state = {
  item: {},
  searchTitle: null,
  categoryId: null,
  personalColor: null,
};

// mutations: 대문자 스네이크
const mutations = {
  SET_CATEGORY_ID(state, categoryId) {
    state.categoryId = categoryId;
  },
  SET_SEARCH_TITLE(state, searchTitle) {
    state.searchTitle = searchTitle;
  },
  SET_PERSONAL_COLOR(state, personalColor) {
    state.personalColor = personalColor;
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
  getPersonalColor(state) {
    return state.personalColor;
  },
};

// actions: 카멜 케이스
const actions = {
  async readAllAction({ commit }, payload) {
    const page = payload.p;
    const size = payload.s;

    const { data } = await readAllItem(page, size);
    return data.data;
  },

  async searchAction({ commit }, payload) {
    let page = payload.p;
    let size = payload.s;
    let categoryId = payload.ci;
    let searchTitle = payload.st;
    let personalColor = payload.pc;

    const { data } = await searchItem(
      page,
      size,
      categoryId,
      searchTitle,
      personalColor,
    );
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
