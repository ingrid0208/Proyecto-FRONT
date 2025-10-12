// ===============================
// 👤 Modelos de Perfil de Usuario
// ===============================

export interface ProfileDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  profileImage?: string;
  countryCode?: string;
  cityId?: number;
  postalCode?: string;
  documentTypeId?: number;
  documentNumber?: string;
  municipalityId?: number;
  municipalityName?: string; // Nombre del municipio desde el backend
}

export interface ProfileUpdateDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  countryCode?: string;
  cityId?: number;
  postalCode?: string;
  municipalityId?: number;
}

export interface ProfileImageUploadDto {
  imageFile: File;
}

export interface ProfileImageResponseDto {
  imageUrl: string;
  message?: string;
}
