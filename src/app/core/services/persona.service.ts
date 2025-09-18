import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../../shared/Models/persona.model';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

@Injectable({ providedIn: 'root' })
export class PersonaService {
  readonly endpoint = 'Person';
  private personasSubject = new BehaviorSubject<Persona[]>([]);
  personas$ = this.personasSubject.asObservable();

  constructor(public genericService: ServiceGenericService) {
    this.loadPersonas();
  }

  private loadPersonas(): void {
    this.genericService.getAll<Persona>(this.endpoint).subscribe({
      next: (personas) => this.personasSubject.next(personas),
      error: (error) => {
        console.error('Error al cargar personas:', error);
        this.personasSubject.next([]);
      }
    });
  }

 

  refreshPersonas(): void {
    this.loadPersonas();
  }
}



