import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return setInterceptors(instance);
}

const productEndPoint = '/api/products';

const instance = createInstance();

function adminRegister(registerRequest) {
  return instance.postForm(
    productEndPoint + '/admin/register',
    registerRequest,
  );
}

export { adminRegister };

// 1번째
