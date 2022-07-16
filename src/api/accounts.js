import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const instance = createInstance();

function signup(signupRequest) {
  return instance.post('/api/accounts/signup', signupRequest);
}

function login(loginRequest) {
  return instance.post('/api/accounts/login', loginRequest);
}

function profile() {
  return instance.get('/api/accounts/profile');
}

function modify(updateRequest) {
  return instance.post('/api/accounts/modify', updateRequest);
}

export { signup, login, profile, modify };

// 1번째
