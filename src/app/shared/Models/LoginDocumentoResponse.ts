export interface LoginDocumentoResponse {
  success: boolean;
  message: string;
  token?: string;
  sessionId?: string;
  userData?: {
    id: number;
    name: string;
    document: string;
  };
}