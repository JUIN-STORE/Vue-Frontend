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

function readAllItem(page, size, categoryId, name) {
  let apiEndPoint = itemEndPoint + '?page=' + page + '&size=' + size;

  if (categoryId != undefined && categoryId > 0)
    apiEndPoint += '&categoryId=' + categoryId;

  if (name != undefined && name !== '') apiEndPoint += '&name=' + name;

  console.log(apiEndPoint);

  return instance.get(apiEndPoint);
}

function detailCall(itemId) {
  return instance.get(itemEndPoint + '/' + itemId);
}

export { readAllItem, detailCall };

// 1번째
