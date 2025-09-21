// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,                // ⬅️ importa esto
} from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from '../../../app.routes';
import { authExpiredInterceptor } from '../interceptors/auth-expired.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({
        onSameUrlNavigation: 'reload',   // ⬅️ fuerza destruir/recrear el componente
        // urlUpdateStrategy: 'deferred', // opcional (por defecto)
      }),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([authExpiredInterceptor]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } },
    }),
  ],
};
