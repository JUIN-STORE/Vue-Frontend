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

function readAllProduct() {
  return instance.get(productEndPoint);
}

export { readAllProduct };

// 1번째
