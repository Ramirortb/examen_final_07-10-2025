import axios from 'axios';
import type { NotificacionForm, NotificacionRequest } from './notificacion_types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerNotificacion = async (): Promise<NotificacionForm[]> => {
  const res = await axios.get(`${API_URL}/notificacion`);
  return res.data;
};
export const enviarNotificacion = async (data: NotificacionRequest) => {
  await axios.post(`${API_URL}/notificacion`, data);
};

export const actualizarnotificacion = async (id: number, usuario_id: string,tipo: string, titulo: string, mensaje: string) => {
  const res = await axios.put(`${API_URL}/mensaje/${id}, ${ usuario_id }, ${ tipo }, ${ titulo }, ${mensaje}`);
  return res.data;
};

export const eliminarnotificacion = async (id: number) => {
  const res = await axios.delete(`${API_URL}/mensaje/${id}`);
  return res.data;
};