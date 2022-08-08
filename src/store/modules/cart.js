import { addCountCall, clearCartCall, updateQuantityCall } from '@/api/carts';

// state: 소문자 스네이크
const state = {
  cart_list: [],
  total: 0,
  count: 0,
};

// mutations: 대문자 스네이크
const mutations = {
  RESET_STATE(state) {
    state.cart_list = [];
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
          productName: item.productName,
          img: item.img,
          price: item.price,
          count: 1,
        });

    state.cart_list = result;
    // state.cart_list.push(item);
  },

  SET_QUANTITY(state, arr) {
    const id = arr[0];
    const count = arr[1];

    state.cart_list.forEach((each, index) => {
      if (each.id == id) {
        state.cart_list[index].count = count;
      }
    });
  },

  DEL_ITEM(state, id) {
    state.cart_list.forEach((each, index) => {
      if (each.id == id) {
        state.cart_list.splice(index, 1);
      }
    });
  },
};

// getters: 카멜 케이스
const getters = {
  getCart(state) {
    return state.cart_list;
  },

  itemsInCart(state) {
    return state.cart_list.length;
  },

  getTotal(state) {
    return state.total;
  },
};

// actions: 카멜 케이스
const actions = {
  // eslint-disable-next-line no-unused-vars
  async addCart({ commit }, payload) {
    const { data } = await addCountCall(payload);
    return data;
  },

  async clearCartAction({ commit }, payload) {
    const { data } = await clearCartCall(payload);
    return data;
  },

  async updateQuantity({ commit }, payload) {
    const { data } = await updateQuantityCall(payload);
    console.log(state.count);
    console.log(Number(payload.count));
    // commit(this.SET_QUANTITY, payload.count);
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
