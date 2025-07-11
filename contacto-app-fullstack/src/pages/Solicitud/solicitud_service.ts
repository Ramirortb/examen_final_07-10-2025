import axios from 'axios';
import type { SolicitudForm, SolicitudRequest } from './solicitud_types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenersolicitud = async (): Promise<SolicitudForm[]> => {
  const res = await axios.get(`${API_URL}/solicitud`);
  return res.data;
};
export const enviarSolicitud = async (data: SolicitudRequest) => {
  await axios.post(`${API_URL}/solicitud`, data);
};
export const actualizarsolicitud = async (id: number, solicitud_id: string, tipo_documento: string, nombre_archivo: string, url_archivo: string, fecha_carga: string) => {
  const res = await axios.put(`${API_URL}/solicitud/${id}, ${ solicitud_id }, ${tipo_documento}, ${nombre_archivo}, ${url_archivo}, ${fecha_carga}`)
  return res.data;
};

export const eliminarsolicitud = async (id: number) => {
  const res = await axios.delete(`${API_URL}/solicitud/${id}`);
  return res.data;
};