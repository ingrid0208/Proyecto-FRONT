import { Injectable } from '@angular/core';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Municipio } from '../../shared/Models/municipio.model';
// ...existing code...

@Injectable({ providedIn: 'root' })
export class MunicipioService {
  readonly endpoint = 'municipality';
  private municipiosSubject = new BehaviorSubject<Municipio[]>([]);
  personas$ = this.municipiosSubject.asObservable();

  constructor(public genericService: ServiceGenericService) {
    this.loadMunicipios();
  }

  private loadMunicipios(): void {
    this.genericService.getAll<Municipio>(this.endpoint).subscribe({
      next: (municipios) => this.municipiosSubject.next(municipios),
      error: (error) => {
        console.error('Error al cargar municipios:', error);
        this.municipiosSubject.next([]);
      }
    });
  }

  

  refreshMunicipios(): void {
    this.loadMunicipios();
  }
}