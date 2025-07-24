import { Routes } from '@angular/router';
import { Crud } from './crud/crud';
import { CalendarComponent } from '../pages/calendar/calendar';
import { MessagesComponent } from '../pages/messages/messages';
import { ProfileComponent } from '../pages/profile/profile';

export default [
    { path: 'crud', component: Crud },
    { path: '**', redirectTo: '/notfound' },
     {path: 'calendar', loadComponent: () => import('../pages/calendar/calendar').then(m => m.CalendarComponent)
},
{
  path: 'messages',
  loadComponent: () => import('../pages/messages/messages').then(m => m.MessagesComponent)
},
{
  path: 'profile',
  loadComponent: () => import('../pages/profile/profile').then(m => m.ProfileComponent)
}
] as Routes;
