 export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  documento: string;
  email: string;
  telefono: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  fechaCreacion: Date;
}