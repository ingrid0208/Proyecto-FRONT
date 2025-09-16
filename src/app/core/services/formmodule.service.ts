import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormModule {
  id?: number;
  formid: number;
  moduleid: number;
  formName: string;
  moduleName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormModuleService {
  private readonly apiUrl = 'https://localhost:7286/api/FormModule';

  constructor(private http: HttpClient) {}

  // Obtener todos los form-modules
  getFormModules(): Observable<FormModule[]> {
    return this.http.get<FormModule[]>(this.apiUrl);
  }

  // Obtener un form-module por ID
  getFormModule(id: number): Observable<FormModule> {
    return this.http.get<FormModule>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo form-module
  createFormModule(formModule: Omit<FormModule, 'id'>): Observable<FormModule> {
    return this.http.post<FormModule>(this.apiUrl, formModule);
  }

  // Actualizar un form-module
  updateFormModule(id: number, formModule: Partial<FormModule>): Observable<FormModule> {
    return this.http.put<FormModule>(`${this.apiUrl}/${id}`, formModule);
  }

  // Eliminar un form-module
  deleteFormModule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}