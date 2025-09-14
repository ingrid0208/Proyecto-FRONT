export interface AcuerdoPago {
  id?: number;
  address: string;
  neighborhood?: string;
  agreementDescription?: string;
  expeditionCedula?: string;
  phoneNumber?: string;
  email?: string;
  agreementStart: string;
  agreementEnd: string;
  baseAmount: number;
  isPaid: boolean;
  userInfractionId: number;
  paymentFrequencyId: number;
  typePaymentId: number;
}
