// 1번 째

import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
  });
  return setInterceptors(instance);
}

const orderEndPoint = '/api/orders';

const instance = createInstance();

function createOrder(request) {
  return instance.post(orderEndPoint + '/new', request);
}

function cancelOrder(payload) {
  return instance.delete(orderEndPoint + '/cancel', { data: payload });
}

function getOrderList(startDate, endDate, orderStatus, size, page) {
  return instance.get(
    orderEndPoint +
      '?startDate=' +
      startDate +
      '&endDate=' +
      endDate +
      '&orderStatus=' +
      orderStatus +
      '&size=' +
      size +
      '&page=' +
      (page - 1),
  );
}

export { createOrder, cancelOrder, getOrderList };
