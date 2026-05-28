import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 60000
});

// Inject auth token into requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pic2latex_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const convertImage = async (imageId, options) => {
  const response = await api.post('/convert', {
    imageId,
    options
  });

  return response.data;
};

export const testApiConnection = async (endpoint, apiKey, model) => {
  const response = await api.post('/config/test', {
    endpoint,
    apiKey,
    model
  });

  return response.data;
};

// Auth API
export const apiRegister = async (username, password) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const apiLogin = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const apiGetMe = async (token) => {
  const response = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// History API
export const apiGetHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const apiSaveHistory = async (item) => {
  const response = await api.post('/history', item);
  return response.data;
};

export const apiDeleteHistory = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export default api;
