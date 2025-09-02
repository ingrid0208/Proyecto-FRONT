// src/app/Interceptor/AuthExpiredInterceptor.ts
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 0) {
        alert('Tu sesión ha expirado, por favor inicia sesión nuevamente.');
        router.navigate(['/auth/inicio']);
      }
      return throwError(() => err);
    })
  );
};
