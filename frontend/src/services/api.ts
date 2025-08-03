import axios from 'axios';

// Detectar o ambiente e definir a URL correta da API
const getApiUrl = () => {
  // Em desenvolvimento local fora do Docker
  if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
    return process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
  }
  
  // Em produção ou dentro do Docker
  return process.env.REACT_APP_API_URL || 'http://backend:3000/api';
};

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;