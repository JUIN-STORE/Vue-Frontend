import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const reviewEndPoint = '/api/reviews';

const instance = createInstance();

export function createCall(payload) {
  return instance.post(reviewEndPoint, payload);
}

export function modifyCall(reviewId, payload) {
  return instance.put(reviewEndPoint + '/' + reviewId, payload);
}

export function removeCall(reviewId) {
  return instance.delete(reviewEndPoint + '/' + reviewId);
}

export function readCall(itemId, page, size) {
  const apiEndPoint =
    reviewEndPoint + '?itemId=' + itemId + '&page=' + page + '&size=' + size;

  return instance.get(apiEndPoint);
}
