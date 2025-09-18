import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { GenericMultasTableComponent } from '../../../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../../../shared/Models/table.Generic';
import { CardHeaderComponent } from '../../../../../shared/components/card-header/card-header.component';
import { ServiceGenericService } from '../../../../../core/services/servicesGeneric/service-generic.service';
import { AppTopbar } from '../../../../topbar/topbar.component';
import { SessionPingService } from '../../../../../core/services/session-ping.service';

interface MultaTableRow {
  id: number;              // id de la multa (infractionId)
  userId: number;          // id del usuario
  tipo: string;
  fecha: string;
  descripcion: string;
  estado: 'Pendiente' | 'Pagada' | 'Vencida' | 'Con acuerdo';
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
    CardHeaderComponent,
    AppTopbar
  ]
})
export class ContenidoInicioComponent implements OnInit {
  multas: MultaTableRow[] = [];
  ciudadano = '';

  columns: ColumnDef[] = [
    { key: 'tipo',        header: 'Tipo de multa',        type: 'text' },
    { key: 'fecha',       header: 'Fecha de infracción',  type: 'date', dateFormat: 'dd/MM/yyyy' },
    { key: 'descripcion', header: 'Descripción',          type: 'text' },
    { key: 'estado',      header: 'Estado',               type: 'chip' },
  ];

  constructor(
    private router: Router,
    private api: ServiceGenericService,
    private sessionPing: SessionPingService
  ) {}

  async ngOnInit() {
    const docTypeId = Number(sessionStorage.getItem('docTypeId'));
    const docNumber = sessionStorage.getItem('docNumber') || '';
    if (!docTypeId || !docNumber) return;

    try {
      const r = await this.api.getMultasByDocument(docTypeId, docNumber).toPromise();
      this.sessionPing.start();
      const data = r?.data ?? [];

      this.multas = data.map((x: any) => ({
        id: x.id,              
        userId: x.userId,      
        tipo: x.typeInfractionName ?? '—',
        fecha: x.dateInfraction ?? '',
        descripcion: x.observations ?? '',
        // 👇 Usamos stateInfraction que viene del backend
        estado: mapEstadoFromEnum(x.stateInfraction)
      }));

      const first = data[0];
      this.ciudadano = [first?.firstName, first?.lastName].filter(Boolean).join(' ');
    } catch (error) {
      console.error('Error al cargar multas:', error);
    }
  }

 onMultaSelected(multa: MultaTableRow) {
  console.log('Multa seleccionada:', multa);

  if (multa.estado !== 'Pendiente') {
    alert(`No se puede realizar un acuerdo de pago porque la multa está en estado "${multa.estado}".`);
    return; // 🚫 detenemos la navegación
  }

  this.router.navigate(['/acuerdo-pago/formulario'], {
    state: {
      userId: multa.userId,
      infractionId: multa.id,
      ciudadano: this.ciudadano
    }
  });
}

}

// 🔎 Función para mapear el enum del backend a texto legible
function mapEstadoFromEnum(v: string | number | null | undefined): 'Pendiente' | 'Pagada' | 'Vencida' | 'Con acuerdo' {
  if (v === null || v === undefined) return 'Pendiente';

  // si backend envía string (ej. "ConAcuerdoPago")
  if (typeof v === 'string') {
    switch (v) {
      case 'Pendiente': return 'Pendiente';
      case 'Pagada': return 'Pagada';
      case 'Vencida': return 'Vencida';
      case 'ConAcuerdoPago': return 'Con acuerdo';
    }
  }

  // si backend envía número (ej. 0,1,2,3)
  if (typeof v === 'number') {
    switch (v) {
      case 0: return 'Pendiente';
      case 1: return 'Pagada';
      case 2: return 'Vencida';
      case 3: return 'Con acuerdo';
    }
  }

  return 'Pendiente';
}
