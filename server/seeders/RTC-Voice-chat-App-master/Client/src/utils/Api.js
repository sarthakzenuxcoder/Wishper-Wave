import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const options = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
};

const api = async (url, data) => {
  return await axios.post(BASE_URL + url, data, options);
};

export default api;

export const getApi = async (url) => {
  return await axios.get(BASE_URL + url, options);
};

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to unauthorized access (status code 401)
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        // Attempt to refresh the token
        const { data } = await axios.get(BASE_URL + '/api/refresh', options);
        console.log(data);
        // Update the access token in the request headers with the new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        // Retry the original request with the updated access token
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle refresh token request error
        console.error('Refresh token request failed:', refreshError);

        // Redirect to login or handle the error appropriately
        // For example, you might want to clear authentication state and redirect to login
        // history.push('/login');
        throw refreshError;
      }
    }

    // If the error is not related to unauthorized access or refresh token, throw it
    throw error;
  }
);
