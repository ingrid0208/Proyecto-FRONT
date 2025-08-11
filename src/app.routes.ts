// app.routes.ts
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      // Home: Inicio
      {
        path: '',
        loadComponent: () =>
          import('./app/components/contenido-inicio/contenido-inicio.component')
            .then(m => m.ContenidoInicioComponent)
      },

      // UIKit (NgModule)
      {
        path: 'uikit',
        loadChildren: () =>
          import('./app/pages/uikit/uikit.routes').then(m => m.UikitRoutesModule)
      },

      // Pages (standalone routes con export default)
      {
        path: 'pages',
        loadChildren: () => import('./app/pages/pages.routes') // ← export default
      },

      // Rutas sueltas con loadComponent
      {
        path: 'calendar',
        loadComponent: () =>
          import('./app/pages/calendar/calendar').then(m => m.CalendarComponent)
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./app/pages/messages/messages').then(m => m.MessagesComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./app/pages/profile/profile').then(m => m.ProfileComponent)
      }
    ]
  },

  // Auth como lazy standalone routes (si usas export default en auth.routes)
  {
    path: 'auth',
    loadChildren: () => import('./app/pages/auth/auth.routes')
  },

  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' }
];
