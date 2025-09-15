import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Form {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly apiUrl = 'https://localhost:7286/api/Form';

  constructor(private http: HttpClient) {}

  // Obtener todos los formularios
  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(this.apiUrl);
  }

  // Obtener un formulario por ID
  getForm(id: number): Observable<Form> {
    return this.http.get<Form>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo formulario
  createForm(form: Omit<Form, 'id'>): Observable<Form> {
    return this.http.post<Form>(this.apiUrl, form);
  }

  // Actualizar un formulario
  updateForm(id: number, form: Partial<Form>): Observable<Form> {
    return this.http.put<Form>(`${this.apiUrl}/${id}`, form);
  }

  // Eliminar un formulario
  deleteForm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}