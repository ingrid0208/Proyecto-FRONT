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

interface Multa {
  tipo: string;
  fecha: Date | string;
  descripcion: string;
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
    CardHeaderComponent,
    AppTopbar
  ]
})
export class ContenidoInicioComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ServiceGenericService,
    private sessionPing: SessionPingService
  ) {}

  multas: Multa[] = [];
  ciudadano = '';

  columns: ColumnDef[] = [
    { key: 'tipo',        header: 'Tipo de multa',        type: 'text' },
    { key: 'fecha',       header: 'Fecha de infracción',  type: 'date', dateFormat: 'dd/MM/yyyy' },
    { key: 'descripcion', header: 'Descripción',          type: 'text' },
    { key: 'estado',      header: 'Estado',               type: 'chip' },
  ];

  botonTexto = 'Generar Acuerdo de Pago';

  async ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const st: any = nav?.extras?.state ?? history.state;

    if (st?.multas?.length) {
      this.multas = st.multas;
      this.ciudadano = st.ciudadano ?? '';
      return;
    }

    const docTypeId = Number(sessionStorage.getItem('docTypeId'));
    const docNumber = sessionStorage.getItem('docNumber') || '';
    if (!docTypeId || !docNumber) return; // podría ser la home general sin datos

    try {
      const r = await this.api.getMultasByDocument(docTypeId, docNumber).toPromise();
      this.sessionPing.start();
      const data = r?.data ?? [];
      this.multas = data.map((x: any) => ({
        tipo:        x.typeInfractionName ?? '—',
        fecha:       x.dateInfraction ?? '',
        descripcion: x.observations ?? '',
        estado:      mapEstadoFromBool(x.stateInfraction)
      }));
      const first = data[0];
      this.ciudadano = [first?.firstName, first?.lastName].filter(Boolean).join(' ');
    } catch { /* opcional: manejar errores */ }
  }

  onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}

function mapEstadoFromBool(v: boolean | null | undefined): 'Pendiente' | 'Pagada' | 'Vencida' {
  if (v === true) return 'Pagada';
  if (v === false) return 'Pendiente';
  return 'Pendiente';
}
