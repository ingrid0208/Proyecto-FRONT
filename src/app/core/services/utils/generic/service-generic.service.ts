// core/services/servicesGeneric/service-generic.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { LoginDocumentoRequest } from '../../../../shared/models/LoginDocumentoRequest';
import { LoginDocumentoResponse } from '../../../../shared/models/LoginDocumentoResponse';
import { LoginEmailRequest } from '../../../../shared/models/auth/LoginEmailRequest';
import { LoginEmailResponse } from '../../../../shared/models/auth/LoginEmailResponse';
import { RegisterRequestDto } from '../../../../shared/models/auth/RegisterRequestDto';
import { PaymentAgreementInitDto } from '../../../../shared/models/PaymentAgreementInitDto';

type getAllType = 'GetAll' | 'GetAllDeletes';
type DeleteType = 'Persistent' | 'Logical';

// core/services/servicesGeneric/service-generic.service.ts
@Injectable({ providedIn: 'root' })
export class ServiceGenericService {
  private readonly baseUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  // ===== Helpers =====
  private getHeaders(skipAuth = false): HttpHeaders {
    const currentUser = localStorage.getItem('currentUser');
    const token = skipAuth ? undefined : (currentUser ? JSON.parse(currentUser)?.token : undefined);

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return new HttpHeaders(headers);
  }


  /** ✅ Opciones para llamadas con JWT (sin cookies) */
  private optsJwt() {
    return { headers: this.getHeaders(false) }; // false => NO skipAuth => añade Bearer si existe
  }

  /** ✅ Opciones para llamadas con Cookie (con withCredentials y sin Bearer) */
  private optsCookie() {
    return { headers: this.getHeaders(true), withCredentials: true }; // true => skipAuth => NO Bearer
  }

  private url(controller: string, ...segments: (string | number)[]) {
    const parts = [this.baseUrl, controller, ...segments].map(s =>
      String(s).replace(/^\/+|\/+$/g, '')
    );
    return parts.filter(Boolean).join('/');
  }


  private buildParams(obj?: Record<string, any>): HttpParams {
    let params = new HttpParams();
    if (!obj) return params;
    for (const [k, v] of Object.entries(obj)) {
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) for (const item of v) params = params.append(k, String(item));
      else if (v instanceof Date) params = params.set(k, v.toISOString());
      else params = params.set(k, String(v));
    }
    return params;
  }

  // ======================
  // CRUD **JWT** (la mayoría de tu app normal)
  // ======================
  getAll<T>(controller: string, getAllType: 'GetAll' | 'GetAllDeletes' = 'GetAll') {
    const params = this.buildParams({ getAllType: 0 });
    return this.http.get<T[]>(this.url(controller), { ...this.optsJwt(), params });
  }

  getById<T>(controller: string, id: number | string): Observable<T> {
    return this.http.get<T>(this.url(controller, id), this.optsJwt());
  }

  create<T>(controller: string, data: any): Observable<T> {
    return this.http.post<T>(this.url(controller), data, this.optsJwt());
  }

  update<T>(controller: string, id: number | string, data: any): Observable<T> {
    return this.http.put<T>(this.url(controller, id), data, this.optsJwt());
  }

  delete(controller: string, id: number | string, deleteType: 'Persistent' | 'Logical' = 'Persistent') {
    const params = this.buildParams({ deleteType });
    return this.http.delete(this.url(controller, id), { ...this.optsJwt(), params });
  }

  restore(controller: string, id: number | string) {
    return this.http.patch<void>(this.url(controller, 'logical-restore', id), {}, this.optsJwt());
  }



  loginEmail(body: LoginEmailRequest) {
    return this.http.post<LoginEmailResponse>(
      this.url('Auth', 'login'),
      body,
      this.optsCookie()
    );
  }



  registrar(body: RegisterRequestDto) {
    return this.http.post<any>(
      this.url('Login', 'Registrarse'),
      body,
      { headers: this.getHeaders(true) } // true => **no** Authorization
    );
  }

  // ======================
  // SESIÓN POR DOCUMENTO (Cookie) — con withCredentials
  // ======================
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

  logout() {
    return this.http.post(this.url('Login', 'logout'), {}, this.optsCookie());
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

  /** 🔔 Ping a la sesión por documento (cookie) */
  pingDocSession() {
    return this.http.get<void>(this.url('Login', 'ping'), this.optsCookie());
  }

  getInitData(userId: number, infractionId?: number) {
    let url = this.url('PaymentAgreement', 'init', userId);
    if (infractionId) {
      url += `?infractionId=${infractionId}`;
    }
    return this.http.get<PaymentAgreementInitDto | PaymentAgreementInitDto[]>(url, this.optsJwt());
  }

}
