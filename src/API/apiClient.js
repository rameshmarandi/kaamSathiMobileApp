// import axios from 'axios';
// import {fetch} from 'react-native-ssl-pinning';
// import StorageKeys from '../Config/StorageKeys';
// import {getToken, refreshAccessToken} from './AuthService';

// const axiosWithPinning = async config => {
//   try {
//     const {url, method, headers, data, timeout} = config;

//     // Validate URL
//     if (!url || typeof url !== 'string') {
//       throw new Error('Invalid or missing URL for SSL Pinning');
//     }

//     // Construct full URL
//     const fullURL = `${StorageKeys.API_BASE_URL}${url}`;
//     console.log('SSL Pinning Request Config:', {
//       url,
//       method,
//       headers,
//       data,
//       fullURL,
//     });

//     // Ensure data is properly handled
//     let bodyContent;

//     // Check if the data is an object or string
//     if (data && typeof data === 'object' && !(data instanceof FormData)) {
//       bodyContent = JSON.stringify(data); // Stringify the object
//     } else if (data && typeof data === 'string') {
//       try {
//         bodyContent = JSON.parse(data); // If it's a stringified JSON, parse it back
//       } catch (error) {
//         throw new Error('Failed to parse stringified data');
//       }
//     } else {
//       bodyContent = data; // If data is already correctly formatted, use it
//     }

//     // If the method is POST but no data is provided, throw an error
//     if (method.toUpperCase() === 'POST' && !bodyContent) {
//       throw new Error('POST requests must have a request body');
//     }

//     // Perform the fetch request with SSL Pinning
//     const response = await fetch(fullURL, {
//       method: method?.toUpperCase() || 'GET', // Default to GET if method is undefined
//       headers: {
//         ...headers,
//         ...(data instanceof FormData
//           ? {} // Do not set Content-Type, fetch handles it for FormData
//           : {'Content-Type': 'application/json'}), // Default Content-Type for JSON
//       },
//       body: bodyContent, // Attach the body content
//       sslPinning: {
//         certs: ['cert'], // Replace 'cert' with the actual certificate name (no extension)
//       },
//       timeoutInterval: timeout || 15000, // Default timeout 15s
//     });

//     // Parse response data if available
//     let responseData = null;
//     if (response.bodyString) {
//       try {
//         responseData = JSON.parse(response.bodyString);
//       } catch (error) {
//         console.warn('Failed to parse response body:', error);
//       }
//     }

//     console.log('SSL Pinning Response:', {
//       status: response.status,
//       statusText: response.statusText,
//       headers: response.headers,
//       data: responseData,
//     });

//     return {
//       data: responseData,
//       status: response.status,
//       statusText: response.statusText,
//       headers: response.headers,
//       config,
//     };
//   } catch (error) {
//     console.error('SSL Pinning Error:', error);
//     throw new Error(
//       `SSL Pinning request failed for URL: ${config.url || 'Unknown'}. ${
//         error.message
//       }`,
//     );
//   }
// };

// // Create an Axios instance for public API requests
// const publicAxiosInstance = axios.create({
//   baseURL: StorageKeys.API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Create an Axios instance for authenticated API requests
// const authAxiosInstance = axios.create({
//   baseURL: StorageKeys.API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add custom adapter to integrate SSL pinning for public instance
// publicAxiosInstance.defaults.adapter = config => axiosWithPinning(config);
// authAxiosInstance.defaults.adapter = config => axiosWithPinning(config);

// // Add request interceptor for the public instance
// publicAxiosInstance.interceptors.request.use(
//   config => {
//     const fullURL = `${config.baseURL}${config.url}`;
//     console.log('Public Request URL:', fullURL);
//     return config;
//   },
//   error => Promise.reject(error),
// );

// // Add custom adapter to integrate SSL pinning for auth instance
// authAxiosInstance.defaults.adapter = config => axiosWithPinning(config);

// // Add request interceptor for the authenticated instance
// authAxiosInstance.interceptors.request.use(
//   async config => {
//     const token = await getToken(); // Get the access token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Attach the token to the headers
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// // Add response interceptor for handling token refresh
// authAxiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark request as retried
//       const newToken = await refreshAccessToken(); // Try to refresh the token

//       if (newToken) {
//         authAxiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`; // Set new token
//         originalRequest.headers.Authorization = `Bearer ${newToken}`; // Update the original request's header
//         return authAxiosInstance(originalRequest); // Retry the original request
//       }
//     }

//     console.error('Request error:', error);
//     return Promise.reject(error); // Reject if not able to refresh the token
//   },
// );

// const apiService = {
//   // Public API requests
//   getPublic: (endpoint, params = {}) =>
//     publicAxiosInstance.get(endpoint, {params}),

//   postPublic: (endpoint, data, headers = {}) =>
//     publicAxiosInstance.post(endpoint, data, {headers}),

//   postPublicFormData: (endpoint, formData) =>
//     publicAxiosInstance.post(endpoint, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     }),

