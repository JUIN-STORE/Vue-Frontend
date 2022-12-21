import router from '@/routes';
import store from '@/store/index';
import { reIssueToken } from '../tokens';

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.common['Authorization'] = store.state.accounts.accessToken;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      if (error.response.status == 401) {
        await store.commit('accounts/SET_ACCESS_TOKEN', '');
        const { data } = await reIssueToken();

        if (data.result == 200) {
          await store.commit(
            'accounts/SET_ACCESS_TOKEN',
            data.data.accessToken,
          );
        } else {
          alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
          router.push('/accounts/login');
        }
      }

      return Promise.reject(error);
    },
  );
  return instance;
}
