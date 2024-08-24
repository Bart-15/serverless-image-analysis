import axios, { AxiosInstance } from 'axios';

export const axs: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
});

export const setHeaderToken = (token: string) => {
  axs.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete axs.defaults.headers.common.Authorization;
};
