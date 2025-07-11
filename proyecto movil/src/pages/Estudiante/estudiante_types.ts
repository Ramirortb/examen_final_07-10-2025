export interface EstudianteForm {
  id: number,
  nombre_completo: string;
  correo: string;
  contraseña: string;
  tipo_usuario: string;
  fecha_registro: string;
  estado_cuenta: String;
}

export interface EstudianteRequest {
  nombre_completo: string;
  correo: string;
  contraseña: string;
  tipo_usuario: string;
  fecha_registro: string;
  estado_cuenta: String;
}