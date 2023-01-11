import { createOrder } from '@/api/orders';

// state: 소문자 스네이크
const state = {
  count: 0,
  grandTotal: 0,
  orderStatus: 'READY',
  deliveryReceiver: {
    receiverName: '',
    receiverPhoneNumber: '',
    receiverEmail: '',
  },
  deliveryAddress: {
    zipCode: '',
    city: '',
    street: '',
    defaultAddress: true,
  },
  itemList: [],
};

// mutations: 대문자 스네이크
const mutations = {
  SET_COUNT(state, count) {
    state.count = count;
  },

  SET_GRAND_TOTAL(state, grandTotal) {
    state.grandTotal = grandTotal;
  },

  SET_ITEM_LIST(state, itemList) {
    state.itemList = itemList;
  },

  SET_DELIVERY_RECEIVER(state, deliveryReceiver) {
    state.deliveryReceiver = deliveryReceiver;
  },

  SET_DELIVERY_ADDRESS(state, deliveryAddress) {
    state.deliveryAddress = deliveryAddress;
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

  getItemList(state) {
    return state.itemList;
  },

  getDeliveryReceiver(state) {
    return state.deliveryReceiver;
  },

  getDeliveryAddress(state) {
    return state.deliveryAddress;
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
