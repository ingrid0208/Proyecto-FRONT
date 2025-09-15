import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Persona } from '../../shared/Models/persona.model';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private apiUrl = `${environment.apiURL}/Person`;
  private personasSubject = new BehaviorSubject<Persona[]>([]);
  personas$ = this.personasSubject.asObservable();

  constructor(
    private genericService: ServiceGenericService,
    private http: HttpClient
  ) {
    this.loadPersonas();
  }

  private loadPersonas(): void {
    // Usar HttpClient directamente para GET sin parámetros adicionales
    this.http.get<Persona[]>(this.apiUrl, this.getHttpOptions()).subscribe({
      next: (personas) => this.personasSubject.next(personas),
      error: (error) => {
        console.error('Error al cargar personas:', error);
        // Mantener datos de ejemplo en caso de error
        this.personasSubject.next([
          {
            firstName: 'Juan',
            lastName: 'Pérez',
            phoneNumber: '123456789',
            address: 'Calle 123 #45-67',
            municipalityId: 1,
            documentTypeId: 1,
          }
        ]);
      }
    });
  }

  private getHttpOptions() {
    const currentUser = localStorage.getItem('currentUser');
    const token = currentUser ? JSON.parse(currentUser)?.token : undefined;
    
    const headers: any = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return { headers };
  }

  getPersonas(): Observable<Persona[]> {
    return this.personas$;
  }

  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona, this.getHttpOptions()).pipe(
      map(response => {
        // Actualizar la lista local después de crear
        this.loadPersonas();
        return response;
      }),
      catchError(error => {
        console.error('Error al crear persona:', error);
        throw error;
      })
    );
  }

  updatePersona(persona: Persona): Observable<Persona> {
    if (!persona.id) {
      throw new Error('ID de persona requerido para actualizar');
    }
    return this.http.put<Persona>(`${this.apiUrl}/${persona.id}`, persona, this.getHttpOptions()).pipe(
      map(response => {
        // Actualizar la lista local después de actualizar
        this.loadPersonas();
        return response;
      }),
      catchError(error => {
        console.error('Error al actualizar persona:', error);
        throw error;
      })
    );
  }

  deletePersona(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHttpOptions()).pipe(
      map(response => {
        // Actualizar la lista local después de eliminar
        this.loadPersonas();
        return response;
      }),
      catchError(error => {
        console.error('Error al eliminar persona:', error);
        throw error;
      })
    );
  }

  refreshPersonas(): void {
    this.loadPersonas();
  }
}
