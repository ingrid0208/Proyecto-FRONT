export interface UserInfractionSelectDto {
  tipo: string;                  // <- typeInfractionName
  fecha: Date | string;          // <- dateInfraction
  descripcion: string;           // <- observations
  estado: 'Pendiente' | 'Pagada' | 'Vencida';  // <- mapeo desde bool
}