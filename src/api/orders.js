// 1번 째

import axios from 'axios';
import { setInterceptors } from './common/interceptors';
import { getAuthFromCookie } from '@/utils/cookies';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const orderEndPoint = '/api/orders';

const instance = createInstance();

function createOrder(request) {
  return instance.post(orderEndPoint + '/new', request);
}

function cancelOrder(payload) {
  return instance.delete(orderEndPoint + '/cancel', { data: payload });
}

export { createOrder, cancelOrder };
