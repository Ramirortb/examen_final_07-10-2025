import axios from 'axios';
import type { PermisosForm, PermisosRequest } from './permisos_types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerpermisos = async (): Promise<PermisosForm[]> => {
  const res = await axios.get(`${API_URL}/permisos`);
  return res.data;
};
export const enviarPermisos = async (data: PermisosRequest) => {
  await axios.post(`${API_URL}/permisos`, data);
};
export const actualizarpermisos = async (id: number, nombre_rol: string, permisos: string, fecha_expiracion: string, usado: string) => {
  const res = await axios.put(`${API_URL}/permisos/${id}, ${ nombre_rol }, ${permisos}, ${fecha_expiracion}, ${usado}`)
  return res.data;
};

export const eliminarPermisos = async (id: number) => {
  const res = await axios.delete(`${API_URL}/permisos/${id}`);
  return res.data;
};