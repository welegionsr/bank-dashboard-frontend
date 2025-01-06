import axios from 'axios';
import { globalLogout } from './logout';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BANK_API_BASE_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const errorCode = error.response?.data?.code;
            if (errorCode === 'SESSION_EXPIRED' || errorCode === 'INVALID_TOKEN') {
                globalLogout();
            }
        }
        return Promise.reject(error);
    }
);


export default apiClient;