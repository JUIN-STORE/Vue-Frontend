import {
  addCountCall,
  clearCartCall,
  updateQuantityCall,
  readBuyInfoCartCall,
} from '@/api/carts';

// state: 소문자 스네이크
const state = {
  cart_list: [],
  total: 0,
};

// mutations: 대문자 스네이크
const mutations = {
  RESET_STATE(state) {
    state.cart_list = [];
  },

  SET_CART_LIST(state, catItemList) {
    state.cart_list = catItemList;
  },

  SET_ITEM(state, item) {
    // let: 변수 중복 선언 불가, 선언만 가능
    // const: 변수 중복 선언 불가, 선언과 동시에 초기화
    let result = state.cart_list;
    let resObj = result.find(resObj => resObj.id === item.id);

    resObj
      ? resObj.count++
      : result.push({
          id: item.id,
          name: item.name,
          img: item.img,
          price: item.price,
          count: 1,
        });

    state.cart_list = result;
  },

  SET_QUANTITY(state, payload) {
    const id = payload.itemId;
    const count = payload.count;

    console.log(state.cart_list);
    state.cart_list.forEach((each, index) => {
      if (each.id === id) {
        state.cart_list[index].count = count;
      }
    });
  },

  DEL_ITEM(state, id) {
    state.cart_list.forEach((each, index) => {
      if (each.itemId === id) {
        state.cart_list.splice(index, 1);
      }
    });
  },
};

// getters: 카멜 케이스
const getters = {
  getCartList(state) {
    return state.cart_list;
  },

  getCartListLength(state) {
    return state.cart_list.length;
  },

  getTotal(state) {
    return state.total;
  },
};

// actions: 카멜 케이스
const actions = {
  // eslint-disable-next-line no-unused-vars
  async addCartAction({ commit }, payload) {
    const { data } = await addCountCall(payload);
    return data;
  },

  async clearCartAction({ commit }, payload) {
    const { data } = await clearCartCall(payload);
    return data;
  },

  async updateQuantityAction({ commit }, payload) {
    commit('SET_QUANTITY', payload);
    const { data } = await updateQuantityCall(payload);
    return data.data;
  },

  async readBuyInfoCartAction({ commit }, param) {
    const { data } = await readBuyInfoCartCall(param);
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
