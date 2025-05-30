// src/services/authService.js
import axios from 'axios';

export const loginService = async (email, senha) => {
  const response = await axios.post('http://192.168.15.4:5000/api/auth/login', {
    email,
    senha,
  });
  console.log('Resposta da API:', response.data);
  return response.data;
};
