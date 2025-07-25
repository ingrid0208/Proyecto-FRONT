import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

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
      <img src="../../../assets/demo/login_Arriba.png" class="corner corner-top-right" />

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

<!-- Contraseña -->
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



      <button pButton label="Iniciar Sesión" class="p-button-success w-full mt-3 login-btn pulse"></button>

      <div class="login-links">
        <a href="#">¿Olvidaste tu contraseña?</a>
        <a href="#">¿Deseas Registrarte?</a>
      </div>

      <img src="../../../assets/demo/login_Abajo.png" class="corner corner-bottom-left" />
    </div>
  </div>
</div>


    `
})
export class Login {
    email: string = '';

    password: string = '';

    checked: boolean = false;
}
