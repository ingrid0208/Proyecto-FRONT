// ===============================
// 📌 Imports
// ===============================
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

// Config & Store
import { environment } from '../../../../../environments/environment.development';
import { UserStore } from './../../User.Store';

// Models
import { LoginEmailRequest } from '../../../../shared/Models/auth/LoginEmailRequest';
import { LoginEmailResponse } from '../../../../shared/Models/auth/LoginEmailResponse';
import { RegisterRequestDto } from '../../../../shared/Models/auth/RegisterRequestDto';
import { LoginDocumentoRequest } from '../../../../shared/Models/LoginDocumentoRequest';
import { LoginDocumentoResponse } from '../../../../shared/Models/LoginDocumentoResponse';
import { PaymentAgreementCreateResponse } from '../../../../shared/Models/Entities/PaymentAgreementCreateResponse';
import { User } from '../../../../shared/Models/user.model';
import { PaymentAgreementInitDto } from '../../../../shared/Models/init/PaymentAgreementInitDto';

type getAllType = 'GetAll' | 'GetAllDeletes';
type DeleteType = 'Persistent' | 'Logical';

// ===============================
// 📌 Servicio genérico
// ===============================
@Injectable({ providedIn: 'root' })
export class ServiceGenericService {
  private readonly baseUrl = environment.apiURL;
  private userStore = inject(UserStore);
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  // ===============================
  // 🛠️ Helpers
  // ===============================

  /** Construcción de headers con o sin Authorization */
  private getHeaders(skipAuth = false): HttpHeaders {
    const currentUser = localStorage.getItem('currentUser');
    const token = skipAuth ? undefined : (currentUser ? JSON.parse(currentUser)?.token : undefined);

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`; // ✅ corregido template string
    return new HttpHeaders(headers);
  }

  /** Opciones con JWT (Authorization Bearer) */
  private optsJwt() {
    return { headers: this.getHeaders(false) };
  }

  /** Opciones con Cookie (withCredentials) */
  private optsCookie() {
    return { headers: this.getHeaders(true), withCredentials: true };
  }

  /** Construye URL final */
  private url(controller: string, ...segments: (string | number)[]) {
    const parts = [this.baseUrl, controller, ...segments].map(s =>
      String(s).replace(/^\/+|\/+$/g, '')
    );
    return parts.filter(Boolean).join('/');
  }

  /** Construye parámetros dinámicos */
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

  // ===============================
  // 📌 CRUD genéricos (JWT)
  // ===============================
  getAll<T>(controller: string, getAllType: getAllType = 'GetAll') {
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

  delete(controller: string, id: number | string, deleteType: DeleteType = 'Persistent') {
    const params = this.buildParams({ deleteType });
    return this.http.delete(this.url(controller, id), { ...this.optsJwt(), params });
  }

  restore(controller: string, id: number | string) {
    return this.http.patch<void>(this.url(controller, 'logical-restore', id), {}, this.optsJwt());
  }

  // ===============================
  // 🔐 Autenticación (Cookie)
  // ===============================

  /** Login con cookie */
  loginEmail(body: LoginEmailRequest) {
    return this.http.post<LoginEmailResponse>(
      this.url('Auth', 'login'),
      body,
      this.optsCookie()
    );
  }

  /** Registrar usuario */
  registrar(body: RegisterRequestDto) {
    return this.http.post<any>(
      this.url('Auth', 'register'),
      body,
      { headers: this.getHeaders(true) }
    );
  }

  /** Login + consulta de usuario en un solo flujo */
  Login(obj: LoginEmailRequest): Observable<User> {
    return this.http.post<any>(this.url('Auth', 'login'), obj, { withCredentials: true }).pipe(
      switchMap(() => this.GetMe()),
      catchError((error) => {
        const detail = error?.error?.detail;
        if (detail) {
          error.error = { ...error.error, message: detail };
        }
        return throwError(() => error);
      })
    );
  }

  /** Obtener datos del usuario autenticado */
  GetMe(): Observable<User> {
    return this.http.get<User>(this.url('Auth', 'me'), this.optsCookie()).pipe(
      tap(user => {
        console.log("✅ /me OK:", user);
        this.userStore.set(user);
      }),
      catchError((error) => {
        console.error("❌ Error en /me", error);
        return throwError(() => error);
      })
    );
  }

  /** Logout simple */
  logout() {
    return this.http.post(this.url('Login', 'logout'), {}, this.optsCookie());
  }

  /** Logout + limpiar store + redirección */
  logouts(): Observable<any> {
    return this.http.post(this.url('Auth', 'logout'), {}, { withCredentials: true }).pipe(
      tap(() => {
        this.userStore.clear();
        this.router.navigate(['/']);
      })
    );
  }

  /** Refresh de sesión con cookie */
  RefreshToken(): Observable<User> {
    return this.http.post<any>(this.url('Auth','refresh'), {}, { withCredentials: true }).pipe(
      switchMap(() => this.GetMe())
    );
  }

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

  // ===============================
  // 📌 Pagos
  // ===============================
  getInitData(userId: number, infractionId?: number) {
    let url = this.url('PaymentAgreement', 'init', userId);
    if (infractionId) {
      url += `?infractionId=${infractionId}`;
    }
    return this.http.get<PaymentAgreementInitDto | PaymentAgreementInitDto[]>(url, this.optsJwt());
  }

  createInfraction(body: any) {
    return this.http.post<any>(
      this.url('UserInfraction', 'create-with-person'),
      body,
      this.optsJwt()
    );
  }

  createPaymentAgreement(body: any) {
    return this.http.post<PaymentAgreementCreateResponse>(
      this.url('PaymentAgreement'),
      body,
      this.optsJwt()
    );
  }

  // ===============================
  // 📌 Verificación de correo
  // ===============================
  sendVerification(nombre: string, email: string) {
    return this.http.post<any>(
      this.url('verificacion', 'send'),
      { nombre, email },
      { headers: this.getHeaders(true) }
    );
  }

  validateCode(email: string, code: string) {
    return this.http.post<any>(
      this.url('verificacion', 'validate'),
      { email, code },
      { headers: this.getHeaders(true) }
    );
  }

  sendReactivation(email: string) {
    return this.http.post<any>(
      this.url('verificacion', 'send-reactivation'),
      { email },
      { headers: this.getHeaders(true) }
    );
  }

  reactivateAccount(email: string, code: string) {
    return this.http.post<any>(
      this.url('verificacion', 'reactivate'),
      { email, code },
      { headers: this.getHeaders(true) }
    );
  }

  sendMonthly(nombre: string, email: string) {
    return this.http.post<any>(
      this.url('verificacion', 'send-monthly'),
      { nombre, email },
      { headers: this.getHeaders(true) }
    );
  }

  // ===============================
  // 📌 Filtros
  // ===============================
  filterMultas(body: { userId?: number; searchTerm?: string }) {
    return this.http.post<{ count: number; data: any[] }>(
      this.url('UserInfraction', 'filter'),
      body,
      this.optsJwt()
    );
  }



getInfractionsByType(typeInfractionId: number) {
  return this.http.get<any>(
    this.url('UserInfraction', 'by-type'),
    {
      ...this.optsJwt(),
      params: this.buildParams({ typeInfractionId })
    }
  );
}
}

