import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../shared/Models/table.Generic';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { ServiceGenericService } from '../../../core/services/servicesGeneric/service-generic.service';
import { finalize } from 'rxjs/operators';
import { AppTopbar } from '../../../topbar/topbar.component';
import { Municipality } from '../../../shared/Models/parameter/municipality.models';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [CommonModule, MatCardModule, AppTopbar, GenericMultasTableComponent, CardHeaderComponent,ButtonComponent],
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss']
})
export class MunicipalityComponent implements OnInit {
  private router = inject(Router);
  private api = inject(ServiceGenericService);

  municipios: Municipality[] = [];
  loading = false;
  errorMsg = '';

  columns: ColumnDef[] = [
    { key: 'name',           header: 'Municipio',      type: 'text' },
    { key: 'daneCode',       header: 'Código DANE',    type: 'text' },
    { key: 'departmentName', header: 'Departamento',   type: 'text' },
  ];

  ngOnInit(): void {
    this.cargarMunicipios();
  }

  private cargarMunicipios(): void {
    this.loading = true;
    this.errorMsg = '';
    this.api.getAll<Municipality>('municipality', 'GetAll')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: r => this.municipios = r,
        error: e => this.errorMsg = 'No fue posible cargar los municipios.'
      });
  }

  onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}