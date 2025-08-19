import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Persona } from '../../../shared/Models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = `${environment.apiUrl}/personas`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Error en la operación'));
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  createPersona(persona: Omit<Persona, 'id' | 'fechaCreacion'>): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona)
      .pipe(catchError(this.handleError));
  }

  updatePersona(id: number, persona: Partial<Persona>): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, persona)
      .pipe(catchError(this.handleError));
  }

  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
