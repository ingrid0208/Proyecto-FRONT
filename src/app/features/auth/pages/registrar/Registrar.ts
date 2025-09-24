import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ServiceGenericService } from '../../../../core/services/utils/generic/service-generic.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-Registrar',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule],
  template: `
<div class="login-wrapper animate-fade-in">
  <div class="login-card">
    <div class="login-image">
      <img src="../../../assets/demo/login.png" alt="Imagen de fondo" />
    </div>

    <div class="login-form">
      <img src="../../../assets/demo/login_Arriba.png" class="corner corner-top-right" />
      <h2>Registrar</h2>

      <div class="input-group">
        <label class="input-label" [class.error]="showNameError">
          <i class="pi pi-user input-icon"></i>
          <input
            #fullNameInput
            pInputText
            placeholder="Nombre completo"
            [(ngModel)]="fullName"
            class="styled-input"
            (blur)="validateField('fullName')"
            (input)="clearFieldError('fullName')" />
        </label>
        <div *ngIf="showNameError" class="field-error">
          El nombre debe tener al menos 2 caracteres
        </div>
      </div>

      <div class="input-group">
        <label class="input-label" [class.error]="showEmailError">
          <i class="pi pi-envelope input-icon"></i>
          <input
            #emailInput
            pInputText
            placeholder="Correo electrónico"
            [(ngModel)]="email"
            class="styled-input"
            (blur)="validateField('email')"
            (input)="clearFieldError('email')" />
        </label>
        <div *ngIf="showEmailError" class="field-error">
          {{emailErrorMessage}}
        </div>
      </div>

      <div class="input-group">
        <label class="input-label" [class.error]="showPasswordError">
          <i class="pi pi-lock input-icon"></i>
          <input
            #passwordInput
            pInputText
            type="password"
            placeholder="Contraseña"
            [(ngModel)]="password"
            class="styled-input"
            (blur)="validateField('password')"
            (input)="clearFieldError('password')" />
        </label>
        <div *ngIf="showPasswordError" class="field-error">
          La contraseña debe tener al menos 6 caracteres
        </div>
      </div>

      <button
        pButton
        [label]="loading ? 'Registrando...' : 'Registrarse'"
        class="p-button-success w-full mt-3 login-btn pulse"
        [disabled]="!canSubmit() || loading"
        [loading]="loading"
        (click)="onRegister()">
      </button>

      <div class="login-links">
        <a [routerLink]="'/auth/login'">¿Ya tienes cuenta?</a>
        <a (click)="goToHome($event)" [class.loading]="navigatingHome">
          <span *ngIf="!navigatingHome">Volver al inicio</span>
          <span *ngIf="navigatingHome">Cargando...</span>
        </a>
      </div>

      <img src="../../../assets/demo/login_Abajo.png" class="corner corner-bottom-left" />
    </div>
  </div>
</div>
  `
})
export class Registrar {
  fullName = '';
  email = '';
  password = '';
  loading = false;
  navigatingHome = false;

  // Validation states
  showNameError = false;
  showEmailError = false;
  showPasswordError = false;
  emailErrorMessage = '';

  @ViewChild('fullNameInput') fullNameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordRef!: ElementRef<HTMLInputElement>;

  constructor(private api: ServiceGenericService, private router: Router) { }

