import axios from 'axios';
import type { Mensaje } from '../types/mensajes.types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const obtenerMensajes = async (): Promise<Mensaje[]> => {
  const res = await axios.get(`${API_URL}/mensaje`);
  return res.data;
};

export const crearMensaje = async (contenido: string): Promise<Mensaje> => {
  const res = await axios.post(`${API_URL}/mensaje`, { contenido });
  return res.data;
};

export const actualizarMensaje = async (id: number, contenido: string): Promise<Mensaje> => {
  const res = await axios.put(`${API_URL}/mensaje/${id}`, { contenido });
  return res.data;
};

export const eliminarMensaje = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/mensaje/${id}`);
};
