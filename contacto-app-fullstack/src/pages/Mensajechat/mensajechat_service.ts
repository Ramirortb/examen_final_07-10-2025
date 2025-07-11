import axios from 'axios';
import type { MensajechatForm, MensajechatRequest } from './mensajechat_types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenermensajechat = async (): Promise<MensajechatForm[]> => {
  const res = await axios.get(`${API_URL}/mensajechat`);
  return res.data;
};
export const enviarMensajechat = async (data: MensajechatRequest) => {
  await axios.post(`${API_URL}/mensajechat`, data);
};
export const actualizarmensajechat = async (id: number, remitente_id: string, destinatario_id: string, mensaje: string) => {
  const res = await axios.put(`${API_URL}/mensajechat/${id}, ${ remitente_id }, ${destinatario_id}, ${mensaje}`)
  return res.data;
};

export const eliminarMensajechat = async (id: number) => {
  const res = await axios.delete(`${API_URL}/mensajechat/${id}`);
  return res.data;
};