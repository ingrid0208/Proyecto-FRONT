import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ServiceGenericService } from '../../../../core/services/servicesGeneric/service-generic.service';
import { LoginEmailResponse } from '../../../../shared/Models/auth/LoginEmailResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
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

  constructor(private router: Router, private api: ServiceGenericService) {}

  onLogin(): void {
    if (!this.email || !this.password) return;
    this.loading = true;

   this.api.loginEmail({ email: this.email.trim(), password: this.password })
    .subscribe({
      next: (res: LoginEmailResponse) => {
        if (res.isSuccess) {
          console.log('✅ Login exitoso:', res.message);
          this.router.navigate(['/consultar-ingresar/consultar-ingresar']);
        } else {
          alert('No se pudo iniciar sesión.');
        }
      },
      error: (err) => {
        console.error('Login error', err);
        alert(err?.error?.message ?? 'Error al iniciar sesión');
      },
      complete: () => this.loading = false
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
}
