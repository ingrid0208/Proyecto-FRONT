import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

export interface Multa {
  tipo: string;
  fecha: Date | string;
  descripcion: string;
  costo: number;
  estado: 'Pendiente' | 'Pagada' | 'Vencida';
}

@Component({
  selector: 'app-generic-multas-table',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatChipsModule],
  templateUrl: './generic-multas-table.component.html',
  styleUrls: ['./generic-multas-table.component.scss']
})
export class GenericMultasTableComponent {
  @Input() multas: Multa[] = [];

  displayedColumns: string[] = ['tipo', 'fecha', 'descripcion', 'costo', 'estado'];

  chipColor(estado: Multa['estado']): 'primary' | 'accent' | 'warn' {
    switch ((estado || 'Pendiente').toLowerCase()) {
      case 'pagada':  return 'accent';
      case 'vencida': return 'warn';
      default:        return 'primary';
    }
  }
}
