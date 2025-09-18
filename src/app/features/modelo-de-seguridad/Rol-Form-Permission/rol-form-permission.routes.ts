import { Routes } from '@angular/router';

export const ROL_FORM_PERMISSION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./rol-form-permission.component').then(m => m.RolFormPermissionComponent),
    data: {
      title: 'Gestión de Roles-Formularios-Permisos',
      breadcrumb: 'Roles-Formularios-Permisos'
    }
  }
];