import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-Registrar',
  standalone: true,
  imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
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

      <button pButton label="Registrarse" class="p-button-success w-full mt-3 login-btn pulse"></button>

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
  fullName: string = '';
  email: string = '';
  password: string = '';
}
