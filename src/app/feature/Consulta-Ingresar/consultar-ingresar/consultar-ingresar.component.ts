import { Component } from '@angular/core';
import { Identificacion } from '../../auth/pages/identificacion/Identificacion';
import { AppTopbar } from '../../topbar/topbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-ingresar',
  standalone: true,
  imports: [Identificacion, AppTopbar],
  template: `
    <app-topbar></app-topbar>
    <app-identification
      [redirectTo]="'/home/contenido'">
    </app-identification>
  `,
  styles: [`:host{display:block;padding:1rem;}`]
})
export class ConsultarIngresarComponent {}

