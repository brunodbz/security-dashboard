import axios from 'axios';

// Detectar se estamos em ambiente de desenvolvimento local ou Docker
const getApiUrl = () => {
  // Se estiver rodando no Docker, usa o nome do serviço
  if (window.location.hostname === 'localhost' && window.location.port === '') {
    return 'http://backend:3000/api';
  }
  // Para desenvolvimento local fora do Docker
  return process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
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