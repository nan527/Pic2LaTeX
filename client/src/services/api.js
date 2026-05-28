import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 60000
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

export default api;
