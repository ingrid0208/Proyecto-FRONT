// ===============================
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, tap, catchError, throwError, map, switchMap } from 'rxjs';
import { ApiService } from '../base/api.service';
import { ProfileDto, ProfileUpdateDto } from '../../../shared/Models/profile/profile.model';

// ===============================
// 👤 Servicio de Perfil
// ===============================
@Injectable({ providedIn: 'root' })
export class ProfileService extends ApiService {
  private readonly personEndpoint = 'Person';

  // Store para el perfil del usuario actual
  private profileSubject = new BehaviorSubject<ProfileDto | null>(null);
  public profile$ = this.profileSubject.asObservable();

  // ===============================
  // 📌 Métodos de consulta
  // ===============================

  /**
   * Obtiene el perfil del usuario autenticado actual
   * Usa Auth/me y luego Person/{id}
   */
  getMyProfile(): Observable<ProfileDto> {
    return this.http.get<any>(
      this.url('Auth', 'me'),
      this.optsCookie()
    ).pipe(
      switchMap(user => {
        console.log('✅ Usuario obtenido:', user);

        // Si tiene personId, obtener datos completos de la persona
        if (user.personId) {
          return this.http.get<any>(
            this.url(this.personEndpoint, user.personId),
            this.optsCookie()
          ).pipe(
            map(person => {
              console.log('✅ Persona obtenida:', person);

              const profile: ProfileDto = {
                id: person.id,
                firstName: person.firstName || '',
                lastName: person.lastName || '',
                email: user.email,
                phoneNumber: person.phoneNumber || '',
                address: person.address || '',
                municipalityId: person.municipalityId,
                documentTypeId: person.documentTypeId,
                documentNumber: person.documentNumber || '',
              };

              this.profileSubject.next(profile);
              return profile;
            })
          );
        }

        // Si no hay personId, crear perfil básico con datos del user
        const profile: ProfileDto = {
          firstName: user.fullName?.split(' ')[0] || '',
          lastName: user.fullName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
        };

        this.profileSubject.next(profile);
        return new Observable<ProfileDto>(observer => {
          observer.next(profile);
          observer.complete();
        });
      }),
      catchError(error => {
        console.error('❌ Error al cargar perfil:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Obtiene un perfil por ID (requiere permisos)
   */
  getProfileById(id: number): Observable<ProfileDto> {
    return this.http.get<ProfileDto>(
      this.url(this.personEndpoint, id),
      this.optsCookie()
    );
  }

  // ===============================
  // 📌 Métodos de actualización
  // ===============================

  /**
   * Actualiza el perfil del usuario autenticado
   */
  updateMyProfile(data: ProfileUpdateDto): Observable<ProfileDto> {
    // Primero obtener el personId del usuario actual
    return this.http.get<any>(
      this.url('Auth', 'me'),
      this.optsCookie()
    ).pipe(
      switchMap(user => {
        if (!user.personId) {
          return throwError(() => new Error('Usuario no tiene una persona asociada'));
        }

        // Actualizar la persona
        return this.http.put<any>(
          this.url(this.personEndpoint, user.personId),
          data,
          this.optsCookie()
        ).pipe(
          map(person => {
            console.log('✅ Perfil actualizado:', person);

            const profile: ProfileDto = {
              id: person.id,
              firstName: person.firstName || '',
              lastName: person.lastName || '',
              email: user.email,
              phoneNumber: person.phoneNumber || '',
              address: person.address || '',
              municipalityId: person.municipalityId,
              documentTypeId: person.documentTypeId,
              documentNumber: person.documentNumber || '',
            };

            this.profileSubject.next(profile);
            return profile;
          })
        );
      }),
      catchError(error => {
        console.error('❌ Error al actualizar perfil:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Actualiza un perfil específico por ID (requiere permisos)
   */
  updateProfileById(id: number, data: ProfileUpdateDto): Observable<ProfileDto> {
    return this.http.put<ProfileDto>(
      this.url(this.personEndpoint, id),
      data,
      this.optsCookie()
    );
  }

  // ===============================
  // 📌 Métodos de imagen
  // ===============================

  /**
   * Sube una imagen de perfil
   */
  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', file);

    return this.http.post<any>(
      this.url(this.personEndpoint, 'upload-image'),
      formData,
      { withCredentials: true }
    ).pipe(
      tap(response => {
        console.log('✅ Imagen de perfil actualizada:', response);
        // Actualizar el perfil con la nueva imagen
        const currentProfile = this.profileSubject.value;
        if (currentProfile && response.imageUrl) {
          this.profileSubject.next({
            ...currentProfile,
            profileImage: response.imageUrl
          });
        }
      }),
      catchError(error => {
        console.error('❌ Error al subir imagen:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Elimina la imagen de perfil del usuario
   */
  deleteProfileImage(): Observable<any> {
    return this.http.delete(
      this.url(this.personEndpoint, 'delete-image'),
      this.optsCookie()
    ).pipe(
      tap(() => {
        console.log('✅ Imagen de perfil eliminada');
        const currentProfile = this.profileSubject.value;
        if (currentProfile) {
          this.profileSubject.next({
            ...currentProfile,
            profileImage: undefined
          });
        }
      })
    );
  }

  // ===============================
  // 📌 Métodos auxiliares
  // ===============================

  /**
   * Limpia el perfil del store
   */
  clearProfile(): void {
    this.profileSubject.next(null);
  }

  /**
   * Obtiene el perfil actual del store (síncrono)
   */
  getCurrentProfile(): ProfileDto | null {
    return this.profileSubject.value;
  }

  /**
   * Refresca el perfil desde el servidor
   */
  refreshProfile(): void {
    this.getMyProfile().subscribe();
  }
}
