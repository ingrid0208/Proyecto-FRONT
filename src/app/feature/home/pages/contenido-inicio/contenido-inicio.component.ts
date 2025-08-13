import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { GenericMultasTableComponent } from '../../../../shared/components/generic-multas-table/generic-multas-table.component';
import type { Multa } from '../../../../shared/components/generic-multas-table/generic-multas-table.component';
import { AppTopbar } from '../../../topbar/topbar.component';

@Component({
  selector: 'app-contenido-inicio',
  standalone: true,
  templateUrl: './contenido-inicio.component.html',
  styleUrls: ['./contenido-inicio.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    GenericMultasTableComponent,
    AppTopbar
  ]
})
export class ContenidoInicioComponent {
 multas: Multa[] = [
    { tipo: 'Exceso de velocidad', fecha: new Date(2025, 0, 12), descripcion: 'Zona escolar', costo: 350000, estado: 'Pendiente' },
    { tipo: 'Mal estacionamiento', fecha: new Date(2025, 2, 3), descripcion: 'Bloqueo de hidrante', costo: 180000, estado: 'Pagada' },
    { tipo: 'Semáforo en rojo', fecha: new Date(2025, 4, 21), descripcion: 'Cruce con cámara', costo: 420000, estado: 'Vencida' },
  ];

  botonTexto: string = 'Generar Acuerdo de Pago';

  constructor(private router: Router) {}

  onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}
