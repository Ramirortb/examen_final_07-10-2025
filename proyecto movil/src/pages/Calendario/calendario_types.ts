export interface CalendarioForm {
  id: number;
  tipo_evento: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface CalendarioRequest {
  tipo_evento: string;
  fecha_inicio: string;
  fecha_fin: string;
}
