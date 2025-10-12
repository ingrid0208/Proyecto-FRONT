// ===============================
import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

// Services
import { ProfileService } from '../../../core/services/profile/profile.service';
import { LayoutService } from '../../../layout/services/layout.service';
import { AuthService } from '../../../core/services/auth/auth.service';

// Models
import { ProfileDto, ProfileUpdateDto } from '../../../shared/models/profile/profile.model';

// ===============================
// 👤 Componente de Perfil
// ===============================
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('op') overlayPanel: any;

  // Services
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  public layoutService = inject(LayoutService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  // Observables
  private destroy$ = new Subject<void>();

  // Datos
  profile: ProfileDto | null = null;
  profileForm!: FormGroup;
  isLoading = false;
  isSaving = false;



  // ===============================
  // 📌 Ciclo de vida
  // ===============================

  ngOnInit(): void {
    console.log('🎯 ProfileComponent cargado exitosamente!');
    this.initForm();
    this.loadProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===============================
  // 📌 Inicialización
  // ===============================

  private initForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['mobina', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['Mir', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['912000000', [Validators.pattern(/^[0-9]{7,15}$/), Validators.maxLength(15)]],
      city: ['software']
    });
  }

  private loadProfile(): void {
    this.isLoading = true;
    this.profileService.getMyProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profile) => {
          console.log('✅ Perfil cargado exitosamente:', profile);
          this.profile = profile;
          this.populateForm(profile);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Error al cargar perfil:', error);

          // Si falla, usar datos de prueba para que al menos se vea el formulario
          console.warn('⚠️ Usando datos de prueba...');
          const mockProfile: ProfileDto = {
            id: 1,
            firstName: 'Usuario',
            lastName: 'Demo',
            email: 'usuario@demo.com',
            phoneNumber: '3001234567',
            address: 'Dirección de prueba',
            dateOfBirth: '1990-01-01',
            gender: 'male',
            profileImage: 'https://cdn-icons-png.flaticon.com/512/219/219983.png'
          };

          this.profile = mockProfile;
          this.populateForm(mockProfile);
          this.showError('No se pudo cargar el perfil del servidor. Mostrando datos de ejemplo.');
          this.isLoading = false;
        }
      });
  }

  private populateForm(profile: ProfileDto): void {
    this.profileForm.patchValue({
      firstName: profile.firstName || 'mobina',
      lastName: profile.lastName || 'Mir',
      email: profile.email || '',
      phoneNumber: profile.phoneNumber || '912000000',
      city: 'software'
    });

    // Ya no necesitamos manejar la imagen de perfil
    // if (profile.profileImage) {
    //   this.previewImageUrl = profile.profileImage;
    // }
  }

  // ===============================
  // 📌 Manejo de formulario
  // ===============================

  onSubmit(): void {
    if (this.profileForm.valid && !this.isSaving) {
      this.isSaving = true;

      const updateData: ProfileUpdateDto = {
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        phoneNumber: this.profileForm.get('phoneNumber')?.value
      };

      this.profileService.updateMyProfile(updateData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (updatedProfile) => {
            this.profile = updatedProfile;
            this.showSuccess('Perfil actualizado correctamente');
            this.isSaving = false;
          },
          error: (error) => {
            console.error('Error al actualizar perfil:', error);
            this.showError('Error al actualizar el perfil');
            this.isSaving = false;
          }
        });
    } else {
      this.showError('Por favor completa correctamente todos los campos requeridos');
    }
  }

  onDiscard(): void {
    if (this.profile) {
      this.populateForm(this.profile);
      // this.selectedImageFile = null; // Ya no necesario
      this.showInfo('Cambios descartados');
    }
  }

  // ===============================
  // 📌 Manejo de imagen - YA NO NECESARIO
  // ===============================

  // onImageSelect(event: any): void {
  //   // Método comentado - ya no necesitamos manejar imágenes
  // }

  // private uploadImage(): void {
  //   // Método comentado - ya no necesitamos subir imágenes
  // }

  // ===============================
  // 📌 Navegación y acciones
  // ===============================

  toggleDarkMode(): void {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.overlayPanel?.hide();
  }

  openSettings(): void {
    this.showInfo('Funcionalidad de configuración próximamente');
    this.overlayPanel?.hide();
  }

  logout(): void {
    this.authService.logouts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.profileService.clearProfile();
          this.overlayPanel?.hide();
        },
        error: (error) => {
          console.error('Error al cerrar sesión:', error);
          // Forzar logout local si falla el servidor
          localStorage.clear();
          this.router.navigate(['/auth/login']);
          this.overlayPanel?.hide();
        }
      });
  }

  // ===============================
  // 📌 Utilidades
  // ===============================

  // getProfileImage(): string {
  //   // Ya no necesitamos este método - ahora usamos iniciales
  //   return this.previewImageUrl || this.profile?.profileImage || this.defaultImage;
  // }

  getFullName(): string {
    if (this.profile) {
      return `${this.profile.firstName} ${this.profile.lastName}`;
    }
    return 'Usuario';
  }

  getInitials(): string {
    if (this.profile && this.profile.firstName && this.profile.lastName) {
      return `${this.profile.firstName.charAt(0).toUpperCase()}${this.profile.lastName.charAt(0).toUpperCase()}`;
    }
    return 'U';
  }

  // ===============================
  // 📌 Mensajes
  // ===============================

  private showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
      life: 3000
    });
  }

  private showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000
    });
  }

  private showInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: message,
      life: 3000
    });
  }
}
