// core/services/session-ping.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { interval as rxInterval, Subscription, of, switchMap, catchError } from 'rxjs';
import { ServiceGenericService } from './generic/service-generic.service';

// core/services/session-ping.service.ts
@Injectable({ providedIn: 'root' })
export class SessionPingService implements OnDestroy {
  private sub?: Subscription;
  constructor(private api: ServiceGenericService) {}

  start(interval: number = 70000) {
    this.stop();
    this.sub = rxInterval(interval).pipe(
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
