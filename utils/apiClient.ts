import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Create the axios instance
export const apiClient = axios.create({
    baseURL: '/', // Assuming we hit same-domain /api/ routes usually
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to automatically attach the token
apiClient.interceptors.request.use(
    (config) => {
        // Only run on the client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401s globally
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // If the API returns a 401 Unauthorized, the token is likely invalid or expired.
        if (error.response && error.response.status === 401) {
            // Log the user out using our global Zustand store
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);

export default apiClient;
