import axios from "axios";
import type { ContactoForm, ContactoRequest } from "./contacto.types";
import { Platform } from "react-native";


const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000"  
    : "http://localhost:3000"; 

export const obtenerContactos = async (): Promise<ContactoForm[]> => {
  const res = await axios.get(`${API_URL}/contacto`);
  return res.data;
};

export const enviarContacto = async (data: ContactoRequest) => {
  await axios.post(`${API_URL}/contacto`, data);
};
