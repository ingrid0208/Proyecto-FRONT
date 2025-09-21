// src/app/features/tipos-multas/tipos-multas.routes.ts
import { Routes } from '@angular/router';

export const TIPOS_MULTAS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/tipos-multas.component')
        .then(m => m.TiposMultasComponent)
  }
];
