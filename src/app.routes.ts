// src/app.routes.ts
import { Routes, provideRouter } from '@angular/router';

export const routes: Routes = [
  // ⬇⬇⬇ redirige la raíz a /auth/inicio
  { path: '', pathMatch: 'full', redirectTo: 'auth/inicio' },

  {
    path: '',
    loadComponent: () =>
      import('./app/layout/shell/app.layout').then(m => m.AppLayout),
    children: [
  

      { path: 'home',            loadChildren: () => import('./app/feature/home/pages/password/home.routes').then(m => m.HOMEPASSWORD_ROUTES) },
      { path: 'consultar-ingresar', loadChildren: () => import('./app/feature/Consulta-Ingresar/consultar.routes').then(m => m.CONSULTAR_ROUTES) },
      { path: 'notificaciones',  loadChildren: () => import('./app/feature/notificacion-multas/pages/notificacion-multas.routes').then(m => m.NOTIFICACION_ROUTES) },
      { path: 'acuerdo-pago',    loadChildren: () => import('./app/feature/acuerdo-pago/acuerdo-pago.routes').then(m => m.ACUERDO_PAGO_ROUTES) },
      { path: 'tipos-multas',    loadChildren: () => import('./app/feature/tipos-multas/tipos-multas.routes').then(m => m.TIPOS_MULTAS_ROUTES) },
      { path: 'uikit',           loadChildren: () => import('./app/feature/auth/pages/uikit-demo/uikit.routes').then(m => m.UIKIT_ROUTES) },
      { path: 'calendario',      loadChildren: () => import('./app/feature/calendario/calendario.routes').then(m => m.CALENDARIO_ROUTES) },
      { path: 'perfil',          loadChildren: () => import('./app/feature/perfil/perfil.routes').then(m => m.PERFIL_ROUTES) },
      { path: 'mensajes',        loadChildren: () => import('./app/feature/mensajes/pages/messages.routes').then(m => m.MENSAJES_ROUTES) },
      { path: 'crud',            loadChildren: () => import('./app/feature/crud/crud.routes').then(m => m.CRUD_ROUTES) },
  { path: 'roles',           loadChildren: () => import('./app/features/modelo-de-seguridad/roles-page/roles-page.routes').then(m => m.ROLES_ROUTES) },
  // Ruta deshabilitada temporalmente: { path: 'modulos-permisos', loadChildren: () => import('./app/features/modulos-permisos-page/module-form.routes').then(m => m.MODULOS_PERMISOS_ROUTES) },
  { path: 'usuarios', loadChildren: () => import('./app/features/modelo-de-seguridad/usuarios-page/usuarios-page.routes').then(m => m.USUARIOS_ROUTES) },
  { path: 'personas',        loadChildren: () => import('./app/features/modelo-de-seguridad/personas/personas-page/personas-page.routes').then(m => m.PERSONAS_ROUTES) },
  { path: 'formularios',     loadChildren: () => import('./app/features/modelo-de-seguridad/Form/form.routes').then(m => m.FORM_ROUTES) },
  { path: 'modulos',         loadChildren: () => import('./app/features/modelo-de-seguridad/module/module.routes').then(m => m.MODULE_ROUTES) },
  { path: 'form-modules',    loadChildren: () => import('./app/features/modelo-de-seguridad/form-module/form-module.routes').then(m => m.FORM_MODULE_ROUTES) },
  { path: 'rol-form-permission', loadChildren: () => import('./app/features/modelo-de-seguridad/Rol-Form-Permission/rol-form-permission.routes').then(m => m.ROL_FORM_PERMISSION_ROUTES) },
  { path: 'rol-user', loadChildren: () => import('./app/features/modelo-de-seguridad/Rol-user/rol-user.routes').then(m => m.rolUserRoutes) },
  { path: 'parameters',      loadChildren: () => import('./app/features/parameters/parameters.routes').then(m => m.PARAMETERS_ROUTES) },
  { path: 'inspectora/generar-multa', loadChildren: () => import('./app/feature/Inspectora/generar-multa.routes').then(m => m.GENERAR_MULTA_ROUTES) },
  { path: 'permisos', loadChildren: () => import('./app/features/modelo-de-seguridad/permisos/permisos-page.routes').then(m => m.PERMISOS_ROUTES) },
    ]
  },

  { path: 'contenido-documento', loadChildren: () => import('./app/feature/home/pages/document/documento.routes').then(m => m.DOCUMENT_ROUTES) },

  { path: 'identificacion', loadChildren: () => import('./app/feature/auth/pages/identificacion/identificacion.routes').then(m => m.IDENTIFICACION_ROUTES) },

  // Módulo Auth (aquí vive /auth/inicio)
  { path: 'auth', loadChildren: () => import('./app/feature/auth/auth.routes').then(m => m.AUTH_ROUTES) },

  // 404
  { path: '**', loadChildren: () => import('./app/feature/not-found/not-found.routes').then(m => m.NOT_FOUND_ROUTES) }
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];