//   // Authenticated API requests
//   getProtected: (endpoint, params = {}) =>
//     authAxiosInstance.get(endpoint, {params}),

//   postProtected: (endpoint, data, headers = {}) =>
//     authAxiosInstance.post(endpoint, data, {headers}),

//   postProtectedFormData: (endpoint, formData) =>
//     authAxiosInstance.post(endpoint, formData, {
//       headers: {'Content-Type': 'multipart/form-data'},
//     }),

//   putProtected: (endpoint, data, headers = {}) =>
//     authAxiosInstance.put(endpoint, data, {headers}),

//   deleteProtected: (endpoint, headers = {}) =>
//     authAxiosInstance.delete(endpoint, {headers}),
// };

// export default apiService;
import axios from 'axios';
import {fetch} from 'react-native-ssl-pinning';
import StorageKeys from '../Config/StorageKeys';
import {getToken, refreshAccessToken} from './AuthService';

const axiosWithSsl = async config => {
  try {
    const {url, method, headers, data, timeout} = config;

    // Validate URL
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid or missing URL for SSL Pinning');
    }

    // Construct full URL
    // const fullURL = `https://esourcing.icicibank.com/ERSystemAPI2/${url}`;
    const fullURL = `${StorageKeys.API_BASE_URL}${url}`;
    console.log('SSL Pinning Request Config:', {
      url,
      method,
      headers,
      data,
      fullURL,
    });

    // Prepare the body content
    let bodyContent;

    if (data) {
      // Check if data is an object (excluding FormData)
      if (data instanceof FormData) {
        bodyContent = data; // Directly use FormData as body content
      } else if (typeof data === 'object') {
        bodyContent = JSON.stringify(data); // Stringify the object
      } else if (typeof data === 'string') {
        bodyContent = data; // Handle stringified or encoded payload
      }
    }

    // If POST request, ensure there is body content
    if (method.toUpperCase() === 'POST' && !bodyContent) {
      throw new Error('POST requests must have a request body');
    }

    // Perform the fetch request with SSL Pinning
    const response = await fetch(fullURL, {
      method: method?.toUpperCase() || 'GET', // Default to GET if method is undefined
      headers: {
        ...headers,
        ...(data instanceof FormData
          ? {} // Do not set Content-Type for FormData, fetch handles it
          : {'Content-Type': 'application/json'}), // Default Content-Type for JSON
      },
      body: bodyContent, // Attach the body content
      sslPinning: {
        // certs: ['ServerCertificate', 'Intermediate', 'Root'],

        certs: ['cert'], // Replace 'cert' with the actual certificate name (no extension)
      },
      timeoutInterval: timeout || 15000, // Default timeout 15s
    });

    // Parse response data if available
    let responseData = null;
    if (response.bodyString) {
      try {
        responseData = JSON.parse(response.bodyString);
      } catch (error) {
        console.warn('Failed to parse response body:', error);
      }
    }

    console.log('SSL Pinning Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: responseData,
    });

    return {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config,
    };
  } catch (error) {
    console.error('SSL Pinning Error:', error);
    throw new Error(
      `SSL Pinning request failed for URL: ${config.url || 'Unknown'}. ${
        error.message
      }`,
    );
  }
};

// Create Axios instances for public and authenticated API requests
const publicAxiosInstance = axios.create({
  baseURL: StorageKeys.API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

const authAxiosInstance = axios.create({
  baseURL: StorageKeys.API_BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

// Add custom adapter for SSL pinning for both public and authenticated instances
publicAxiosInstance.defaults.adapter = config => axiosWithSsl(config);
authAxiosInstance.defaults.adapter = config => axiosWithSsl(config);

// Add request interceptors for public and authenticated instances
publicAxiosInstance.interceptors.request.use(
  config => {
    const fullURL = `${config.baseURL}${config.url}`;
    console.log('Public Request URL:', fullURL);
    return config;
  },
  error => Promise.reject(error),
);

authAxiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken(); // Get the access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token if available
    }
    return config;
  },
  error => Promise.reject(error),
);

// Export the API service with public and private methods
const apiService = {
  // Public API requests
  getPublic: (endpoint, params = {}) =>
    publicAxiosInstance.get(endpoint, {params}),

  postPublic: (endpoint, data, headers = {}) =>
    publicAxiosInstance.post(endpoint, data, {headers}),

  postPublicFormData: (endpoint, formData) =>
    publicAxiosInstance.post(endpoint, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    }),

  // Authenticated API requests
  getProtected: (endpoint, params = {}) =>
    authAxiosInstance.get(endpoint, {params}),

  postProtected: (endpoint, data, headers = {}) =>
    authAxiosInstance.post(endpoint, data, {headers}),

  postProtectedFormData: (endpoint, formData) =>
    authAxiosInstance.post(endpoint, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    }),

  putProtected: (endpoint, data, headers = {}) =>
    authAxiosInstance.put(endpoint, data, {headers}),

  deleteProtected: (endpoint, headers = {}) =>
    authAxiosInstance.delete(endpoint, {headers}),
};

export default apiService;
