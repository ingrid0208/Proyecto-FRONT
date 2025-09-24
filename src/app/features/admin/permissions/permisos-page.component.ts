import { Component, OnInit } from '@angular/core';
import { PermissionService, Permission } from '../../../core/services/permission.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationService, PaginationConfig } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-permisos-page',
  templateUrl: './permisos-page.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent, SearchBarComponent],
})
export class PermisosPageComponent implements OnInit {
  permisos: Permission[] = [];
  filteredPermisos: Permission[] = [];
  paginatedPermisos: Permission[] = [];
  showForm = false;
  permisoForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  // Paginación
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };

  // Variables para modales
  showUpdateConfirm = false;
  showDeleteConfirm = false;
  permisoEditando: Permission | null = null;
  permisoAActualizar: Permission | null = null;
  permisoAEliminar: Permission | null = null;

  constructor(
    private permissionService: PermissionService,
    private fb: FormBuilder,
    private paginationService: PaginationService
  ) {
    this.permisoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.obtenerPermisos();
  }

  obtenerPermisos() {
    this.permissionService.genericService.getAll<Permission>(this.permissionService.endpoint).subscribe((data: Permission[]) => {
      this.permisos = data;
      this.filteredPermisos = [...this.permisos]; // Inicializar permisos filtrados
      this.updatePagination();
    });
  }

  // Métodos de paginación
  updatePagination(): void {
    this.paginationConfig = this.paginationService.updatePagination(this.paginationConfig, this.filteredPermisos.length);
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    this.paginatedPermisos = this.paginationService.getPaginatedItems(this.filteredPermisos, this.paginationConfig);
  }

  onPageChange(page: number): void {
    this.paginationConfig = this.paginationService.goToPage(this.paginationConfig, page);
    this.updatePaginatedItems();
  }

  onSearch(term: string) {
    this.filteredPermisos = this.permisos.filter(permiso =>
      permiso.name.toLowerCase().includes(term.toLowerCase()) ||
      permiso.description.toLowerCase().includes(term.toLowerCase())
    );
    this.updatePagination();
  }

  abrirFormulario() {
    this.showForm = true;
  }

  cerrarFormulario() {
    this.showForm = false;
  }

  crearPermiso() {
    if (this.permisoForm.invalid) {
      this.permisoForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    const permisoData = this.permisoForm.value;
    if (this.permisoEditando) {
      // Actualizar
      const permisoActualizado = { ...this.permisoEditando, ...permisoData };
      this.permissionService.genericService.update<Permission>(this.permissionService.endpoint, permisoActualizado.id, permisoActualizado).subscribe({
        next: () => {
          this.successMsg = 'Permiso actualizado correctamente';
          this.obtenerPermisos();
          this.permisoForm.reset();
          this.cerrarFormulario();
          this.permisoEditando = null;
          this.loading = false;
          setTimeout(() => this.successMsg = '', 2500);
        },
        error: () => {
          this.errorMsg = 'Error al actualizar el permiso';
          this.loading = false;
        }
      });
    } else {
      // Crear
      this.permissionService.genericService.create<Permission>(this.permissionService.endpoint, permisoData).subscribe({
        next: () => {
          this.successMsg = 'Permiso creado correctamente';
          this.obtenerPermisos();
          this.permisoForm.reset();
          this.cerrarFormulario();
          this.loading = false;
          setTimeout(() => this.successMsg = '', 2500);
        },
        error: () => {
          this.errorMsg = 'Error al crear el permiso';
          this.loading = false;
        }
      });
    }
  }

  confirmarActualizacion(permiso: Permission) {
    this.permisoAActualizar = permiso;
    this.showUpdateConfirm = true;
  }

  cancelarActualizacion() {
    this.permisoAActualizar = null;
    this.showUpdateConfirm = false;
  }

  editarPermiso() {
    if (this.permisoAActualizar) {
      this.permisoEditando = this.permisoAActualizar;
      this.showForm = true;
      this.permisoForm.patchValue({
        name: this.permisoAActualizar.name,
        description: this.permisoAActualizar.description
      });
      this.showUpdateConfirm = false;
      this.permisoAActualizar = null;
    }
  }

  confirmarEliminacion(permiso: Permission) {
    this.permisoAEliminar = permiso;
    this.showDeleteConfirm = true;
  }

  cancelarEliminacion() {
    this.permisoAEliminar = null;
    this.showDeleteConfirm = false;
  }

  eliminarPermiso() {
    if (this.permisoAEliminar) {
      this.permissionService.genericService.delete(this.permissionService.endpoint, this.permisoAEliminar.id).subscribe({
        next: () => {
          this.successMsg = 'Permiso eliminado correctamente';
          this.obtenerPermisos();
          this.cancelarEliminacion();
          setTimeout(() => this.successMsg = '', 2500);
        },
        error: () => {
          this.errorMsg = 'Error al eliminar el permiso';
          this.cancelarEliminacion();
        }
      });
    }
  }
}
