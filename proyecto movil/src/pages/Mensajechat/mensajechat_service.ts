import axios from 'axios';
import type { MensajechatForm, MensajechatRequest } from '../types/mensajechat_types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000'; // o tu URL backend

export const obtenerMensajechat = async (): Promise<MensajechatForm[]> => {
  const response = await axios.get(`${API_URL}/mensajechat`);
  return response.data;
};

export const enviarMensajechat = async (data: MensajechatRequest): Promise<void> => {
  await axios.post(`${API_URL}/mensajechat`, data);
};

export const actualizarMensajechat = async (
  id: number,
  remitente_id: string,
  destinatario_id: string,
  mensaje: string
): Promise<MensajechatForm> => {
  const response = await axios.put(`${API_URL}/mensajechat/${id}`, {
    remitente_id,
    destinatario_id,
    mensaje,
  });
  return response.data;
};

export const eliminarMensajechat = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/mensajechat/${id}`);
};
