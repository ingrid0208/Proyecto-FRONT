import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
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
        <label for="usuario" class="input-label">
          <i class="pi pi-user input-icon"></i>
          <input
            id="usuario"
            type="text"
            pInputText
            [(ngModel)]="email"
            placeholder="Usuario"
            class="styled-input"
          />
        </label>
      </div>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-lock input-icon"></i>
          <input
            id="password"
            type="password"
            pInputText
            [(ngModel)]="password"
            placeholder="Contraseña"
            class="styled-input"
          />
        </label>
      </div>

      <!-- Antes tenía [routerLink]; ahora es función -->
      <button
        pButton
        label="Iniciar Sesión"
        class="p-button-success w-full mt-3 login-btn pulse"
        (click)="onLogin()">
      </button>

      <div class="login-links">
        <a (click)="goToRecovery($event)">¿Olvidaste tu contraseña?</a>
        <a  (click)="goToRegister($event)">¿Deseas Registrarte?</a>
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
  checked = false;

  constructor(private router: Router) {}

  onLogin(): void {
    // aquí luego llamas a tu API, por ahora solo navega:
    this.router.navigate(['/auth/identificacion']);
  }

  goToRecovery(e?: Event) { e?.preventDefault(); this.router.navigate(['/auth/recovery-password']); }
  goToRegister(e?: Event) { e?.preventDefault(); this.router.navigate(['/auth/registrar']); }
}