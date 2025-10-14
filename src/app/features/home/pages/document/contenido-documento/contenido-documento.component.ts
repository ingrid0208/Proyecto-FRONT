import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColumnDef } from '../../../../../shared/Models/util/table.Generic';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { GenericMultasTableComponent } from '../../../../../shared/components/generic-multas-table/generic-multas-table.component';
import { CardHeaderComponent } from '../../../../../shared/components/card-header/card-header.component';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { DocumentSessionService } from '../../../../../core/services/documents/document-session.service';
import { SessionPingService } from '../../../../../core/services/utils/session-ping.service';

interface MultaTableRow {
  tipo: string;
  fecha: string;
  descripcion: string;
  estado: 'Pendiente' | 'Pagada' | 'Vencida' | 'Con acuerdo';
}

@Component({
  selector: 'app-contenido-documento',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    GenericMultasTableComponent,
    CardHeaderComponent,
  ],
  templateUrl: './contenido-documento.component.html',
  styleUrls: ['./contenido-documento.component.scss'] // 🔹 styleUrls (plural)
})
export class ContenidoDocumentoComponent implements OnInit, OnDestroy {

  multas: MultaTableRow[] = [];
  ciudadano = '';

  columns: ColumnDef[] = [
    { key: 'tipo', header: 'Tipo de multa', type: 'text' },
    { key: 'fecha', header: 'Fecha de infracción', type: 'date', dateFormat: 'dd/MM/yyyy' },
    { key: 'descripcion', header: 'Descripción', type: 'text' },
    { key: 'estado', header: 'Estado', type: 'chip' },
  ];

  constructor(
    private authService: AuthService,
    private documentSessionService: DocumentSessionService,
    private router: Router,
    private sessionPing: SessionPingService
  ) {}

  // 📌 Carga inicial de multas (usando docTypeId + docNumber)
  async ngOnInit() {
    const docTypeId = Number(sessionStorage.getItem('docTypeId'));
    const docNumber = sessionStorage.getItem('docNumber') || '';
    if (!docTypeId || !docNumber) return;

    try {
      const r = await this.documentSessionService.getMultasByDocument(docTypeId, docNumber).toPromise();
      this.sessionPing.start();
      const data = r?.data ?? [];

      this.multas = data.map((x: any) => ({
        id: x.id,
        userId: x.userId,
        tipo: x.typeInfractionName ?? '—',
        fecha: x.dateInfraction ?? '',
        descripcion: x.observations ?? '',
        estado: mapEstadoFromEnum(x.stateInfraction)
      }));

      const first = data[0];
      if (first) {
        this.ciudadano = [first.firstName, first.lastName].filter(Boolean).join(' ');
      }
    } catch (error) {
      console.error('Error al cargar multas:', error);
    }
  }

  ngOnDestroy() {
    this.sessionPing.stop();
  }

  onBack() {
    this.authService.logout().subscribe({
      next: () => {
        this.sessionPing.stop();
        this.router.navigate(['/auth/inicio']);
      },
      error: () => {
        this.sessionPing.stop();
        this.router.navigate(['/auth/inicio']);
      }
    });
  }
}

// 🔎 Mapear enum del backend a texto legible
function mapEstadoFromEnum(v: string | number | null | undefined): 'Pendiente' | 'Pagada' | 'Vencida' | 'Con acuerdo' {
  if (v === null || v === undefined) return 'Pendiente';

  if (typeof v === 'string') {
    switch (v) {
      case 'Pendiente': return 'Pendiente';
      case 'Pagada': return 'Pagada';
      case 'Vencida': return 'Vencida';
      case 'ConAcuerdoPago': return 'Con acuerdo';
    }
  }

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