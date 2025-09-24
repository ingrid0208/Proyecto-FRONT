import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LoginEmailResponse } from '../../../../shared/Models/auth/LoginEmailResponse';
import Swal from 'sweetalert2';
import { ServiceGenericService } from '../../../../core/services/utils/generic/service-generic.service';
import { validateEmail, validatePassword } from '../../../../shared/utils/validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule
  ],
  template: `
<div class="login-wrapper animate-fade-in">
  <div class="login-card">
    <div class="login-image">
      <img src="../../../assets/demo/login.png" alt="Imagen de fondo" />
    </div>

    <div class="login-form">
      <img src="../../../assets/demo/login_Arriba.png" class="corner corner-top-right" alt="" />
      <h2>Iniciar sesión</h2>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-user input-icon"></i>
          <input
            type="text"
            pInputText
            [(ngModel)]="email"
            placeholder="Correo Electrónico"
            class="styled-input"
          />
        </label>
      </div>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-lock input-icon"></i>
          <input
            type="password"
            pInputText
            [(ngModel)]="password"
            placeholder="Contraseña"
            class="styled-input"
          />
        </label>
      </div>

      <button
        pButton label="Iniciar Sesión"
        class="p-button-success w-full mt-3 login-btn pulse"
        (click)="onLogin()"
        [disabled]="!email || !password || loading">
      </button>

      <div class="login-links">
        <a (click)="goToRecovery($event)">¿Olvidaste tu contraseña?</a>
        <a (click)="goToRegister($event)">¿Deseas Registrarte?</a>
        <a (click)="goToHome($event)" [class.loading]="navigatingHome">
          <span *ngIf="!navigatingHome">Volver al inicio</span>
          <span *ngIf="navigatingHome">Cargando...</span>
        </a>
      </div>

      <img src="../../../assets/demo/login_Abajo.png" class="corner corner-bottom-left" alt="" />
    </div>
  </div>
</div>
  `
})
export class Login {
  email = '';
  password = '';
  loading = false;
  navigatingHome = false;

  constructor(private router: Router, private api: ServiceGenericService) { }

  onLogin(): void {
    const emailError = validateEmail(this.email);
    const passError = validatePassword(this.password);

    if (emailError || passError) {
      Swal.fire('Error', emailError || passError!, 'error');
      return;
    }

    // ✅ Si todo bien, continúa login
    this.loading = true;
    this.api.loginEmail({ email: this.email.trim(), password: this.password })
      .subscribe({
        next: (res: LoginEmailResponse) => {
          if (res.isSuccess) {
            const today = new Date();
            const lastVerification = res.lastVerificationSentAt
              ? new Date(res.lastVerificationSentAt)
              : null;

            const esDia4 = today.getDate() === 4;
            const yaVerificadoEsteMes =
              lastVerification &&
              lastVerification.getMonth() === today.getMonth() &&
              lastVerification.getFullYear() === today.getFullYear();

            if (esDia4 && !yaVerificadoEsteMes) {
              Swal.fire({
                icon: 'info',
                title: 'Verificación mensual requerida',
                text: 'Debes verificar tu correo electrónico para seguir usando tu cuenta.',
                confirmButtonText: 'Verificar ahora'
              }).then(() => {
                this.router.navigate(['/auth/verify-email']);
              });
            } else {
              this.router.navigate(['/consultar-ingresar/consultar-ingresar']);
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message || 'No se pudo iniciar sesión.'
            });
          }
        },
        error: (err) => {
          // 👇 Aquí aprovechamos la respuesta limpia del middleware
          const msg =
            err?.error?.message ||
            err?.message ||
            'Error inesperado al iniciar sesión';

          Swal.fire({
            icon: 'error',
            title: 'Error en inicio de sesión',
            text: msg
          });
        },
        complete: () => (this.loading = false)
      });
  }



  goToRecovery(e?: Event) {
    e?.preventDefault();
    this.router.navigate(['/auth/recovery-password']);
  }

  goToRegister(e?: Event) {
    e?.preventDefault();
    this.router.navigate(['/auth/registrar']);
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


