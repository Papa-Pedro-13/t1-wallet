import axios from 'axios';
import { getTokenFromLocalStorage } from '../../shared/lib/storage';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: getTokenFromLocalStorage(),
  },
});
