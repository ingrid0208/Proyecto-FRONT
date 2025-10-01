import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private subjects: { [event: string]: Subject<any> } = {};

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiURL}/infractionhub`) // 👈 tu hub
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => console.log('✅ Conectado a InfractionHub'))
      .catch(err => console.error('❌ Error al conectar con InfractionHub:', err));
  }

  on<T>(eventName: string): Observable<T> {
    if (!this.subjects[eventName]) {
      this.subjects[eventName] = new Subject<T>();
      this.hubConnection.on(eventName, (data: T) => {
        this.subjects[eventName].next(data);
      });
    }
    return this.subjects[eventName].asObservable();
  }
}
