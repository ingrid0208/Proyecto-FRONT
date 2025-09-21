import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ColumnDef } from '../../models/table.Generic';
import { ServiceGenericService } from '../../../core/services/utils/generic/service-generic.service';

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
    private router: Router
  ) {}

  get displayedColumnKeys(): string[] {
    return this.columns.map(c => c.key);
  }

  chipColor(value: any): 'primary' | 'accent' | 'warn' {
    const estado = (value ?? 'Pendiente')?.toString().toLowerCase();
    switch (estado) {
      case 'pagada':  return 'accent';
      case 'vencida': return 'warn';
      default:        return 'primary';
    }
  }

  onRowClick(row: any) {
  const original = this.data.find(item =>
    item.descripcion === row.descripcion &&
    item.tipo === row.tipo &&
    item.fecha === row.fecha
  );

  this.rowClicked.emit(original ?? row);
}



}
