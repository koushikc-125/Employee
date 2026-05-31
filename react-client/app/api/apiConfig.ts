import axios, { AxiosError } from 'axios';

import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  serverCookie?: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomConfig;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const isServer = typeof window === "undefined";
        const refreshHeaders = isServer && originalRequest.headers["Cookie"] ? { Cookie: originalRequest.headers["Cookie"] } : {};

        const refreshResponse = await axios.post(
          "http://localhost:3000/api/v1/user/refreshAccessToken",
          {},
          { withCredentials: true, headers: refreshHeaders }
        );

        if (isServer) {
          const newCookies = refreshResponse.headers["set-cookie"];
          if (newCookies) {
            originalRequest.headers["Cookie"] = newCookies.join(", ");
            (originalRequest as any)._newCookiesFromServer = newCookies;
          }
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  }
);

export default apiClient;

