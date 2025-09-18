import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ColumnDef } from '../../Models/table.Generic';
import { ServiceGenericService } from '../../../core/services/servicesGeneric/service-generic.service';
import { SessionPingService } from '../../../core/services/session-ping.service'; // si usas el ping
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generic-multas-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, MatButtonModule],
  templateUrl: './generic-multas-table.component.html',
  styleUrls: ['./generic-multas-table.component.scss']
})
export class GenericMultasTableComponent {
  @Input() data: any[] = [];
  @Input() columns: ColumnDef[] = [];
  @Output() rowClicked = new EventEmitter<any>();

  constructor(
    private auth: ServiceGenericService,
    private router: Router,
    private sessionPing: SessionPingService // opcional

  ) { }

  get displayedColumnKeys(): string[] {
    return this.columns.map(c => c.key);
  }

  chipColor(value: any): 'primary' | 'accent' | 'warn' {
    const estado = (value ?? 'Pendiente')?.toString().toLowerCase();
    switch (estado) {
      case 'pagada': return 'accent';
      case 'vencida': return 'warn';
      default: return 'primary';
    }
  }

  onRowClick(row: any) {
    const original = this.data.find(item =>
      item.descripcion === row.descripcion &&
      item.tipo === row.tipo &&
      item.fecha === row.fecha
    );

    const selected = original ?? row;

    // 🚨 validar estado
    if (selected.estado !== 'Pendiente') {
      Swal.fire({
        icon: 'warning',
        title: 'Acción no permitida',
        text: `No se puede crear un acuerdo de pago para una multa en estado "${selected.estado}".`,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
      return; // 👈 detenemos el evento
    }

    this.rowClicked.emit(selected);
  }


}
