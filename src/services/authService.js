// src/services/authService.js
import axios from 'axios';

export const loginService = async (email, senha) => {
  const response = await axios.post('https://acclp-mobile-back.onrender.com/api/auth/login', {
    email,
    senha,
  });
  console.log('Resposta da API:', response.data);
  return response.data;
};
