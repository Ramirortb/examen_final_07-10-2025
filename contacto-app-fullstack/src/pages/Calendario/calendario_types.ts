export interface EstudianteForm {
  id: number,
  tipo_evento: string;
  fecha_inicio:string;
  fecha_fin: string;
  
}

export interface EstudianteRequest {
  tipo_evento: string;
  fecha_inicio:string;
  fecha_fin: string;
}