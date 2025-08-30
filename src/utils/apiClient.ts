import useUserStore from '@/stores/useUserStore';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalRequest.url?.endsWith('/users/login/')) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      (error.response?.data as { code?: string })?.code === 'user_not_found' 
    ) {
      useUserStore.getState().setUser(null);
      return Promise.reject(error);
    }

    if (originalRequest.url?.endsWith('/users/refresh/')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/users/refresh/');
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
