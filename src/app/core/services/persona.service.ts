import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../../shared/Models/persona.model';

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private personasSubject = new BehaviorSubject<Persona[]>([]);
  personas$ = this.personasSubject.asObservable();

  constructor() {
    // Datos de ejemplo
    this.personasSubject.next([
      {
        firstName: 'Juan',
        lastName: 'Pérez',
        phoneNumber: '123456789',
        address: 'Calle 123 #45-67',
        documentTypeId: 1,
        municipalityId: 1,
      }
      // ...puedes agregar más personas
    ]);
  }

  getPersonas(): Observable<Persona[]> {
    return this.personas$;
  }

  // Métodos para agregar, editar, eliminar...
}
