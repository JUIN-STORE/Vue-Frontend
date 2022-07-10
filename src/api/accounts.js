import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

function registerUser(payload) {
  return instance.post('/accounts/signup', payload);
}

function loginUser(payload) {
  return instance.post('/accounts/login', payload);
}
export { registerUser, loginUser };
