// src/app/features/mensajes/mensajes.routes.ts
import { Routes } from '@angular/router';

export const MENSAJES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./mensajes/messages')
        .then(m => m.MessagesComponent)
  }
];
