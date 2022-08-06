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

// function readFirst(page, size) {
//   return instance.get(cartEndPoint + '?page=' + page + '&size=' + size);
// }

function readCount() {
  return instance.get(cartEndPoint + '/count');
}

function addCount(payload) {
  return instance.post(cartEndPoint + '/add', payload);
}

export { readCount, addCount };

// 1번째
