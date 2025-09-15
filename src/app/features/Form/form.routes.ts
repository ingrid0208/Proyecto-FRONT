import { Routes } from '@angular/router';

export const FORM_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./form-page.component').then(c => c.FormPageComponent),
  }
];