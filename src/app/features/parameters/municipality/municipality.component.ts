import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../shared/models/table.Generic';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { MunicipalityService } from '../../../core/services/api/municipality.service';
import { finalize } from 'rxjs/operators';
import { AppTopbar } from '../../../layout/header/topbar.component';
import { Municipality } from '../../../shared/models/parameters/municipality.models';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, AppTopbar, GenericMultasTableComponent, CardHeaderComponent, ButtonComponent],
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss']
})
export class MunicipalityComponent implements OnInit {
  private router = inject(Router);
  private service = inject(MunicipalityService);
  private fb = inject(FormBuilder);

  municipios: Municipality[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';
  
  // Variables para modales
  showForm = false;
  showUpdateForm = false;
  showConfirm = false;
  municipalityAEliminar: Municipality | null = null;
  municipalitySeleccionado: Municipality | null = null;
  
  // Formularios reactivos
  municipalityForm: FormGroup;
  updateForm: FormGroup;

  columns: ColumnDef[] = [
    { key: 'name',           header: 'Municipio',      type: 'text' },
    { key: 'daneCode',       header: 'Código DANE',    type: 'text' },
    { key: 'departmentName', header: 'Departamento',   type: 'text' },
  ];

  constructor() {
    // Inicializar formularios reactivos
    this.municipalityForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      daneCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      departmentId: ['', [Validators.required]]
    });

    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      daneCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      departmentId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarMunicipios();
  }

  private cargarMunicipios(): void {
    this.loading = true;
    this.errorMsg = '';
    this.service.genericService.getAll<Municipality>(this.service.endpoint, 'GetAll')
      .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (r: Municipality[]) => this.municipios = r,
          error: (e: any) => this.errorMsg = 'No fue posible cargar los municipios.'
        });
  }

  // Métodos para manejar formularios
  abrirFormulario(): void {
    this.showForm = true;
    this.municipalityForm.reset();
    this.errorMsg = '';
    this.successMsg = '';
  }

  cerrarFormulario(): void {
    this.showForm = false;
    this.municipalityForm.reset();
  }

  // Método para crear municipio
  crearMunicipio(): void {
    if (this.municipalityForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';
      
      const municipalityData = this.municipalityForm.value;
      
      this.service.genericService.create<Municipality>(this.service.endpoint, municipalityData)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (nuevoMunicipio: Municipality) => {
            this.successMsg = 'Municipio creado exitosamente.';
            this.cargarMunicipios(); // Recargar la lista
            this.cerrarFormulario();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al crear municipio:', error);
            this.errorMsg = error.error?.message || 'Error al crear el municipio.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para editar municipio
  abrirFormularioActualizar(municipality: Municipality): void {
    this.municipalitySeleccionado = { ...municipality };
    this.updateForm.patchValue({
      name: municipality.name,
      daneCode: municipality.daneCode,
      departmentId: municipality.departmentId
    });
    this.showUpdateForm = true;
    this.errorMsg = '';
    this.successMsg = '';
  }

  cerrarFormularioActualizar(): void {
    this.showUpdateForm = false;
    this.municipalitySeleccionado = null;
    this.updateForm.reset();
  }

  actualizarMunicipio(): void {
    if (this.updateForm.valid && this.municipalitySeleccionado && this.municipalitySeleccionado.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';
      
      const municipalityActualizado = {
        ...this.municipalitySeleccionado,
        ...this.updateForm.value
      };
      
      this.service.genericService.update<Municipality>(this.service.endpoint, this.municipalitySeleccionado.id, municipalityActualizado)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (municipalityActualizado: Municipality) => {
            this.successMsg = 'Municipio actualizado exitosamente.';
            this.cargarMunicipios(); // Recargar la lista
            this.cerrarFormularioActualizar();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al actualizar municipio:', error);
            this.errorMsg = error.error?.message || 'Error al actualizar el municipio.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para eliminar municipio
  confirmarEliminacion(municipality: Municipality): void {
    this.municipalityAEliminar = municipality;
    this.showConfirm = true;
  }

  cancelarEliminacion(): void {
    this.municipalityAEliminar = null;
    this.showConfirm = false;
  }

  eliminarMunicipio(): void {
    if (this.municipalityAEliminar && this.municipalityAEliminar.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';
      
      this.service.genericService.delete(this.service.endpoint, this.municipalityAEliminar.id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.successMsg = 'Municipio eliminado exitosamente.';
            this.cargarMunicipios(); // Recargar la lista
            this.cancelarEliminacion();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al eliminar municipio:', error);
            this.errorMsg = error.error?.message || 'Error al eliminar el municipio.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    }
  }

  // Métodos auxiliares para validaciones
  isFieldInvalid(fieldName: string, form: FormGroup = this.municipalityForm): boolean {
    const field = form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string, form: FormGroup = this.municipalityForm): string {
    const field = form.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `El campo ${fieldName} es requerido.`;
      if (field.errors['minlength']) return `El campo ${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres.`;
      if (field.errors['maxlength']) return `El campo ${fieldName} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres.`;
      if (field.errors['pattern']) return `El formato del ${fieldName} no es válido.`;
    }
    return '';
  }

  // Método comentado ya que no se necesita navegación
  // onClickGenerar() {
  //   this.router.navigate(['/acuerdo-pago/formulario']);
  // }
}