export interface SolicitudForm {
  id: number,
  solicitud_id: string;
  tipo_documento: string;
  nombre_archivo: string;
  url_archivo: string;
  fecha_carga: string;
}

export interface SolicitudRequest {
  solicitud_id: string;
  tipo_documento: string;
  nombre_archivo: string;
  url_archivo: string;
  fecha_carga: string;
}