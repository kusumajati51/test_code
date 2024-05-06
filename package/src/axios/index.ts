import { router } from '@/router';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    // Add logic here to intercept requests, e.g., adding headers
    const token = localStorage.getItem('token');
     if (token) {
         config.headers.Authorization = `Bearer ${token}`;
     }
    return config;
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                router.push('/auth/login');
            } else {
                // Show a generic error message
                alert('An error occurred. Please try again later.');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
