// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
export const PARAMETERS_ROUTES: Routes = [
  {
    path: 'department',
    loadComponent: () =>
      import('./department/department.component').then(m => m.DepartmentComponent)
  },
    {
    path: 'document-type',
    loadComponent: () =>
      import('./document-type/document-type.component').then(m => m.DocumentTypeComponent)
  },
    {
    path: 'municipality',
    loadComponent: () =>
      import('./municipality/municipality.component').then(m => m.MunicipalityComponent)
  },
    {
    path: 'payment-frequency',
    loadComponent: () =>
      import('./payment-frequency/payment-frequency.component').then(m => m.PaymentFrequencyComponent)
  }
];
