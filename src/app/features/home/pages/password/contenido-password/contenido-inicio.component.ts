import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { GenericMultasTableComponent } from '../../../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../../../shared/models/util/table.Generic';
import { CardHeaderComponent } from '../../../../../shared/components/card-header/card-header.component';
import { DocumentSessionService } from '../../../../../core/services/documents/document-session.service';
import { FilterService } from '../../../../../core/services/filters/filter.service';
import { SessionPingService } from '../../../../../core/services/utils/session-ping.service';

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
    CardHeaderComponent
  ]
})
export class ContenidoInicioComponent implements OnInit {
  multas: MultaTableRow[] = [];
  ciudadano = '';
  noResults = false;
  searchWarning = '';


  columns: ColumnDef[] = [
    { key: 'tipo',        header: 'Tipo de multa',        type: 'text' },
    { key: 'fecha',       header: 'Fecha de infracción',  type: 'date', dateFormat: 'dd/MM/yyyy' },
    { key: 'descripcion', header: 'Descripción',          type: 'text' },
    { key: 'estado',      header: 'Estado',               type: 'chip' },
  ];

  constructor(
    private router: Router,
    private documentSessionService: DocumentSessionService,
    private filterService: FilterService,
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
        // 👈 Guardamos userId en sesión para el buscador
        sessionStorage.setItem('userId', String(first.userId));
        this.ciudadano = [first.firstName, first.lastName].filter(Boolean).join(' ');
      }
    } catch (error) {
      console.error('Error al cargar multas:', error);
    }
  }

  // 📌 Filtro con buscador
  async onSearch(term: string) {
  try {
    const userId = Number(sessionStorage.getItem('userId'));
    if (!userId) {
      console.warn('No hay userId en sesión');
      return;
    }

    // ⚠️ Validar el campo de búsqueda
    if (term && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(term)) {
      this.searchWarning = 'Solo puedes buscar por tipo de multa o descripción.';
      this.noResults = false;
      this.multas = [];
      return;
    } else {
      this.searchWarning = '';
    }

    const r = await this.filterService.filterMultas({ userId, searchTerm: term }).toPromise();
    const data = r?.data ?? [];

    this.multas = data.map((x: any) => ({
      id: x.id,
      userId: x.userId,
      tipo: x.typeInfractionName ?? '—',
      fecha: x.dateInfraction ?? '',
      descripcion: x.observations ?? '',
      estado: mapEstadoFromEnum(x.stateInfraction)
    }));

    // 🚩 Activar bandera sin resultados
    this.noResults = this.multas.length === 0;

  } catch (error) {
    console.error('Error al filtrar multas:', error);
    this.noResults = true;
  }
}


  onMultaSelected(multa: MultaTableRow) {
    console.log('Multa seleccionada:', multa);

    if (multa.estado !== 'Pendiente') {
      alert(`No se puede realizar un acuerdo de pago porque la multa está en estado "${multa.estado}".`);
      return;
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
