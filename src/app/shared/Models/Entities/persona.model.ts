export interface Persona {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  documentType: string;
  documentNumber: string;
  phone?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}