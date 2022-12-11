import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
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

function allCountCall() {
  return instance.get(itemEndPoint + '/count');
}

function searchCall(page, size, searchTitle) {
  return instance.get(
    itemEndPoint +
      '/search?itemName=' +
      searchTitle +
      '&page=' +
      page +
      '&size=' +
      size,
  );
}

function searchCountCall(searchTitle) {
  return instance.get(
    itemEndPoint + '/search/count' + '?itemName=' + searchTitle,
  );
}

function detailCall(itemId) {
  return instance.get(itemEndPoint + '/' + itemId);
}

export { readAllItem, allCountCall, searchCall, searchCountCall, detailCall };

// 1번째
