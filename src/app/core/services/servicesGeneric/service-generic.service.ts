// core/services/servicesGeneric/service-generic.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LoginDocumentoRequest } from '../../../shared/Models/LoginDocumentoRequest';
import { LoginDocumentoResponse } from '../../../shared/Models/LoginDocumentoResponse';

type getAllType = 'GetAll' | 'GetAllDeletes';
type DeleteType = 'Persistent' | 'Logical';

@Injectable({ providedIn: 'root' })
export class ServiceGenericService {
  private readonly baseUrl = environment.apiURL;
  constructor(private http: HttpClient) {}

  // ===== Helpers =====
  private getHeaders(skipAuth = false): HttpHeaders {
  const currentUser = localStorage.getItem('currentUser');
  const token = skipAuth ? undefined : (currentUser ? JSON.parse(currentUser)?.token : undefined);

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return new HttpHeaders(headers);
}

  private url(controller: string, ...segments: (string | number)[]) {
    const clean = [this.baseUrl, controller, ...segments].map(s => String(s).replace(/^\/+|\/+$/g, ''));
    return clean.join('/').replace(/([^:]\/)\/+/g, '$1');
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

  // ⬇⬇⬇ Añade withCredentials en TODAS (o al menos en las protegidas)
  getAll<T>(controller: string, getAllType: getAllType = 'GetAll') {
    const params = this.buildParams({ getAllType: 0 });
    return this.http.get<T[]>(this.url(controller), { headers: this.getHeaders(), params, withCredentials: true });
  }

  getById<T>(controller: string, id: number | string): Observable<T> {
    return this.http.get<T>(this.url(controller, id), { headers: this.getHeaders(), withCredentials: true });
  }

  create<T>(controller: string, data: any): Observable<T> {
    return this.http.post<T>(this.url(controller), data, { headers: this.getHeaders(), withCredentials: true });
  }

  update<T>(controller: string, id: number | string, data: any): Observable<T> {
    return this.http.put<T>(this.url(controller, id), data, { headers: this.getHeaders(), withCredentials: true });
  }

  delete(controller: string, id: number | string, deleteType: DeleteType = 'Persistent') {
    const params = this.buildParams({ deleteType });
    return this.http.delete(this.url(controller, id), { headers: this.getHeaders(), params, withCredentials: true });
  }

  restore(controller: string, id: number | string) {
    return this.http.patch<void>(this.url(controller, 'logical-restore', id), {}, { headers: this.getHeaders(), withCredentials: true });
  }

  // === SESIÓN POR DOCUMENTO ===
  loginDocumento(body: LoginDocumentoRequest) {
    // importante: withCredentials para que el navegador guarde la cookie del Set-Cookie
    return this.http.post<LoginDocumentoResponse>(
      this.url('Login', 'documento'),
      body,
      { withCredentials: true }
    );
  }

  // útil para llamar a rutas protegidas
  misMultas(params: { documentTypeId: number; documentNumber: string }) {
  return this.http.get<any>(this.url('Login', 'mis-multas'), {
    headers: this.getHeaders(true), // ⬅️ sin Bearer
    params: this.buildParams(params),
    withCredentials: true
  });
}

logout() {
  return this.http.post(this.url('Login', 'logout'), {}, {
    headers: this.getHeaders(true), // ⬅️ sin Bearer
    withCredentials: true
  });
}

getMultasByDocument(documentTypeId: number, documentNumber: string) {
  return this.http.get<{
    isSuccess: boolean;
    count: number;
    data: any[];
  }>(
    this.url('UserInfraction', 'by-document'),
    {
      headers: this.getHeaders(true),     // ⬅️ SIN Bearer (usas cookie de sesión)
      params: this.buildParams({ documentTypeId, documentNumber }),
      withCredentials: true               // ⬅️ MUY IMPORTANTE para enviar la cookie
    }
  );
}
}
