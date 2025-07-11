import axios from 'axios';
import type { LoginForm } from './login.types';

interface LoginResponse {
  ok: boolean;
  usuario: {
    nombre: string;
    email: string;
  };
}


import { API_URL } from '@env';

export const loginUsuario = async (data: LoginForm): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API_URL}/login`, data);
  return res.data;
};
