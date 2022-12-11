import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const cartEndPoint = '/api/carts';

const instance = createInstance();

function readCall() {
  return instance.get(cartEndPoint);
}

function readCount() {
  return instance.get(cartEndPoint + '/count');
}

function addCountCall(payload) {
  return instance.post(cartEndPoint + '/add', payload);
}

function updateQuantityCall(payload) {
  return instance.put(cartEndPoint + '/quantity', payload);
}

function clearCartCall(payload) {
  return instance.delete(cartEndPoint + '/clear', { data: payload });
}

export function readBuyInfoCartCall(param) {
  return instance.get(cartEndPoint + '/buy' + '?itemList=' + param);
}

export { readCall, readCount, addCountCall, updateQuantityCall, clearCartCall };

// 1번째
