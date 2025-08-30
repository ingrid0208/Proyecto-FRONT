import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

interface RegisterRequest {
  person: { name: string; lastName: string | null };
  user: { user: string; gmail: string; password: string };
}

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
          <input pInputText placeholder="Nombre completo" [(ngModel)]="fullName" class="styled-input" />
        </label>
      </div>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-envelope input-icon"></i>
          <input pInputText placeholder="Correo electrónico" [(ngModel)]="email" class="styled-input" />
        </label>
      </div>

      <div class="input-group">
        <label class="input-label">
          <i class="pi pi-lock input-icon"></i>
          <input pInputText type="password" placeholder="Contraseña" [(ngModel)]="password" class="styled-input" />
        </label>
      </div>

      <button pButton label="Registrarse"
              class="p-button-success w-full mt-3 login-btn pulse"
              [disabled]="!canSubmit()"
              (click)="onRegister()"></button>

      <div class="login-links">
        <a [routerLink]="'/login'">¿Ya tienes cuenta?</a>
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

  private splitName(n: string): { name: string; lastName: string | null } {
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return { name: parts[0], lastName: null };
    const lastName = parts.pop()!;
    return { name: parts.join(' '), lastName };
  }

  canSubmit(): boolean {
    return !!(this.fullName.trim() && this.email.trim() && this.password.length >= 6);
  }

  onRegister(): void {
    const { name, lastName } = this.splitName(this.fullName);
    const payload: RegisterRequest = {
      person: { name, lastName },
      user: {
        user: this.email.trim(),     // usa email como username
        gmail: this.email.trim(),
        password: this.password
      }
    };

    // TODO: Llama tu servicio HTTP aquí.
    console.log('Payload mínimo:', payload);
  }
}
