import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [FormsModule, RouterModule, ButtonModule, InputTextModule, RippleModule],
  template: `
    <div class="login-wrapper animate-fade-in">
      <div class="login-card">
        <!-- Imagen de fondo -->
        <div class="login-image">
          <img src="../../../assets/demo/login.png" alt="Imagen de fondo" />
        </div>

        <!-- Formulario -->
        <div class="login-form">
          <img src="../../../assets/demo/login_Arriba.png" class="corner corner-top-right" />

          <h2>Recuperar Contraseña</h2>
          <p class="subtitle">por favor ingresa la dirección de correo electrónico asociada a tu cuenta</p>

          <div class="input-group">
            <label class="input-label">
              <i class="pi pi-envelope input-icon"></i>
              <input
                pInputText
                placeholder="Digita tu Usuario"
                [(ngModel)]="email"
                class="styled-input"
              />
            </label>
          </div>

          <button
            pButton
            label="Enviar"
            class="p-button-success w-full mt-3 login-btn pulse"
            (click)="sendRecoveryEmail()"
          ></button>

          <img src="../../../assets/demo/login_Abajo.png" class="corner corner-bottom-left" />
        </div>
      </div>
    </div>
  `
})
export class RecoverPasswordComponent {
  email: string = '';

  sendRecoveryEmail() {
    // Acá podrías hacer la lógica real de recuperación
    console.log(`📨 Enviando a: ${this.email}`);
    alert('Si este correo está registrado, recibirás un enlace para restablecer la contraseña.');
  }
}
