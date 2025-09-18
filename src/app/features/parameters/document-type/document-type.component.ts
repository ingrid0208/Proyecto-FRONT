import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../shared/Models/table.Generic';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { ServiceGenericService } from '../../../core/services/servicesGeneric/service-generic.service';
import { finalize } from 'rxjs/operators';
import { AppTopbar } from '../../../feature/topbar/topbar.component';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-document-type',
  standalone: true,
  imports: [CommonModule, MatCardModule, AppTopbar, GenericMultasTableComponent, CardHeaderComponent,ButtonComponent],
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  private router = inject(Router);
  private api = inject(ServiceGenericService);

  tipos: DocumentType[] = [];

  loading = false;
  errorMsg = '';

  columns: ColumnDef[] = [
    { key: 'name',         header: 'Tipo de documento', type: 'text' },
    { key: 'abbreviation', header: 'Abreviatura',       type: 'text' },
  ];

  ngOnInit(): void {
    this.cargarDocumentTypes();
  }

  private cargarDocumentTypes(): void {
    this.loading = true;
    this.errorMsg = '';

    this.api.getAll<DocumentType>('documentType', 'GetAll')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (rows) => {
          this.tipos = rows;
        },
        error: (err) => {
          console.error('Error cargando tipos de documento', err);
          this.errorMsg = 'No fue posible cargar los tipos de documento.';
        }
      });
  }

    onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}
