import axios from 'axios';

// Construct the base URL safely, ensuring /api is always appended.
const base = import.meta.env.VITE_API_BASE_URL || '';
const apiClient = axios.create({
    baseURL: `${base}/api`,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient; 