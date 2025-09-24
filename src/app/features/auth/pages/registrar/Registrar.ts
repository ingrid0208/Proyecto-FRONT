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
        <label class="input-label">
          <i class="pi pi-user input-icon"></i>
          <input #fullNameInput pInputText placeholder="Nombre completo" [(ngModel)]="fullName" class="styled-input" />
        </label>
      </div>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-envelope input-icon"></i>
          <input #emailInput pInputText placeholder="Correo electrónico" [(ngModel)]="email" class="styled-input" />
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

  @ViewChild('fullNameInput') fullNameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordRef!: ElementRef<HTMLInputElement>;

  constructor(private api: ServiceGenericService, private router: Router) { }

  canSubmit(): boolean {
    return !!(this.fullName.trim() && this.email.trim() && this.password.length >= 6);
  }

  onRegister(): void {
    if (!this.canSubmit()) return;
    this.loading = true;

    const [firstName, ...rest] = this.fullName.trim().split(' ');
    const lastName = rest.join(' ');

    const payload = {
      email: this.email.trim(),
      password: this.password,
      firstName: firstName || '',
      lastName: lastName || ''
    };

    this.api.registrar(payload).subscribe({
      next: () => {
        // ✅ Enviar código de verificación inicial
        this.api.sendVerification(firstName, this.email).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Te enviamos un código de verificación a tu correo.'
          }).then(() => this.router.navigate(['/auth/verify-code'], {
            queryParams: { email: this.email } 
          }));
        });
      },
      error: async (err: HttpErrorResponse) => {
        // ... tu manejo de errores actual
      },
      complete: () => (this.loading = false)
    });
  }


  private fieldOrder = ['firstName', 'lastName', 'email', 'password'];

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

  private focusField(field: string) {
    const map: Record<string, ElementRef<HTMLInputElement> | undefined> = {
      firstName: this.fullNameRef,
      lastName: this.fullNameRef,
      email: this.emailRef,
      password: this.passwordRef
    };
    const ref = map[field];
    if (ref?.nativeElement) {
      setTimeout(() => ref.nativeElement.focus(), 0);
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
