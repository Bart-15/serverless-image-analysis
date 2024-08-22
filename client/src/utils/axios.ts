import axios, { AxiosInstance } from 'axios';

export const axs: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
});
