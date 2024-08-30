import axios from 'axios';
import { getTokenFromLocalStorage } from '../../shared/lib/storage';

export const instance = axios.create({
  baseURL: 'http://10.4.56.90:3000/api',
  headers: {
    Authorization: getTokenFromLocalStorage(),
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
