import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const instance = createInstance();

function signUpCall(signupRequest) {
  return instance.post('/api/accounts/sign-up', signupRequest);
}

function loginCall(loginRequest) {
  return instance.post('/api/accounts/login', loginRequest);
}

function profileCall() {
  return instance.get('/api/accounts/profile');
}

function modifyCall(updateRequest) {
  return instance.patch('/api/accounts/modify', updateRequest);
}

function removeCall() {
  return instance.delete('/api/accounts/remove');
}

export { signUpCall, loginCall, profileCall, modifyCall, removeCall };

// 1번째
