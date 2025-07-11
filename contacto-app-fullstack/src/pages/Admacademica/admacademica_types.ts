export interface AdmacademicaForm {
  id: number;
  nombre_programa: string;
  descripcion: string;
  nivel: string;
  duracion: string;
  estado_activo: String;
}

export interface AdmacademicaRequest {
  nombre_programa: string;
  descripcion: string;
  nivel: string;
  duracion: string;
  estado_activo: String;
}