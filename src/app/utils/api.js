import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.BANK_API_BASE_URL,
});


export default apiClient;