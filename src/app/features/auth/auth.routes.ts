// src/app/features/auth/auth.routes.ts
import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },

  { path: 'login',
    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },
  { path: 'registrar',
    loadComponent: () =>
      import('./pages/registrar/Registrar')
        .then(m => m.Registrar)
  },
  { path: 'verify-code',
    loadComponent: () =>
      import('./pages/VerifyCode/verify-code')
        .then(m => m.VerifyCodeComponent)
  },
  { path: 'access-denied',
    loadComponent: () =>
      import('./pages/access-denied/access.component.')
        .then(m => m.Access)
  },
  { path: 'error',
    loadComponent: () =>
      import('./pages/error/error')
        .then(m => m.Error)
  },
    {
    path: 'inicio',
    loadComponent: () =>
      import('../auth/pages/pagina-Inicio/inicio/inicio.component').then(m => m.InicioComponent)
  },
    {
    path: 'verify-email',
    loadComponent: () =>
      import('../auth/pages/verify-email/verify-email.component').then(m => m.VerifyEmailComponent)
  }
];
