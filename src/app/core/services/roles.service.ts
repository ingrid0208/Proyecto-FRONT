import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rol {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly apiUrl = 'https://localhost:7286/api/Rol';

  constructor(private http: HttpClient) {}

  // Obtener todos los roles
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  // Obtener un rol por ID
  getRol(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo rol
  createRol(rol: Omit<Rol, 'id'>): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rol);
  }

  // Actualizar un rol existente
  updateRol(id: number, rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, rol);
  }

  // Eliminar un rol
  deleteRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}