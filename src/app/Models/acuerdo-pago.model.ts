export interface AcuerdoPago {
  nombre: string;
  apellido: string;
  documento: string;
  tipoDocumento: string;
  expedidoEn: string;
  telefono: string;
  direccion: string;
  correo: string;              
  inicioAcuerdo: string;
  finAcuerdo: string;
  fechaInfraccion: string;
  infraccion: string;
  tipoMulta: string;
  valorSMDLV: number;
  estadoPago: string;
  infoInfraccion: string;
}
