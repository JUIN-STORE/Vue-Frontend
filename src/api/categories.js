import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const categoryEndPoint = '/api/categories';

const instance = createInstance();

function categoriesCall() {
  return instance.get(categoryEndPoint);
}

function createCategoryCall(createRequest) {
  return instance.post(categoryEndPoint + '/admin/new', createRequest);
}

export { categoriesCall, createCategoryCall };

// 1번째
