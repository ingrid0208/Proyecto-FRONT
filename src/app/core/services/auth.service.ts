import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuariosService, UsuarioAPI } from '../../features/admin/users/usuarios.service';

export interface UserProfile {
  id: number;
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7286/api';
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService
  ) {
    // Verificar si hay un usuario logueado al inicializar
    this.loadCurrentUser();
  }

  // Obtener el perfil del usuario actual desde la API
  getCurrentUserProfile(): Observable<UserProfile> {
    // Obtener ID del usuario logueado desde localStorage/session
    const currentUserId = this.getCurrentUserIdFromSession();

    if (currentUserId) {
      // Obtener datos desde la API
      return this.usuariosService.getUsuario(currentUserId).pipe(
        map(usuario => this.mapUsuarioToProfile(usuario)),
        catchError(error => {
          console.error('Error obteniendo usuario de la API:', error);
          return this.getDefaultProfile();
        })
      );
    }

    // Si no hay usuario logueado, devolver perfil por defecto
    return this.getDefaultProfile();
  }

  // Obtener ID del usuario logueado desde la sesión
  private getCurrentUserIdFromSession(): number | null {
    // Primero intentar obtener desde localStorage
    const storedUserId = localStorage.getItem('currentUserId');
    if (storedUserId) {
      return parseInt(storedUserId, 10);
    }

    // Intentar obtener desde sessionStorage
    const sessionUserId = sessionStorage.getItem('currentUserId');
    if (sessionUserId) {
      return parseInt(sessionUserId, 10);
    }

    // Si no hay usuario en sesión, devolver null para mostrar perfil por defecto
    return null;
  }

  // Mapear Usuario a UserProfile
  private mapUsuarioToProfile(usuario: any): UserProfile {
    return {
      id: usuario.id,
      nombre: usuario.name || 'Usuario',
      apellido: usuario.lastName || '',
      tipoDocumento: usuario.documentType || 'Cédula de Ciudadanía',
      numeroDocumento: usuario.documentNumber || usuario.email || 'No disponible'
    };
  }

  // Obtener perfil por defecto cuando no hay datos de la API
  private getDefaultProfile(): Observable<UserProfile> {
    const defaultProfile: UserProfile = {
      id: 1,
      nombre: 'Usuario',
      apellido: 'Sistema',
      tipoDocumento: 'Cédula de Ciudadanía',
      numeroDocumento: 'No disponible'
    };

    this.currentUserSubject.next(defaultProfile);
    this.saveCurrentUserToStorage(defaultProfile);
    return of(defaultProfile);
  }

  // Obtener usuario desde API (implementar cuando esté disponible)
  getUserFromAPI(userId: number): Observable<UserProfile> {
    return this.http.get<any>(`${this.apiUrl}/Users/${userId}`).pipe(
      map(response => this.mapUserFromAPI(response)),
      catchError(() => this.getDefaultProfile())
    );
  }

  // Mapear respuesta de API a UserProfile
  private mapUserFromAPI(apiResponse: any): UserProfile {
    return {
      id: apiResponse.id || 1,
      nombre: apiResponse.name || 'Usuario',
      apellido: apiResponse.lastName || 'Admin',
      tipoDocumento: apiResponse.documentType || 'Cédula de Ciudadanía',
      numeroDocumento: apiResponse.documentNumber || '0000000000'
    };
  }

  // Actualizar perfil del usuario
  updateUserProfile(profileData: Partial<UserProfile>): Observable<UserProfile> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) {
      throw new Error('No hay usuario logueado');
    }

    // Mapear datos del perfil al formato de la API
    const apiData = {
      id: currentUser.id,
      email: currentUser.numeroDocumento, // Usar número de documento como email temporal
      documentTypeId: 1, // ID por defecto para tipo de documento
      documentNumber: profileData.numeroDocumento || currentUser.numeroDocumento
    };

    // Intentar actualizar en la API
    return this.usuariosService.updateUsuario(currentUser.id, {
      name: profileData.nombre || currentUser.nombre,
      email: apiData.email,
      password: '', // No actualizar contraseña
      personId: 1 // ID por defecto
    }).pipe(
      map(usuario => {
        const updatedProfile = { ...currentUser, ...profileData };
        this.currentUserSubject.next(updatedProfile);
        this.saveCurrentUserToStorage(updatedProfile);
        return updatedProfile;
      }),
      catchError(error => {
        console.error('Error actualizando usuario en la API:', error);
        // Si falla la API, actualizar localmente
        const updatedUser = { ...currentUser, ...profileData };
        this.currentUserSubject.next(updatedUser);
        this.saveCurrentUserToStorage(updatedUser);
        return of(updatedUser);
      })
    );
  }

  // Guardar usuario actual en localStorage
  private saveCurrentUserToStorage(user: UserProfile): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Obtener usuario actual desde localStorage
  private getCurrentUserFromStorage(): UserProfile | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  // Cargar usuario actual al inicializar el servicio
  private loadCurrentUser(): void {
    const user = this.getCurrentUserFromStorage();
    if (user) {
      this.currentUserSubject.next(user);
      return;
    }

    // Si hay un userId en sesión, cargar desde la API
    const userId = this.getCurrentUserIdFromSession();
    if (userId) {
      this.getCurrentUserProfile().subscribe({
        next: (profile) => {
          console.log('Usuario cargado desde la API:', profile);
        },
        error: (error) => {
          console.error('Error cargando usuario desde la API:', error);
        }
      });
    }
  }

  // Verificar si hay un usuario logueado
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Establecer usuario logueado (llamar desde el login)
  setCurrentUser(userId: number): void {
    localStorage.setItem('currentUserId', userId.toString());
    sessionStorage.setItem('currentUserId', userId.toString());

    // Cargar el perfil del usuario desde la API
    this.getCurrentUserProfile().subscribe({
      next: (profile) => {
        console.log('Usuario logueado cargado:', profile);
      },
      error: (error) => {
        console.error('Error cargando usuario logueado:', error);
      }
    });
  }

  // Login (método simulado) - En producción debería autenticar con la API
  login(email: string, password: string): Observable<UserProfile> {
    // Implementar lógica de login real con API
    // Por ahora, simular login exitoso con ID 1
    this.setCurrentUser(1);
    return this.getCurrentUserProfile();
  }

  // Obtener usuario actual sincrónicamente
  getCurrentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }
}