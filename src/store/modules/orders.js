import { createOrder } from '@/api/orders';

// state: 소문자 스네이크
const state = {
  count: 0,
  grandTotal: 0,
  orderStatus: 'READY',
  productIdList: [],
};

// mutations: 대문자 스네이크
const mutations = {
  SET_COUNT(state, count) {
    console.log('count = ', count);
    state.count = count;
    console.log('state.count = ', state.count);
  },

  SET_GRAND_TOTAL(state, grandTotal) {
    state.grandTotal = grandTotal;
  },

  SET_PRODUCT_ID_LIST(state, productIdList) {
    state.productIdList = productIdList;
  },
};

// getters: 카멜 케이스
const getters = {
  getCount(state) {
    return state.count;
  },

  getGrandTotal(state) {
    return state.grandTotal;
  },

  getOrderStatus(state) {
    return state.orderStatus;
  },

  getProductIdList(state) {
    return state.productIdList;
  },
};

// actions: 카멜 케이스
const actions = {
  async createOrderAction({ commit }, payload) {
    const { data } = await createOrder(payload);
    return data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
