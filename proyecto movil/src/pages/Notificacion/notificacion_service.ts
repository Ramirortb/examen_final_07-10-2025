import axios from 'axios';
import type { NotificacionForm, NotificacionRequest } from '../types/notificacion_types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const obtenerNotificacion = async (): Promise<NotificacionForm[]> => {
  const res = await axios.get(`${API_URL}/notificacion`);
  return res.data;
};

export const enviarNotificacion = async (data: NotificacionRequest): Promise<void> => {
  await axios.post(`${API_URL}/notificacion`, data);
};

export const actualizarNotificacion = async (
  id: number,
  usuario_id: string,
  tipo: string,
  titulo: string,
  mensaje: string
): Promise<NotificacionForm> => {
  const res = await axios.put(`${API_URL}/notificacion/${id}`, {
    usuario_id,
    tipo,
    titulo,
    mensaje,
  });
  return res.data;
};

export const eliminarNotificacion = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/notificacion/${id}`);
};
