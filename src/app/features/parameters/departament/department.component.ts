import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AppTopbar } from '../../../layout/header/topbar.component';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../shared/models/table.Generic';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { DepartmentService } from '../../../core/services/api/department.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Department } from '../../../shared/models/parameters/department.models';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  private service = inject(DepartmentService);
  private fb = inject(FormBuilder);

  departamentos: Department[] = [];
  loading = false;
  errorMsg = '';
  successMsg = '';

  // Variables para modales
  showForm = false;
  showUpdateForm = false;
  showConfirm = false;
  departmentAEliminar: Department | null = null;
  departmentSeleccionado: Department | null = null;

  // Formularios reactivos
  departmentForm: FormGroup;
  updateForm: FormGroup;

  // Columnas fijas para la tabla genérica
  columns: ColumnDef[] = [
    { key: 'name',     header: 'Nombre del departamento', type: 'text' },
    { key: 'daneCode', header: 'Código DANE',             type: 'text' },
    { key: 'actions',  header: 'Acciones',               type: 'actions' }
  ];

  constructor() {
    // Inicializar formularios reactivos
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      daneCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      daneCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }


  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  private cargarDepartamentos(): void {
    this.loading = true;
    this.errorMsg = '';

    // 👇 Endpoint del backend: api/department (según tu controlador departmentController)
    this.service.genericService.getAll<Department>(this.service.endpoint, 'GetAll')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (rows: Department[]) => {
          this.departamentos = rows; // no hace falta mapear, ya coincide con la interfaz
        },
        error: (err: any) => {
          console.error('Error cargando departamentos', err);
          this.errorMsg = 'No fue posible cargar los departamentos.';
        }
      });
  }

  // Métodos para manejar formularios
  abrirFormulario(): void {
    this.showForm = true;
    this.departmentForm.reset();
    this.errorMsg = '';
    this.successMsg = '';
  }

  cerrarFormulario(): void {
    this.showForm = false;
    this.departmentForm.reset();
  }

  // Método para crear departamento
  crearDepartamento(): void {
    if (this.departmentForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      const departmentData = this.departmentForm.value;

      this.service.genericService.create<Department>(this.service.endpoint, departmentData)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (nuevoDepartamento: Department) => {
            this.successMsg = 'Departamento creado exitosamente.';
            this.cargarDepartamentos(); // Recargar la lista
            this.cerrarFormulario();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al crear departamento:', error);
            this.errorMsg = error.error?.message || 'Error al crear el departamento.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para editar departamento
  abrirFormularioActualizar(department: Department): void {
    this.departmentSeleccionado = { ...department };
    this.updateForm.patchValue({
      name: department.name,
      daneCode: department.daneCode
    });
    this.showUpdateForm = true;
    this.errorMsg = '';
    this.successMsg = '';
  }

  cerrarFormularioActualizar(): void {
    this.showUpdateForm = false;
    this.departmentSeleccionado = null;
    this.updateForm.reset();
  }

  actualizarDepartamento(): void {
    if (this.updateForm.valid && this.departmentSeleccionado && this.departmentSeleccionado.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      const departmentActualizado = {
        ...this.departmentSeleccionado,
        ...this.updateForm.value
      };

      this.service.genericService.update<Department>(this.service.endpoint, this.departmentSeleccionado.id, departmentActualizado)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (departmentActualizado: Department) => {
            this.successMsg = 'Departamento actualizado exitosamente.';
            this.cargarDepartamentos(); // Recargar la lista
            this.cerrarFormularioActualizar();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al actualizar departamento:', error);
            this.errorMsg = error.error?.message || 'Error al actualizar el departamento.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para eliminar departamento
  confirmarEliminacion(department: Department): void {
    this.departmentAEliminar = department;
    this.showConfirm = true;
  }

  cancelarEliminacion(): void {
    this.departmentAEliminar = null;
    this.showConfirm = false;
  }

  eliminarDepartamento(): void {
    if (this.departmentAEliminar && this.departmentAEliminar.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      this.service.genericService.delete(this.service.endpoint, this.departmentAEliminar.id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.successMsg = 'Departamento eliminado exitosamente.';
            this.cargarDepartamentos(); // Recargar la lista
            this.cancelarEliminacion();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al eliminar departamento:', error);
            this.errorMsg = error.error?.message || 'Error al eliminar el departamento.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    }
  }

  // Métodos auxiliares para validaciones
  isFieldInvalid(fieldName: string, form: FormGroup = this.departmentForm): boolean {
    const field = form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string, form: FormGroup = this.departmentForm): string {
    const field = form.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `El campo ${fieldName} es requerido.`;
      if (field.errors['minlength']) return `El campo ${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres.`;
      if (field.errors['maxlength']) return `El campo ${fieldName} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres.`;
      if (field.errors['pattern']) return `El formato del ${fieldName} no es válido.`;
    }
    return '';
  }

  onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}
