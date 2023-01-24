import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const categoryEndPoint = '/api/categories';

const instance = createInstance();

function categoriesCall() {
  return instance.get(categoryEndPoint);
}

function createCategoryCall(createRequest) {
  return instance.post('/api/admin/categories', createRequest);
}

export { categoriesCall, createCategoryCall };

// 1번째
