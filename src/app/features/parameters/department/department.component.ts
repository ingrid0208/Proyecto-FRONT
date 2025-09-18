import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AppTopbar } from '../../../feature/topbar/topbar.component';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../shared/Models/table.Generic';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { ServiceGenericService } from '../../../core/services/servicesGeneric/service-generic.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

// DTO que esperas del backend
export interface Department {
  id: number;
  name: string;
  daneCode: number;
}

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    AppTopbar,
    GenericMultasTableComponent,
    CardHeaderComponent,
    ButtonComponent
  ],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  private router = inject(Router);
  private api = inject(ServiceGenericService);

  departamentos: Department[] = [];
  loading = false;
  errorMsg = '';

  // Columnas fijas para la tabla genérica
  columns: ColumnDef[] = [
    { key: 'name',     header: 'Nombre del departamento', type: 'text' },
    { key: 'daneCode', header: 'Código DANE',             type: 'text' },
  ];


  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  private cargarDepartamentos(): void {
    this.loading = true;
    this.errorMsg = '';

    // 👇 Endpoint del backend: api/department (según tu controlador departmentController)
    this.api.getAll<Department>('department', 'GetAll')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (rows) => {
          this.departamentos = rows; // no hace falta mapear, ya coincide con la interfaz
        },
        error: (err) => {
          console.error('Error cargando departamentos', err);
          this.errorMsg = 'No fue posible cargar los departamentos.';
        }
      });
  }

  onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}
