import { Component } from '@angular/core';
import { Identificacion } from '../../../auth/pages/identificacion/identificacion.component';

@Component({
  selector: 'app-consultar-ingresar',
  standalone: true,
  imports: [Identificacion],
  template: `
    <app-identification
      [redirectTo]="'/home/contenido'">
    </app-identification>
  `,
  styles: [`:host{display:block;padding:1rem;}`]
})
export class ConsultarIngresarComponent {}

