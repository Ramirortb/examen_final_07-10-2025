export interface MensajechatForm {
  id: number,
  remitente_id: string;
  destinatario_id: string;
  mensaje: string;
  
}

export interface MensajechatRequest {
  remitente_id: string;
  destinatario_id: string;
  mensaje: string;
}