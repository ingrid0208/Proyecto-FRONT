import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  RolFormPermission, 
  RolFormPermissionDisplay, 
  CreateRolFormPermission, 
  UpdateRolFormPermission 
} from './rol-form-permission.model';

@Injectable({
  providedIn: 'root'
})
export class RolFormPermissionService {
  private readonly baseUrl = 'https://localhost:7286/api/RolFormPermission';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los roles-formularios-permisos
   */
  getAll(): Observable<RolFormPermission[]> {
    return this.http.get<RolFormPermission[]>(this.baseUrl);
  }

  /**
   * Obtiene todos los roles-formularios-permisos para mostrar (solo nombres)
   */
  getAllForDisplay(): Observable<RolFormPermissionDisplay[]> {
    return this.getAll().pipe(
      map(items => items.map(item => ({
        permissionName: item.permissionName,
        rolName: item.rolName,
        formName: item.formName
      })))
    );
  }

  /**
   * Obtiene un rol-formulario-permiso por ID
   */
  getById(id: number): Observable<RolFormPermission> {
    return this.http.get<RolFormPermission>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crea un nuevo rol-formulario-permiso
   */
  create(item: CreateRolFormPermission): Observable<RolFormPermission> {
    return this.http.post<RolFormPermission>(this.baseUrl, item);
  }

  /**
   * Actualiza un rol-formulario-permiso existente
   */
  update(item: UpdateRolFormPermission): Observable<RolFormPermission> {
    return this.http.put<RolFormPermission>(`${this.baseUrl}/${item.id}`, item);
  }

  /**
   * Elimina un rol-formulario-permiso por ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Busca roles-formularios-permisos por filtros
   */
  search(filters: {
    rolName?: string;
    formName?: string;
    permissionName?: string;
  }): Observable<RolFormPermission[]> {
    let params = new HttpParams();
    
    if (filters.rolName) {
      params = params.set('rolName', filters.rolName);
    }
    if (filters.formName) {
      params = params.set('formName', filters.formName);
    }
    if (filters.permissionName) {
      params = params.set('permissionName', filters.permissionName);
    }

    return this.http.get<RolFormPermission[]>(this.baseUrl, { params });
  }

  /**
   * Obtiene todos los roles disponibles (para dropdowns)
   */
  getAvailableRoles(): Observable<string[]> {
    return this.getAll().pipe(
      map(items => [...new Set(items.map(item => item.rolName))])
    );
  }

  /**
   * Obtiene todos los formularios disponibles (para dropdowns)
   */
  getAvailableForms(): Observable<string[]> {
    return this.getAll().pipe(
      map(items => [...new Set(items.map(item => item.formName))])
    );
  }

  /**
   * Obtiene todos los permisos disponibles (para dropdowns)
   */
  getAvailablePermissions(): Observable<string[]> {
    return this.getAll().pipe(
      map(items => [...new Set(items.map(item => item.permissionName))])
    );
  }
}