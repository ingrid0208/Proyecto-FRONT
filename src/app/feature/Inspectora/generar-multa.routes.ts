import { Routes } from '@angular/router';
import { GenerarMultaComponent } from './generar-multa.component';

export const GENERAR_MULTA_ROUTES: Routes = [
  {
    path: '',
    component: GenerarMultaComponent
  },
  {
    path: 'anexar-multa',
    loadComponent: () => import('./anexar-multa.component').then(m => m.AnexarMultaComponent)
  }
];
