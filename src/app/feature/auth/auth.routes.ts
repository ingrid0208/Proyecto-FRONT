// src/app/features/auth/auth.routes.ts
import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

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
  { path: 'recovery-password',
    loadComponent: () =>
      import('./pages/recovery-password/RecoveryPassword')
        .then(m => m.RecoverPasswordComponent)
  },
  { path: 'verify-code',
    loadComponent: () =>
      import('./pages/verify-code/veryCode')
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
  }
];
