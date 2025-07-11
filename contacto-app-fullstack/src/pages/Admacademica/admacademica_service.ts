import axios from 'axios';
import type { AdmacademicaForm, AdmacademicaRequest } from './admacademica_types';

const API_URL = import.meta.env.VITE_API_URL;

export const obteneradmacademica = async (): Promise<AdmacademicaForm[]> => {
  const res = await axios.get(`${API_URL}/admacademica`);
  return res.data;
};
export const enviarAdmacademica = async (data: AdmacademicaRequest) => {
  await axios.post(`${API_URL}/admacademica`, data);
};
export const actualizaradmacademica = async (id: number, nombre_programa: string, descripcion: string, nivel: string, duracion: string, estado_activo: string) => {
  const res = await axios.put(`${API_URL}/admacademica/${id}, ${ nombre_programa }, ${descripcion}, ${nivel}, ${duracion}, ${estado_activo}`)
  return res.data;
};

export const eliminarAdmacademica = async (id: number) => {
  const res = await axios.delete(`${API_URL}/admacademica/${id}`);
  return res.data;
};