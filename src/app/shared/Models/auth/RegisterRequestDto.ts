export interface RegisterRequestDto {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  documentType?: string;
  documentNumber?: string;
  nombreCompleto?: string;
}