import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Module {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private readonly apiUrl = 'https://localhost:7286/api/Module';

  constructor(private http: HttpClient) {}

  // Obtener todos los módulos
  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl);
  }

  // Obtener un módulo por ID
  getModule(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo módulo
  createModule(module: Omit<Module, 'id'>): Observable<Module> {
    return this.http.post<Module>(this.apiUrl, module);
  }

  // Actualizar un módulo
  updateModule(id: number, module: Partial<Module>): Observable<Module> {
    return this.http.put<Module>(`${this.apiUrl}/${id}`, module);
  }

  // Eliminar un módulo
  deleteModule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}