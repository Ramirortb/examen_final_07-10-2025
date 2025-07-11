export interface PermisosForm {
  id: number,
  nombre_rol: string;
  permisos: string;
  fecha_expiracion: string;
  usado: String;
}

export interface PermisosRequest {
  nombre_rol: string;
  permisos: string;
  fecha_expiracion: string;
  usado: String;
}