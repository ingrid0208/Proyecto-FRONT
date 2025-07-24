import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
      {
        path: 'calendar',
        loadComponent: () => import('./app/pages/calendar/calendar').then(m => m.CalendarComponent)
      },
      {
        path: 'messages',
        loadComponent: () => import('./app/pages/messages/messages').then(m => m.MessagesComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./app/pages/profile/profile').then(m => m.ProfileComponent)
      }
    ]
  },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' }
];
