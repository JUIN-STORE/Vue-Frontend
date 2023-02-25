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

export function signUpCall(signupRequest) {
  return instance.post(accountEndPoint + '/sign-up', signupRequest);
}

export function sendPasswordEmail(param) {
  return instance.get(
    accountEndPoint +
      '/mail' +
      '?identification=' +
      param.identification +
      '&email=' +
      param.email,
  );
}

export function changePassword(param) {
  return instance.put(accountEndPoint + '/password', param);
}

export function checkDuplicatedIdentification(identification) {
  return instance.get(accountEndPoint + '/duplication' + '/' + identification);
}

export function loginCall(loginRequest) {
  return instance.post(accountEndPoint + '/login', loginRequest);
}

export function logoutCall() {
  return instance.get(accountEndPoint + '/logout');
}

export function profileCall() {
  return instance.get(accountEndPoint + '/profile');
}

export function modifyCall(updateRequest) {
  return instance.patch(accountEndPoint, updateRequest);
}

export function removeCall(accountId) {
  return instance.delete(accountEndPoint + '/' + accountId);
}