  canSubmit(): boolean {
    return !!(
      this.fullName.trim().length >= 2 &&
      this.email.trim().length > 0 &&
      this.isValidEmail(this.email.trim()) &&
      this.password.length >= 6
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateField(field: string): void {
    switch (field) {
      case 'fullName':
        this.showNameError = this.fullName.trim().length < 2;
        break;
      case 'email':
        const email = this.email.trim();
        if (email.length === 0) {
          this.showEmailError = true;
          this.emailErrorMessage = 'El correo electrónico es requerido';
        } else if (!this.isValidEmail(email)) {
          this.showEmailError = true;
          this.emailErrorMessage = 'Ingresa un correo electrónico válido';
        } else {
          this.showEmailError = false;
          this.emailErrorMessage = '';
        }
        break;
      case 'password':
        this.showPasswordError = this.password.length < 6;
        break;
    }
  }

  clearFieldError(field: string): void {
    switch (field) {
      case 'fullName':
        this.showNameError = false;
        break;
      case 'email':
        this.showEmailError = false;
        this.emailErrorMessage = '';
        break;
      case 'password':
        this.showPasswordError = false;
        break;
    }
  }

  onRegister(): void {
    if (!this.canSubmit() || this.loading) return;
    this.loading = true;

    const [firstName, ...rest] = this.fullName.trim().split(' ');
    const lastName = rest.join(' ');

    const payload = {
      email: this.email.trim().toLowerCase(),
      password: this.password.trim(),
      firstName: firstName || '',
      lastName: lastName || ''
    };

    this.api.registrar(payload).subscribe({
      next: () => {
        this.api.sendVerification(firstName, this.email).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Registro exitoso!',
              text: 'Te enviamos un código de verificación a tu correo.',
              confirmButtonText: 'Continuar'
            }).then(() => this.router.navigate(['/auth/verify-code'], {
              queryParams: { email: this.email.trim() }
            }));
          },
          error: (verificationErr) => {
            console.error('Error sending verification:', verificationErr);
            Swal.fire({
              icon: 'warning',
              title: 'Registro completado',
              text: 'Tu cuenta fue creada pero hubo un problema enviando el código de verificación. Intenta iniciar sesión.',
              confirmButtonText: 'Ir a Login'
            }).then(() => this.router.navigate(['/auth/login']));
          }
        });
      },
      error: async (err: HttpErrorResponse) => {
        await this.handleRegistrationError(err);
      },
      complete: () => (this.loading = false)
    });
  }


  private fieldOrder = ['firstName', 'lastName', 'email', 'password'];

  private async handleRegistrationError(err: HttpErrorResponse): Promise<void> {
    const errorPayload = await this.normalizeErrorPayload(err);

    // Manejo específico por código de estado
    switch (err.status) {
      case 400:
        await this.handle400Error(errorPayload);
        break;
      case 409:
        await this.handle409Error(errorPayload);
        break;
      case 422:
        await this.handle422Error(errorPayload);
        break;
      default:
        await this.handleGenericError(err, errorPayload);
        break;
    }
  }

  private async handle400Error(errorPayload: any): Promise<void> {
    const firstError = this.pickFirstError(errorPayload?.errors);
    if (firstError) {
      await Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: firstError.message,
        confirmButtonText: 'Corregir'
      });
      this.focusField(firstError.field);
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Datos inválidos',
        text: errorPayload?.message || 'Por favor, verifica los datos ingresados.',
        confirmButtonText: 'Entendido'
      });
    }
  }

  private async handle409Error(errorPayload: any): Promise<void> {
    await Swal.fire({
      icon: 'warning',
      title: 'Usuario ya existe',
      text: 'Este correo electrónico ya está registrado. ¿Deseas iniciar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Ir a Login',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/auth/login']);
      } else {
        this.focusField('email');
      }
    });
  }

  private async handle422Error(errorPayload: any): Promise<void> {
    const firstError = this.pickFirstError(errorPayload?.errors);
    if (firstError) {
      await Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: firstError.message,
        confirmButtonText: 'Corregir'
      });
      this.focusField(firstError.field);
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Error de procesamiento',
        text: errorPayload?.message || 'Los datos no pudieron ser procesados.',
        confirmButtonText: 'Entendido'
      });
    }
  }

  private async handleGenericError(err: HttpErrorResponse, errorPayload: any): Promise<void> {
    console.error('Registration error:', err);
    let message = 'Ocurrió un error inesperado. Intenta nuevamente.';

    if (err.status === 0) {
      message = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    } else if (err.status >= 500) {
      message = 'Error del servidor. Intenta nuevamente más tarde.';
    } else if (errorPayload?.message) {
      message = errorPayload.message;
    }

    await Swal.fire({
      icon: 'error',
      title: 'Error de registro',
      text: message,
      confirmButtonText: 'Reintentar'
    });
  }

  private async normalizeErrorPayload(err: HttpErrorResponse): Promise<any> {
    if (err?.error instanceof Blob) {
      try { return JSON.parse(await err.error.text()); } catch { return {}; }
    }
    if (typeof err?.error === 'string') {
      try { return JSON.parse(err.error); } catch { return {}; }
    }
    return err?.error ?? {};
  }

  private pickFirstError(errors: Record<string, string[]> | undefined): { field: string; message: string } | null {
    if (!errors) return null;
    for (const f of this.fieldOrder) {
      const list = errors[f];
      if (list?.length) return { field: f, message: list[0] };
    }
    for (const key of Object.keys(errors)) {
      const list = errors[key];
      if (list?.length) return { field: key, message: list[0] };
    }
    return null;
  }

  private focusField(field: string): void {
    const map: Record<string, ElementRef<HTMLInputElement> | undefined> = {
      firstName: this.fullNameRef,
      lastName: this.fullNameRef,
      email: this.emailRef,
      password: this.passwordRef
    };
    const ref = map[field];
    if (ref?.nativeElement) {
      setTimeout(() => ref.nativeElement.focus(), 100);
    }
  }

  goToHome(e?: Event) {
    e?.preventDefault();
    this.navigatingHome = true;

    setTimeout(() => {
      this.router.navigate(['/']).finally(() => {
        this.navigatingHome = false;
      });
    }, 500);
  }
}
