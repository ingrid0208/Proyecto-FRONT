    // src/app/features/inicio/inicio.routes.ts
import { Routes } from '@angular/router';

export const INICIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../home/pages/password/contenido-password/contenido-inicio.component')
        .then(m => m.ContenidoInicioComponent)
  }
];
