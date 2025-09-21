import { Routes } from '@angular/router';
export const CONSULTAR_ROUTES: Routes = [
  {
    path: 'consultar-ingresar',
    loadComponent: () =>
      import('./consultar-ingresar/consultar-ingresar.component').then(m => m.ConsultarIngresarComponent)
  }
];