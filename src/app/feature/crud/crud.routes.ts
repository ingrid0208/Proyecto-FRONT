// src/app/features/crud/crud.routes.ts
import { Routes } from '@angular/router';

export const CRUD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/crud')
        .then(m => m.Crud)
  }
];
