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

function readAllItem(page, size, categoryId) {
  let apiEndPoint = itemEndPoint + '?page=' + page + '&size=' + size;

  if (categoryId > 0) {
    apiEndPoint =
      itemEndPoint +
      '?categoryId=' +
      categoryId +
      '&page=' +
      page +
      '&size=' +
      size;
  }

  return instance.get(apiEndPoint);
}

function searchCall(page, size, searchTitle) {
  return instance.get(
    itemEndPoint +
      '/search?name=' +
      searchTitle +
      '&page=' +
      page +
      '&size=' +
      size,
  );
}

function detailCall(itemId) {
  return instance.get(itemEndPoint + '/' + itemId);
}

export { readAllItem, searchCall, detailCall };

// 1번째
