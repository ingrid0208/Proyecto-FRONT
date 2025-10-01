// src/app.routes.ts
import { Routes, provideRouter } from '@angular/router';

export const routes: Routes = [
  // Rutas públicas (login, registro, inicio, recuperación)
  { path: '', pathMatch: 'full', redirectTo: 'auth/inicio' },
  { 
    path: 'auth', 
    loadChildren: () => import('./app/features/auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },
  { 
    path: 'identificacion', 
    loadChildren: () => import('./app/features/auth/pages/identificacion/identificacion.routes').then(m => m.IDENTIFICACION_ROUTES) 
  },

  // Rutas privadas (requieren AppLayout)
  {
    path: '',
    loadComponent: () => import('./app/layout/app.layout').then(m => m.AppLayout),
    children: [
      { path: 'consultar-ingresar', loadChildren: () => import('./app/features/multas/consultas/consultar.routes').then(m => m.CONSULTAR_ROUTES) },
      { path: 'perfil', loadChildren: () => import('./app/features/profile/perfil.routes').then(m => m.PERFIL_ROUTES) },
      { path: 'notificaciones', loadChildren: () => import('./app/features/multas/notificaciones/pages/notificacion-multas.routes').then(m => m.NOTIFICACION_ROUTES) },
      { path: 'acuerdo-pago', loadChildren: () => import('./app/features/multas/acuerdos-pago/acuerdo-pago.routes').then(m => m.ACUERDO_PAGO_ROUTES) },
      { path: 'tipos-multas', loadChildren: () => import('./app/features/multas/tipos/tipos-multas.routes').then(m => m.TIPOS_MULTAS_ROUTES) },
      { path: 'calendario', loadChildren: () => import('./app/features/calendar/calendario.routes').then(m => m.CALENDARIO_ROUTES) },
      { path: 'anexar-multas', loadChildren: () => import('./app/features/anexar-multas/anexar-multas.routes').then(m => m.ANEXAR_MULTAS_ROUTES) },
      { path: 'roles', loadChildren: () => import('./app/features/admin/roles/roles-page.routes').then(m => m.ROLES_ROUTES) },
      { path: 'usuarios', loadChildren: () => import('./app/features/admin/users/usuarios-page.routes').then(m => m.USUARIOS_ROUTES) },
      { path: 'personas', loadChildren: () => import('./app/features/admin/personas/personas-page/personas-page.routes').then(m => m.PERSONAS_ROUTES) },
      { path: 'formularios', loadChildren: () => import('./app/features/admin/forms/form.routes').then(m => m.FORM_ROUTES) },
      { path: 'modulos', loadChildren: () => import('./app/features/admin/module/module.routes').then(m => m.MODULE_ROUTES) },
      { path: 'form-modules', loadChildren: () => import('./app/features/admin/form-module/form-module.routes').then(m => m.FORM_MODULE_ROUTES) },
      { path: 'rol-form-permission', loadChildren: () => import('./app/features/admin/permissions/rol-form-permission.routes').then(m => m.ROL_FORM_PERMISSION_ROUTES) },
      { path: 'rol-user', loadChildren: () => import('./app/features/admin/roles/rol-user.routes').then(m => m.rolUserRoutes) },
      { path: 'parameters', loadChildren: () => import('./app/features/parameters.routes').then(m => m.PARAMETERS_ROUTES) },
      { path: 'permisos', loadChildren: () => import('./app/features/admin/permissions/permisos-page.routes').then(m => m.PERMISOS_ROUTES) },
      { path: 'uikit', loadChildren: () => import('./app/features/auth/pages/uikit-demo/uikit.routes').then(m => m.UIKIT_ROUTES) },
      { path: 'home', loadChildren: () => import('./app/features/home/pages/password/home.routes').then(m => m.HOMEPASSWORD_ROUTES) },
    ]
  },

  { path: '**', redirectTo: '' } // Esto redirige a la ruta raíz, que luego redirige a 'auth/inicio'
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];