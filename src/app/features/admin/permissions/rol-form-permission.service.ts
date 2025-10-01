import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RolFormPermission,
  RolFormPermissionDisplay,
  CreateRolFormPermission,
  UpdateRolFormPermission,
  RoleOption,
  FormOption,
  PermissionOption
} from './rol-form-permission.model';

@Injectable({
  providedIn: 'root'
})
export class RolFormPermissionService {
  private readonly baseUrl = 'http://localhost:8080/api/RolFormPermission';

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
  getAvailableRoles(): Observable<RoleOption[]> {
    return this.getAll().pipe(
      map(items => {
        const uniqueRoles = items.reduce((acc: RoleOption[], item) => {
          if (!acc.find(role => role.id === item.rolid)) {
            acc.push({ id: item.rolid, name: item.rolName });
          }
          return acc;
        }, []);
        return uniqueRoles;
      })
    );
  }

  /**
   * Obtiene todos los formularios disponibles (para dropdowns)
   */
  getAvailableForms(): Observable<FormOption[]> {
    return this.getAll().pipe(
      map(items => {
        const uniqueForms = items.reduce((acc: FormOption[], item) => {
          if (!acc.find(form => form.id === item.formid)) {
            acc.push({ id: item.formid, name: item.formName });
          }
          return acc;
        }, []);
        return uniqueForms;
      })
    );
  }

  /**
   * Obtiene todos los permisos disponibles (para dropdowns)
   */
  getAvailablePermissions(): Observable<PermissionOption[]> {
    return this.getAll().pipe(
      map(items => {
        const uniquePermissions = items.reduce((acc: PermissionOption[], item) => {
          if (!acc.find(permission => permission.id === item.permissionid)) {
            acc.push({ id: item.permissionid, name: item.permissionName });
          }
          return acc;
        }, []);
        return uniquePermissions;
      })
    );
  }
}
