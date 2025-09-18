export interface PaymentAgreementInitDto {
  personName: string;
  documentNumber: string;
  documentType: string;
  infringement: string;
  typeFine: string;
  valorSMDLV: number;
  baseAmount: number;
  infractionId: number;
  userId?: number; // 👈 Agregar userId como opcional por si lo necesitas
}