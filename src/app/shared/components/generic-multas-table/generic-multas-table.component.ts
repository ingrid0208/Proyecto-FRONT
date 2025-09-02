import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ColumnDef } from '../../Models/table.Generic';
import { ServiceGenericService } from '../../../core/services/servicesGeneric/service-generic.service';
import { SessionPingService } from '../../../core/services/session-ping.service'; // si usas el ping

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

  constructor(
    private auth: ServiceGenericService,
    private router: Router,
    private sessionPing: SessionPingService // opcional
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

 
}
