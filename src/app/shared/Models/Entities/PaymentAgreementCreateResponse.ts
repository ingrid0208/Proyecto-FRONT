import { PaymentAgreementSelectDto } from "./select/PaymentAgreementSelectDto";

export interface PaymentAgreementCreateResponse {
  agreement: PaymentAgreementSelectDto;
  pdfUrl: string;
}
