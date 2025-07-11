export interface NotificacionForm {
  id: number,
  usuario_id: string;
  tipo: string;
  titulo: string;
  mensaje: string;
}

export interface NotificacionRequest {
  usuario_id: string;
  tipo: string;
  titulo: string;
  mensaje: string;
}