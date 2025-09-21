// src/app/features/home/home.routes.ts
import { Routes } from '@angular/router';
export const PARAMETERS_ROUTES: Routes = [
  {
    path: 'department',
    loadComponent: () =>
      import('./parameters/department.component').then(m => m.DepartmentComponent)
  },
    {
    path: 'document-type',
    loadComponent: () =>
      import('./parameters/document-type.component').then(m => m.DocumentTypeComponent)
  },
    {
    path: 'municipality',
    loadComponent: () =>
      import('./parameters/municipality.component').then(m => m.MunicipalityComponent)
  },
    {
    path: 'payment-frequency',
    loadComponent: () =>
      import('./parameters/payment-frequency.component').then(m => m.PaymentFrequencyComponent)
  }
];
