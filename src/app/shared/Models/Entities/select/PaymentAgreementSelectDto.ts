import { InstallmentScheduleDto } from "../InstallmentScheduleDto";

export interface PaymentAgreementSelectDto {
  id: number;
  personName: string;
  documentNumber: string;
  documentType: string;
  phoneNumber: string;
  email: string;
  address: string;
  infringement: string;
  typeFine: string;
  valorSMDLV: number;
  agreementStart: string;
  agreementEnd: string;
  expeditionCedula: string;
  paymentMethod: string;
  frequencyPayment: string;
  baseAmount: number;
  accruedInterest: number;
  outstandingAmount: number;
  installments?: number;
  monthlyFee?: number;
  isPaid: boolean;
  isCoactive: boolean;
  coactiveActivatedOn?: string;
  lastInterestAppliedOn?: string;

  // 👇 Aquí agregas la lista de cuotas
  installmentSchedule?: InstallmentScheduleDto[];
}
