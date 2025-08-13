// src/app.routes.ts
import { Routes, provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/layout/shell/app.layout').then(m => m.AppLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },

      { path: 'home',            loadChildren: () => import('./app/feature/home/pages/home.routes').then(m => m.HOME_ROUTES) },
      { path: 'notificaciones',  loadChildren: () => import('./app/feature/notificacion-multas/pages/notificacion-multas.routes').then(m => m.NOTIFICACION_ROUTES) },
      { path: 'acuerdo-pago',    loadChildren: () => import('./app/feature/acuerdo-pago/acuerdo-pago.routes').then(m => m.ACUERDO_PAGO_ROUTES) },
      { path: 'tipos-multas',    loadChildren: () => import('./app/feature/tipos-multas/tipos-multas.routes').then(m => m.TIPOS_MULTAS_ROUTES) },
      { path: 'uikit',           loadChildren: () => import('./app/feature/auth/pages/uikit-demo/uikit.routes').then(m => m.UIKIT_ROUTES) },
      { path: 'calendario',      loadChildren: () => import('./app/feature/calendario/calendario.routes').then(m => m.CALENDARIO_ROUTES) },
      { path: 'perfil',          loadChildren: () => import('./app/feature/perfil/perfil.routes').then(m => m.PERFIL_ROUTES) },
      { path: 'mensajes',        loadChildren: () => import('./app/feature/mensajes/pages/messages.routes').then(m => m.MENSAJES_ROUTES) },
      { path: 'crud',            loadChildren: () => import('./app/feature/crud/crud.routes').then(m => m.CRUD_ROUTES) },
    ]
  },

  // Auth fuera del shell
  { path: 'auth', loadChildren: () => import('./app/feature/auth/auth.routes').then(m => m.AUTH_ROUTES) },

  // 404
  { path: '**', loadChildren: () => import('./app/feature/not-found/not-found.routes').then(m => m.NOT_FOUND_ROUTES) }
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];
