import { searchCall } from '@/api/products';

// state: 소문자 스네이크
const state = {
  searchTitle: '',
};

// mutations: 대문자 스네이크
const mutations = {
  SET_SEARCH_TITLE(state, searchTitle) {
    state.searchTitle = searchTitle;
  },
};

// getters: 카멜 케이스
const getters = {
  getSearchTitle(state) {
    return state.searchTitle;
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
