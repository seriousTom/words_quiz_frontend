import axios from 'axios';
import {API_BASE_URL} from "../config/env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/RootNavigation';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// Attach token automatically
axiosClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Auto logout on 401
let isLoggingOut = false;
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && !isLoggingOut) {
            isLoggingOut = true;
            await AsyncStorage.removeItem('token');
            navigate('Login');
            isLoggingOut = false;
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
