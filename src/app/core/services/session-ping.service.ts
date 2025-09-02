// src/app/core/services/session-ping.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subject, switchMap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SessionPingService implements OnDestroy {
  private stop$ = new Subject<void>();
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  start(periodMs = 60000) {
    // Evita duplicados si se llama dos veces
    this.stop();
    interval(periodMs)
      .pipe(
        switchMap(() =>
          this.http.get(`${this.baseUrl}/Login/ping`, {
            withCredentials: true, // importante para cookie de sesión
          }).pipe(
            // No lances error aquí: el interceptor global ya manejará el 401
            catchError(() => of(null))
          )
        )
      )
      .subscribe();
  }

  stop() {
    this.stop$.next();
  }

  ngOnDestroy() {
    this.stop();
    this.stop$.complete();
  }
}
