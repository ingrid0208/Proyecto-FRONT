// // src/app/Interceptor/AuthExpiredInterceptor.ts
// import { inject } from '@angular/core';
// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { catchError, throwError } from 'rxjs';

// // 👇 importa MessageService
// import { MessageService } from 'primeng/api';

// export const authExpiredInterceptor: HttpInterceptorFn = (req, next) => {
//   const router = inject(Router);
//   const messageService = inject(MessageService);

//   // ⚡ Si viene este header, no hacemos nada
//   if (req.headers.get('skipInterceptor')) {
//     return next(req);
//   }

//   return next(req).pipe(
//     catchError((err: HttpErrorResponse) => {
//       if (err.status === 401 || err.status === 0) {
//         messageService.add({
//           severity: 'warn',
//           summary: 'Sesión expirada',
//           detail: 'Por favor inicia sesión nuevamente.',
//           life: 4000,
//         });
//         localStorage.removeItem('currentUser');
//         router.navigate(['/auth/inicio']);
//       }
//       return throwError(() => err);
//     })
//   );
// };
