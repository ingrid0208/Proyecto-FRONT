// src/app/features/notificacion-multas/notificacion-multas.routes.ts
import { Routes } from '@angular/router';
export const NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../not-found/pages/notfound').then(m => m.Notfound)
  }
];
