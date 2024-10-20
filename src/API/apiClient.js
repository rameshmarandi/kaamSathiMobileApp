import axios from 'axios';

import {getToken, refreshAccessToken} from './authService'; // Functions to manage tokens
import StorageKeys from '../Config/StorageKeys';

// Create an Axios instance for public API requests
const publicAxiosInstance = axios.create({
  baseURL: StorageKeys.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an Axios instance for authenticated API requests
const authAxiosInstance = axios.create({
  baseURL: StorageKeys.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for the authenticated instance
authAxiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken(); // Get the access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the headers
    }
    return config;
  },
  error => Promise.reject(error),
);

// Add response interceptor for handling token refresh
authAxiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check for 401 status (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried
      const newToken = await refreshAccessToken(); // Try to refresh the token

      if (newToken) {
        authAxiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`; // Set new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`; // Update the original request's header
        return authAxiosInstance(originalRequest); // Retry the original request
      }
    }

    return Promise.reject(error); // Reject if not able to refresh the token
  },
);

// Centralized API methods
const apiService = {
  // Public API requests
  getPublic: (endpoint, params = {}) =>
    publicAxiosInstance.get(endpoint, {params}),
  postPublic: (endpoint, data) => publicAxiosInstance.post(endpoint, data),

  // Authenticated API requests
  getProtected: (endpoint, params = {}) =>
    authAxiosInstance.get(endpoint, {params}),
  postProtected: (endpoint, data) => authAxiosInstance.post(endpoint, data),
  putProtected: (endpoint, data) => authAxiosInstance.put(endpoint, data),
  deleteProtected: endpoint => authAxiosInstance.delete(endpoint),
};

export default apiService;
