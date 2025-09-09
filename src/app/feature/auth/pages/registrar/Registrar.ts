import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ServiceGenericService } from '../../../../core/services/servicesGeneric/service-generic.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-Registrar',
  standalone: true,
  imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule],
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
        <label class="input-label">
          <i class="pi pi-user input-icon"></i>
          <input #fullNameInput pInputText placeholder="Nombre completo" [(ngModel)]="fullName" class="styled-input" />
        </label>
      </div>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-envelope input-icon"></i>
          <input #emailInput  pInputText placeholder="Correo electrónico" [(ngModel)]="email" class="styled-input" />
        </label>
      </div>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-lock input-icon"></i>
          <input #passwordInput pInputText type="password" placeholder="Contraseña" [(ngModel)]="password" class="styled-input" />
        </label>
      </div>

      <button
        pButton
        label="Registrarse"
        class="p-button-success w-full mt-3 login-btn pulse"
        [disabled]="!canSubmit()"
        (click)="onRegister()">
      </button>

      <div class="login-links">
        <a [routerLink]="'/auth/login'">¿Ya tienes cuenta?</a>
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

  // (opcional) para enfocar el input que falló:
  @ViewChild('fullNameInput') fullNameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordRef!: ElementRef<HTMLInputElement>;

  constructor(private api: ServiceGenericService, private router: Router) {}

  canSubmit(): boolean {
    return !!(this.fullName.trim() && this.email.trim() && this.password.length >= 6);
  }

  onRegister(): void {
    if (!this.canSubmit()) return;
    this.loading = true;

    const payloadCamel = {
      nombreCompleto: this.fullName.trim(),
      email: this.email.trim(),
      password: this.password
    };

    this.api.registrar(payloadCamel).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora inicia sesión.'
        }).then(() => this.router.navigate(['/auth/verify-code']));
      },
      error: async (err: HttpErrorResponse) => {
        // 1) Convertir a objeto en caso de HTML/Blob
        const payload = await this.normalizeErrorPayload(err);

        // 2) Tomar SOLO el primer error (por prioridad)
        const firstError = this.pickFirstError(payload?.errors);
        if (firstError) {
          const { field, message } = firstError;

          await Swal.fire({
            icon: 'error',
            title: 'Validación',
            text: message,
            confirmButtonText: 'Corregir'
          });

          // 3) (opcional) Enfocar el campo correspondiente
          this.focusField(field);
          return;
        }

        // Fallback si no vino estructura de FluentValidation
        Swal.fire({
          icon: 'error',
          title: `Error ${err.status || ''}`,
          text: payload?.message ?? 'Ocurrió un error al registrar.'
        });
      },
      complete: () => (this.loading = false)
    });
  }

  // --- Helpers ---

  /** Orden de prioridad de campos */
  private fieldOrder = ['NombreCompleto', 'email', 'password'];

  /** Normaliza el error por si vino text/html o Blob y no JSON */
  private async normalizeErrorPayload(err: HttpErrorResponse): Promise<any> {
    if (err?.error instanceof Blob) {
      try { return JSON.parse(await err.error.text()); } catch { return {}; }
    }
    if (typeof err?.error === 'string') {
      try { return JSON.parse(err.error); } catch { return {}; }
    }
    return err?.error ?? {};
  }

  /**
   * Toma SOLO el primer error del objeto errors de FluentValidation,
   * según el orden deseado (NombreCompleto → email → password).
   * Estructura esperada:
   * { errors: { NombreCompleto: [msg1, msg2], email: [...], password: [...] } }
   */
  private pickFirstError(errors: Record<string, string[]> | undefined):
    { field: string; message: string } | null {
    if (!errors) return null;

    // 1) Buscar por prioridad explícita
    for (const f of this.fieldOrder) {
      const list = errors[f];
      if (list?.length) return { field: f, message: list[0] };
    }

    // 2) Si vino otra clave no prevista, tomar la primera disponible
    for (const key of Object.keys(errors)) {
      const list = errors[key];
      if (list?.length) return { field: key, message: list[0] };
    }

    return null;
  }

  /** Enfoca el input del campo con error (si definiste los #refs en el template) */
  private focusField(field: string) {
    const map: Record<string, ElementRef<HTMLInputElement> | undefined> = {
      NombreCompleto: this.fullNameRef,
      email: this.emailRef,
      password: this.passwordRef
    };
    const ref = map[field];
    if (ref?.nativeElement) {
      setTimeout(() => ref.nativeElement.focus(), 0);
    }
  }
}