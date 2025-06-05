import axios from "axios";
import { getToken, setToken, clearToken } from './tokenCache';
import useAuthStore from '@/store/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

const fetchToken = async () => {
  const token = getToken();
  if (token) return token;
  const response = await fetch('/api/auth/getToken');
  const data = await response.json();
  setToken(data.token);
  return data.token;
};

apiClient.interceptors.request.use(async (config) => {
  const token = await fetchToken();
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isLoginRequest = originalRequest?.url?.includes("/login");
    if (isUnauthorized && !isLoginRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      clearToken();
      // Limpa estado de autenticação
      if (typeof window !== 'undefined') {
        useAuthStore.getState().clearAuth();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    // Preserva informações do erro original
    return Promise.reject(error);
  }
);

export default apiClient;
