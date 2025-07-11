import axios from "axios";
import type { CalendarioForm, CalendarioRequest } from "./calendario_types";
import { Platform } from "react-native";


const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000" 
    : "http://localhost:3000"; 

export const obtenerCalendario = async (): Promise<CalendarioForm[]> => {
  const res = await axios.get(`${API_URL}/calendario`);
  return res.data;
};

export const enviarCalendario = async (data: CalendarioRequest) => {
  await axios.post(`${API_URL}/calendario`, data);
};

export const actualizarCalendario = async (
  id: number,
  tipo_evento: string,
  fecha_inicio: string,
  fecha_fin: string
) => {
  const res = await axios.put(`${API_URL}/calendario/${id}`, {
    tipo_evento,
    fecha_inicio,
    fecha_fin,
  });
  return res.data;
};

export const eliminarCalendario = async (id: number) => {
  const res = await axios.delete(`${API_URL}/calendario/${id}`);
  return res.data;
};
