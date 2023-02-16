import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const itemEndPoint = '/api/items';

const instance = createInstance();

export function readAllItem(page, size) {
  const apiEndPoint = itemEndPoint + '?page=' + page + '&size=' + size;

  return instance.get(apiEndPoint);
}

export function searchItem(page, size, categoryId, name) {
  let apiEndPoint =
    itemEndPoint + '/search' + '?page=' + page + '&size=' + size;

  if (categoryId != undefined && categoryId > 0)
    apiEndPoint += '&categoryId=' + categoryId;

  if (name != undefined && name !== '') apiEndPoint += '&name=' + name;

  return instance.get(apiEndPoint);
}

export function detailCall(itemId) {
  return instance.get(itemEndPoint + '/' + itemId);
}
