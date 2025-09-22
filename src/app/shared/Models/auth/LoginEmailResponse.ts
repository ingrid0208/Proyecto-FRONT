export interface LoginEmailResponse {
  isSuccess: boolean;
  message: string;
  token?: string;
  lastVerificationSentAt?: string | null; 
}
