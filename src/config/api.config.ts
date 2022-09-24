import axios from 'axios';
import { PathApi } from './api.path.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchClient = () => {

  let token = AsyncStorage.getItem('token');
  console.log(token);

  const defaultOptions = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: token ? 'Bearer ' + token : '',
    },
  };

  let instance = axios.create(defaultOptions);

  return instance;

};

export const apiClient = {

  get(path: string) {
    return fetchClient().get(`${PathApi.BASE_URL}${path}`);
  },

  post(path: string, params: any, headers?: any) {
    return fetchClient().post(`${PathApi.BASE_URL}${path}`, params, headers);
  },

  patch(path: string, params: any) {
    return fetchClient().patch(`${PathApi.BASE_URL}${path}`, params);
  },

  delete(path: string) {
    return fetchClient().delete(`${PathApi.BASE_URL}${path}`);
  },

  upload(path: string, params: any) {
    return fetchClient().post(`${PathApi.BASE_URL}${path}`, params, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
      },
    });
  },

};

export default apiClient;
