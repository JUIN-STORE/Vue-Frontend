import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const accountEndPoint = '/api/accounts';

const instance = createInstance();

function signUpCall(signupRequest) {
  return instance.post(accountEndPoint + '/sign-up', signupRequest);
}

function loginCall(loginRequest) {
  return instance.post(accountEndPoint + '/login', loginRequest);
}

function logoutCall() {
  return instance.get(accountEndPoint + '/logout');
}

function profileCall() {
  return instance.get(accountEndPoint + '/profile');
}

function modifyCall(updateRequest) {
  return instance.patch(accountEndPoint, updateRequest);
}

function removeCall(accountId) {
  return instance.delete(accountEndPoint + '/' + accountId);
}

export {
  signUpCall,
  loginCall,
  logoutCall,
  profileCall,
  modifyCall,
  removeCall,
};

// 1번째
