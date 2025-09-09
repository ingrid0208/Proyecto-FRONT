// core/services/session-ping.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription, of, switchMap, catchError } from 'rxjs';
import { ServiceGenericService } from './service-generic.service';

// core/services/session-ping.service.ts
@Injectable({ providedIn: 'root' })
export class SessionPingService implements OnDestroy {
  private sub?: Subscription;
  constructor(private api: ServiceGenericService) {}

  start() {
    this.stop();
    this.sub = interval(70_000).pipe(
      switchMap(() =>
        this.api.pingDocSession().pipe(
          catchError(() => { this.stop(); return of(null); }) // corta al primer 401/error
        )
      )
    ).subscribe();
  }
  stop() { this.sub?.unsubscribe(); this.sub = undefined; }
  ngOnDestroy() { this.stop(); }
}
