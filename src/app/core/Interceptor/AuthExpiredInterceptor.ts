// src/app/Interceptor/AuthExpiredInterceptor.ts
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// 👇 importa MessageService
import { MessageService } from 'primeng/api';

export const authExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 0) {
        // 🔥 en lugar de alert()
        messageService.add({
          severity: 'warn', // success | info | warn | error
          summary: 'Sesión expirada',
          detail: 'Por favor inicia sesión nuevamente.',
          life: 4000, // ms de duración
        });

        localStorage.removeItem('currentUser'); // limpiar token
        router.navigate(['/auth/inicio']);
      }
      return throwError(() => err);
    })
  );
};
