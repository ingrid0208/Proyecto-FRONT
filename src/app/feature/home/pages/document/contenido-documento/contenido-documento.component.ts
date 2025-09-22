import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColumnDef } from '../../../../../shared/Models/table.Generic';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { GenericMultasTableComponent } from '../../../../../shared/components/generic-multas-table/generic-multas-table.component';
import { CardHeaderComponent } from '../../../../../shared/components/card-header/card-header.component';
import { ServiceGenericService } from '../../../../../core/services/servicesGeneric/service-generic.service';
import { UserInfractionSelectDto } from '../../../../../shared/Models/Entities/userInfractionSelectDto';
import { SessionPingService } from '../../../../../core/services/servicesGeneric/session-ping.service';

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
  styleUrl: './contenido-documento.component.scss'
})
export class ContenidoDocumentoComponent implements OnInit, OnDestroy {

  constructor(
    private auth: ServiceGenericService,
    private router: Router,
    private sessionPing: SessionPingService
  ) {}

  multas: UserInfractionSelectDto[] = [];
  ciudadano = '';

  columns: ColumnDef[] = [
    { key: 'tipo', header: 'Tipo de multa', type: 'text' },
    { key: 'fecha', header: 'Fecha de infracción', type: 'date', dateFormat: 'dd/MM/yyyy' },
    { key: 'descripcion', header: 'Descripción', type: 'text' },
    { key: 'estado', header: 'Estado', type: 'chip' },
  ];

  async ngOnInit() {
    this.sessionPing.start(); // ⬅️ arranca el monitor

    // ...tu lógica actual (leer navigation state, fallback a sessionStorage, etc.)
    const nav = this.router.getCurrentNavigation();
    const st: any = nav?.extras?.state ?? history.state;

    if (st?.multas?.length) {
      this.multas = st.multas;
      this.ciudadano = st.ciudadano ?? '';
      return;
    }

    const docTypeId = Number(sessionStorage.getItem('docTypeId'));
    const docNumber = sessionStorage.getItem('docNumber') || '';
    if (!docTypeId || !docNumber) {
      alert('No se encontraron datos de documento. Inicia la consulta nuevamente.');
      this.router.navigate(['/auth/inicio']);
      return;
    }

    try {
      const r = await this.auth.getMultasByDocument(docTypeId, docNumber).toPromise();
      const data = r?.data ?? [];
      if (!data.length) {
        alert('Este usuario no tiene multas registradas.');
        this.router.navigate(['/auth/inicio']);
        return;
      }

      this.multas = data.map((x: any) => ({
        tipo: x.typeInfractionName ?? '—',
        fecha: x.dateInfraction ?? '',
        descripcion: x.observations ?? '',
        estado: mapEstadoFromBool(x.stateInfraction)
      }));
      const first = data[0];
      this.ciudadano = [first?.firstName, first?.lastName].filter(Boolean).join(' ');
    } catch (e: any) {
      alert(e?.error?.message || 'No fue posible obtener las multas.');
      this.router.navigate(['/auth/inicio']);
    }
  }

  ngOnDestroy() {
    // ⬅️ ¡AHORA sí se detiene al salir de la ruta!
    this.sessionPing.stop();
  }

  onBack() {
    this.auth.logout().subscribe({
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

function mapEstadoFromBool(v: boolean | null | undefined): 'Pendiente' | 'Pagada' | 'Vencida' {
  if (v === true) return 'Pagada';
  if (v === false) return 'Pendiente';
  return 'Pendiente';
}
