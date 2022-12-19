import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const instance = createInstance();

function reIssueToken() {
  return instance.post('/api/tokens/re-issue');
}

export { reIssueToken };
