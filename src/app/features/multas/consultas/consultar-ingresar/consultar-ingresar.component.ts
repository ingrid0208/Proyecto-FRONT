import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-ingresar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="consultar-container">
      <h2>Consultar e Ingresar</h2>
      <p>Módulo para consultar información e ingresar datos</p>
    </div>
  `,
  styles: [`:host{display:block;padding:1rem;}`]
})
export class ConsultarIngresarComponent {}

