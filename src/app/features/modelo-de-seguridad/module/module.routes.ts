import { Routes } from '@angular/router';

export const MODULE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./module-page.component').then(c => c.ModulePageComponent),
  }
];