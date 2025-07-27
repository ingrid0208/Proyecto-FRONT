import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contenido-inicio',
  standalone: true,
  templateUrl: './contenido-inicio.component.html',
  styleUrls: ['./contenido-inicio.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    RouterModule
  ]
})
export class ContenidoInicioComponent {
  @Input() multas: any[] = [];  // ahora vienen desde afuera

  @Input() botonTexto: string = 'Generar Acuerdo de Pago';
  @Output() generarAcuerdo = new EventEmitter<void>(); // evento para notificar al padre

  displayedColumns = ['tipo', 'fecha', 'descripcion', 'costo', 'estado'];
}