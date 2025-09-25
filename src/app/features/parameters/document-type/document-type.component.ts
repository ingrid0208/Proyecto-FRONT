import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { DocumentTypeService } from '../../../core/services/api/document-type.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DocumentTypeDto } from '../../../shared/Models/parameters/document-type.models';
import { ColumnDef } from '../../../shared/Models/table.Generic';


@Component({
  selector: 'app-document-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, GenericMultasTableComponent, CardHeaderComponent, ButtonComponent],
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss']
})
export class DocumentTypeComponent implements OnInit {
  private router = inject(Router);
  private service = inject(DocumentTypeService);
  private fb = inject(FormBuilder);

  tipos: DocumentTypeDto[] = [];
  originalTipos: DocumentTypeDto[] = []; // Lista original sin filtros
  filteredTipos: DocumentTypeDto[] = []; // Lista filtrada
  searchTerm: string = ''; // Término de búsqueda
  loading = false;
  errorMsg = '';
  successMsg = '';

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  paginatedTipos: DocumentTypeDto[] = [];

  // Variables para modales
  showForm = false;
  showUpdateForm = false;
  showConfirm = false;
  showUpdateConfirm = false;
  documentTypeAEliminar: DocumentTypeDto | null = null;
  documentTypeSeleccionado: DocumentTypeDto | null = null;
  documentTypeAActualizar: DocumentTypeDto | null = null;

  // Formularios reactivos
  documentTypeForm: FormGroup;
  updateForm: FormGroup;

  columns: ColumnDef[] = [
    { key: 'name',         header: 'Tipo de documento', type: 'text' },
    { key: 'abbreviation', header: 'Abreviatura',       type: 'text' },
    { key: 'actions',      header: 'Acciones',          type: 'actions' }
  ];

  constructor() {
    // Inicializar formularios reactivos
    this.documentTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      abbreviation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });

    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      abbreviation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
    this.cargarDocumentTypeDtos();
  }

  private cargarDocumentTypeDtos(): void {
    this.loading = true;
    this.errorMsg = '';

    this.service.genericService.getAll<DocumentTypeDto>(this.service.endpoint, 'GetAll')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (rows) => {
          this.tipos = rows;
          this.originalTipos = [...rows]; // Guardar copia original
          this.filteredTipos = [...rows]; // Inicializar filtrados
          this.updatePagination();
        },
        error: (err) => {
          console.error('Error cargando tipos de documento', err);
          this.errorMsg = 'No fue posible cargar los tipos de documento.';
        }
      });
  }

  // Métodos para manejar formularios
  abrirFormulario(): void {
    this.showForm = true;
    this.documentTypeForm.reset();
    this.errorMsg = '';
    this.successMsg = '';
  }

  cerrarFormulario(): void {
    this.showForm = false;
    this.documentTypeForm.reset();
  }

  // Método para crear tipo de documento
  crearDocumentTypeDto(): void {
    if (this.documentTypeForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      const documentTypeData = this.documentTypeForm.value;

      this.service.genericService.create<DocumentTypeDto>(this.service.endpoint, documentTypeData)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (nuevoDocumentTypeDto: DocumentTypeDto) => {
            this.successMsg = 'Tipo de documento creado exitosamente.';
            this.cargarDocumentTypeDtos(); // Recargar la lista
            this.cerrarFormulario();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al crear tipo de documento:', error);
            this.errorMsg = error.error?.message || 'Error al crear el tipo de documento.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para editar tipo de documento
  confirmarActualizacion(documentType: DocumentTypeDto): void {
    this.documentTypeAActualizar = documentType;
    this.showUpdateConfirm = true;
  }

  cancelarActualizacion(): void {
    this.documentTypeAActualizar = null;
    this.showUpdateConfirm = false;
  }

  abrirFormularioActualizar(documentType?: DocumentTypeDto): void {
    const docType = documentType || this.documentTypeAActualizar;
    if (docType) {
      this.documentTypeSeleccionado = { ...docType };
      this.updateForm.patchValue({
        name: docType.name,
        abbreviation: docType.abbreviation
      });
      this.showUpdateForm = true;
      this.showUpdateConfirm = false;
      this.documentTypeAActualizar = null;
      this.errorMsg = '';
      this.successMsg = '';
    }
  }

  cerrarFormularioActualizar(): void {
    this.showUpdateForm = false;
    this.documentTypeSeleccionado = null;
    this.updateForm.reset();
  }

  actualizarDocumentTypeDto(): void {
    if (this.updateForm.valid && this.documentTypeSeleccionado && this.documentTypeSeleccionado.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      const documentTypeActualizado = {
        ...this.documentTypeSeleccionado,
        ...this.updateForm.value
      };

      this.service.genericService.update<DocumentTypeDto>(this.service.endpoint, this.documentTypeSeleccionado.id, documentTypeActualizado)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (documentTypeActualizado: DocumentTypeDto) => {
            this.successMsg = 'Tipo de documento actualizado exitosamente.';
            this.cargarDocumentTypeDtos(); // Recargar la lista
            this.cerrarFormularioActualizar();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al actualizar tipo de documento:', error);
            this.errorMsg = error.error?.message || 'Error al actualizar el tipo de documento.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para eliminar tipo de documento
  confirmarEliminacion(documentType: DocumentTypeDto): void {
    this.documentTypeAEliminar = documentType;
    this.showConfirm = true;
  }

  cancelarEliminacion(): void {
    this.documentTypeAEliminar = null;
    this.showConfirm = false;
  }

  eliminarDocumentTypeDto(): void {
    if (this.documentTypeAEliminar && this.documentTypeAEliminar.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      this.service.genericService.delete(this.service.endpoint, this.documentTypeAEliminar.id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.successMsg = 'Tipo de documento eliminado exitosamente.';
            this.cargarDocumentTypeDtos(); // Recargar la lista
            this.cancelarEliminacion();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al eliminar tipo de documento:', error);
            this.errorMsg = error.error?.message || 'Error al eliminar el tipo de documento.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    }
  }

  // Métodos de búsqueda
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      // Si no hay término de búsqueda, mostrar todos los tipos
      this.filteredTipos = [...this.originalTipos];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      // Filtrar tipos por nombre o abreviatura
      this.filteredTipos = this.originalTipos.filter(tipo =>
        tipo.name.toLowerCase().includes(searchTermLower) ||
        (tipo.abbreviation && tipo.abbreviation.toLowerCase().includes(searchTermLower))
      );
    }

    // Actualizar la lista mostrada y resetear la paginación
    this.tipos = [...this.filteredTipos];
    this.currentPage = 1;
    this.updatePagination();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  // Métodos auxiliares para validaciones
  isFieldInvalid(fieldName: string, form: FormGroup = this.documentTypeForm): boolean {
    const field = form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string, form: FormGroup = this.documentTypeForm): string {
    const field = form.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `El campo ${fieldName} es requerido.`;
      if (field.errors['minlength']) return `El campo ${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres.`;
      if (field.errors['maxlength']) return `El campo ${fieldName} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres.`;
      if (field.errors['pattern']) return `El formato del ${fieldName} no es válido.`;
    }
    return '';
  }

  // Métodos de paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.tipos.length / this.itemsPerPage);
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTipos = this.tipos.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedItems();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }
}
