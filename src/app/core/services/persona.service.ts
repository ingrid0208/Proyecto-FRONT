import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../../shared/models/persona.model';

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private personasSubject = new BehaviorSubject<Persona[]>([]);
  personas$ = this.personasSubject.asObservable();

  constructor() {
    // Datos de ejemplo
    this.personasSubject.next([
      {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        documento: '12345678',
        email: 'juan@mail.com',
        telefono: '123456789',
        rol: 'Administrador',
        estado: 'activo',
        fechaCreacion: new Date()
      }
      // ...puedes agregar más personas
    ]);
  }

  getPersonas(): Observable<Persona[]> {
    return this.personas$;
  }

  // Métodos para agregar, editar, eliminar...
}
