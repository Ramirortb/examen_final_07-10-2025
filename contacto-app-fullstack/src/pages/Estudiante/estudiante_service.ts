import axios from 'axios';
import type { EstudianteForm, EstudianteRequest } from './estudiante_types';

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerestudiante = async (): Promise<EstudianteForm[]> => {
  const res = await axios.get(`${API_URL}/estudiante`);
  return res.data;
};
export const enviarEstudiante = async (data: EstudianteRequest) => {
  await axios.post(`${API_URL}/estudiante`, data);
};
export const actualizarestudiante = async (id: number, nombre_completo: string, correo: string, contraseña: string, tipo_usuario: string, fecha_registro: string, estado_cuenta: string) => {
  const res = await axios.put(`${API_URL}/estudiante/${id}, ${ nombre_completo }, ${correo}, ${contraseña}, ${tipo_usuario}, ${fecha_registro}, ${estado_cuenta}`)
  return res.data;
};

export const eliminarEstudiante = async (id: number) => {
  const res = await axios.delete(`${API_URL}/estudiante/${id}`);
  return res.data;
};