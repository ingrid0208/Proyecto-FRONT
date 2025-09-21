import { Routes } from '@angular/router';

export const FORM_MODULE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./form-module-page.component').then(c => c.FormModulePageComponent),
  }
];