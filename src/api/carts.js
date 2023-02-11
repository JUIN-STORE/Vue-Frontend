import axios from 'axios';
import { setInterceptors } from './common/interceptors';
import routes from '@/routes';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const cartEndPoint = '/api/carts';

const instance = createInstance();

export function readCall() {
  return instance.get(cartEndPoint);
}

export function readCount() {
  return instance.get(cartEndPoint + '/count');
}

export function addCountCall(payload) {
  return instance.post(cartEndPoint + '/add', payload);
}

export function updateQuantityCall(payload) {
  return instance.put(cartEndPoint + '/quantity', payload);
}

export function readBuyInfoCartCall(param) {
  return instance.get(cartEndPoint + '/buy' + '?itemIdList=' + param);
}

export function clearCartCall(param) {
  return instance.delete(cartEndPoint + '?itemIdList=' + param);
}

// 1번째
