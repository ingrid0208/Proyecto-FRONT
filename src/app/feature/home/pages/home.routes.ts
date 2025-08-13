// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./contenido-inicio/contenido-inicio.component').then(m => m.ContenidoInicioComponent)
  }
];
