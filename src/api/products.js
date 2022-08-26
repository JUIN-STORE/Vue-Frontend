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

function readAllProduct(page, size) {
  return instance.get(productEndPoint + '?page=' + page + '&size=' + size);
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
