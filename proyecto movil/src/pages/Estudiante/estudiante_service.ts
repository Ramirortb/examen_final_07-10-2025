import axios from 'axios';
import type { LoginForm } from './login.types';

interface LoginResponse {
  ok: boolean;
  usuario: {
    nombre: string;
    email: string;
  };
}


const API_URL = 'https://tuservidor.com/api'; 

export const loginUsuario = async (data: LoginForm): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return response.data;
};
