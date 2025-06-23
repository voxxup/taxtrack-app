import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosHttp = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const axiosHttpWithAuth = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
  },
});

export { axiosHttp, axiosHttpWithAuth };