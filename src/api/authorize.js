import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const accountEndPoint = '/api/authorizes';

const instance = createInstance();

export function sendEmail(param) {
  return instance.get(accountEndPoint + '/send' + '?toEmail=' + param.toEmail);
}

export function checkAuthHash(param) {
  return instance.get(
    accountEndPoint +
      '/check' +
      '?email=' +
      param.email +
      '&hash=' +
      param.hash,
  );
}
