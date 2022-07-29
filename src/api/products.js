import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const productEndPoint = '/api/products';

const instance = createInstance();

function readAllProduct(page, size) {
  return instance.get(productEndPoint + '?page=' + page + '&size=' + size);
}

function readCount() {
  return instance.get(productEndPoint + '/count');
}

export { readAllProduct, readCount };

// 1번째
