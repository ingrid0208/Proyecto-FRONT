// src/app/features/uikit-demo/uikit.routes.ts
import { Routes } from '@angular/router';

export const UIKIT_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'buttons' },

  // Demos propios del feature
  { path: 'buttons',
    loadComponent: () => import('./pages/buttondemo').then(m => m.ButtonDemo)
  },
  { path: 'charts',
    loadComponent: () => import('./pages/chartdemo').then(m => m.ChartDemo)
  },
  { path: 'list',
    loadComponent: () => import('./pages/listdemo').then(m => m.ListDemo)
  },
  { path: 'media',
    loadComponent: () => import('./pages/mediademo').then(m => m.MediaDemo)
  },
  { path: 'panels',
    loadComponent: () => import('./pages/panelsdemo').then(m => m.PanelsDemo)
  },
  { path: 'timeline',
    loadComponent: () => import('./pages/timelinedemo').then(m => m.TimelineDemo)
  },
  { path: 'table',
    loadComponent: () => import('./pages/tabledemo').then(m => m.TableDemo)
  },

  // Flujos de acuerdo (dentro del demo)
  { path: 'payment-agreement',
    loadComponent: () => import('./pages/payment-agreement')
      .then(m => m.PaymentAgreementComponent)
  },
  { path: 'generate-agreement',
    loadComponent: () => import('./pages/generate-agreement')
      .then(m => m.GenerateAgreementComponent)
  },


  { path: 'acuerdo-exitoso', redirectTo: '/acuerdo-pago/generado-ok' },

  { path: 'TipoMultas', redirectTo: '/tipos-multas', pathMatch: 'full' },
  { path: 'NotificacionMultas', redirectTo: '/notificaciones', pathMatch: 'full' },

  // 404 local del feature (opcional); normalmente dejas que la global maneje '**'
  { path: '**', redirectTo: 'buttons' }
];
