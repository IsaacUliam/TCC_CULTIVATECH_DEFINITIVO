import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Nota: No emulador Android use 'http://10.0.2.2:3333'
// Em dispositivo físico, use o IP local da sua máquina (ex: 'http://192.168.1.100:3333')
const API_URL = 'https://studious-funicular-qvwqwxp967v36775-3333.app.github.dev/';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para injetar o Token JWT em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@CultivaTech:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});