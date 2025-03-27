import axios from "axios";
import { AuthService } from "./authService";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

const getToken = async (): Promise<string | null> => {
  try {
    const response = await fetch("/api/auth/getToken");
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Erro ao buscar token:", error);
    return null;
  }
};

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();

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
  (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const isLoginRequest = originalRequest?.url?.includes("/login");

    if (isUnauthorized && !isLoginRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      AuthService.logout();
      window.location.href = "/login";
    }

    return Promise.reject({
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default apiClient;
