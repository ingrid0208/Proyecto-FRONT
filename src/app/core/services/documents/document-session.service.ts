// ===============================
import { Injectable } from '@angular/core';
import { ApiService } from '../base/api.service';

// Models
import { LoginDocumentoRequest } from '../../../shared/models/auth/request/LoginDocumentoRequest';
import { LoginDocumentoResponse } from '../../../shared/models/auth/response/LoginDocumentoResponse';

@Injectable({ providedIn: 'root' })
export class DocumentSessionService extends ApiService {

    // ===============================
    // 📌 Sesión por documento
    // ===============================
    loginDocumento(body: LoginDocumentoRequest) {
        return this.http.post<LoginDocumentoResponse>(
            this.url('Login', 'documento'),
            body,
            this.optsCookie()
        );
    }

    misMultas(params: { documentTypeId: number; documentNumber: string }) {
        return this.http.get<any>(
            this.url('Login', 'mis-multas'),
            { ...this.optsCookie(), params: this.buildParams(params) }
        );
    }

    getMultasByDocument(documentTypeId: number, documentNumber: string) {
        return this.http.get<{ isSuccess: boolean; count: number; data: any[] }>(
            this.url('UserInfraction', 'by-document'),
            {
                ...this.optsCookie(),
                params: this.buildParams({ documentTypeId, documentNumber })
            }
        );
    }

    /** Verifica que la cookie de sesión aún es válida */
    pingDocSession() {
        return this.http.get<void>(this.url('Login', 'ping'), this.optsCookie());
    }
}