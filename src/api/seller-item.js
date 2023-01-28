import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const itemEndPoint = '/api/seller/items';

const instance = createInstance();

function createItem(formData) {
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  };
  return instance.post(itemEndPoint + '/register', formData, headers);
}

export { createItem };
