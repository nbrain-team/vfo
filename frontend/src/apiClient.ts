import axios from 'axios';

// Construct the base URL safely, ensuring /api is always appended.
const base = import.meta.env.VITE_API_BASE_URL || '';
const apiClient = axios.create({
    baseURL: `${base}/api`,
    withCredentials: true,
});

// No Authorization header; rely on HttpOnly session cookie

export default apiClient; 