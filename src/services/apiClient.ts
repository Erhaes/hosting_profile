import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL_STORAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor untuk menambahkan headers dinamis jika diperlukan
apiClient.interceptors.request.use(
  (config) => {
    // Pastikan Content-Type selalu ada untuk POST requests
    if (config.method === 'post' && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handling error yang lebih baik
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const isAxiosError = axios.isAxiosError;

export default apiClient;