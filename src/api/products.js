import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}

const productEndPoint = '/api/products';

const instance = createInstance();

function readAllProduct(page, size, categoryId) {
  let apiEndPoint = productEndPoint + '?page=' + page + '&size=' + size;

  if (categoryId > 0) {
    apiEndPoint =
      productEndPoint +
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
  return instance.get(productEndPoint + '/count');
}

function searchCall(page, size, searchTitle) {
  return instance.get(
    productEndPoint +
      '/search?productName=' +
      searchTitle +
      '&page=' +
      page +
      '&size=' +
      size,
  );
}

function searchCountCall(searchTitle) {
  return instance.get(
    productEndPoint + '/search/count' + '?productName=' + searchTitle,
  );
}

function detailCall(productId) {
  return instance.get(productEndPoint + '/' + productId);
}

export {
  readAllProduct,
  allCountCall,
  searchCall,
  searchCountCall,
  detailCall,
};

// 1번째
