import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AppTopbar } from '../../../topbar/topbar.component';
import { GenericMultasTableComponent } from '../../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../../shared/Models/table.Generic';
import { CardHeaderComponent } from '../../../../shared/components/card-header/card-header.component';


// Si quieres tipar tus datos, define la interfaz aquí (local al padre)
interface Multa {
  tipo: string;
  fecha: Date | string;
  descripcion: string;
  costo: number;
  estado: 'Pendiente' | 'Pagada' | 'Vencida';
}

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
    AppTopbar,
    CardHeaderComponent
  ]
})
export class ContenidoInicioComponent {
  multas: Multa[] = [
    { tipo: 'Exceso de velocidad', fecha: new Date(2025, 0, 12), descripcion: 'Zona escolar', costo: 350000, estado: 'Pendiente' },
    { tipo: 'Mal estacionamiento', fecha: new Date(2025, 2, 3), descripcion: 'Bloqueo de hidrante', costo: 180000, estado: 'Pagada' },
    { tipo: 'Semáforo en rojo', fecha: new Date(2025, 4, 21), descripcion: 'Cruce con cámara', costo: 420000, estado: 'Vencida' },
  ];

  // Definición de columnas genéricas 
  columns: ColumnDef[] = [
    { key: 'tipo',        header: 'Tipo de multa',        type: 'text' },
    { key: 'fecha',       header: 'Fecha de infracción',  type: 'date',     dateFormat: 'dd/MM/yyyy' },
    { key: 'descripcion', header: 'Descripción',          type: 'text' },
    { key: 'costo',       header: 'Costo',                type: 'currency', currencyCode: 'COP', currencyDisplay: 'symbol' },
    { key: 'estado',      header: 'Estado',               type: 'chip' },
  ];

  botonTexto = 'Generar Acuerdo de Pago';

  constructor(private router: Router) {}

  onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}
