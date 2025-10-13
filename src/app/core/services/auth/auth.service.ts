// ===============================
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap, throwError, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../base/api.service';

// Store
import { UserStore } from '../User.Store';

// Models
import { LoginEmailRequest } from '../../../shared/models/auth/request/LoginEmailRequest';
import { LoginEmailResponse } from '../../../shared/models/auth/response/LoginEmailResponse';
import { RegisterRequestDto } from '../../../shared/models/auth/request/RegisterRequestDto';
import { User } from '../../../shared/Models/modelSecurity/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
  private userStore = inject(UserStore);
  private router = inject(Router);

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
      { headers: this.getHeadersNoAuth() }
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
}