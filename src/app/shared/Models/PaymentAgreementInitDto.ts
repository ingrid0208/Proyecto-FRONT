export interface PaymentAgreementInitDto {
  id?: number;
  description?: string;
  amount?: number;
  paymentFrequency?: string;
  startDate?: Date;
  endDate?: Date;
  // Propiedades adicionales
  infringement?: string;
  valorSMDLV?: number;
  personName?: string;
  infractionId?: number;
  documentNumber?: string;
  documentType?: string;
  typeFine?: string;
  userId?: number;
}