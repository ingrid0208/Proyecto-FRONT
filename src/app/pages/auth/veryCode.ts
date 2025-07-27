import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [FormsModule, RouterModule, ButtonModule, InputTextModule],
  styleUrls: ['../../../assets/layout/_veryCode.scss'],
  template: `
    <div class="login-wrapper animate-fade-in">
      <div class="login-card">
        <!-- Imagen -->
        <div class="login-image">
          <img src="../../../assets/demo/login.png" alt="Imagen de fondo" />
        </div>

        <!-- Formulario -->
        <div class="login-form">
          <img src="../../../assets/demo/login_Arriba.png" class="corner corner-top-right" />

          <h2>Codigo de verificación</h2>
          <p class="subtitle">ingresa el codigo de verificación que te enviamos a tu correo</p>

          <div class="code-input-group">
            <input *ngFor="let digit of code; let i = index"
              [(ngModel)]="code[i]"
              maxlength="2"
              class="code-box"
              type="text"
              pInputText />
          </div>

          <button
            pButton
            label="Confirmar"
            class="p-button-success w-full mt-3 login-btn pulse"
            (click)="confirmCode()"
          ></button>

          <img src="../../../assets/demo/login_Abajo.png" class="corner corner-bottom-left" />
        </div>
      </div>
    </div>
  `
})
export class VerifyCodeComponent {
  code: string[] = ['', '', '', '', ''];

  confirmCode() {
    const fullCode = this.code.join('');
    console.log('Código ingresado:', fullCode);
    alert('✅ Código confirmado: ' + fullCode);
  }
}
