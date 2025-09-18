import { Component, OnInit } from '@angular/core';
import { PermissionService, Permission } from '../../core/services/servicesGeneric/permission.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-permisos-page',
  templateUrl: './permisos-page.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PermisosPageComponent implements OnInit {
  permisos: Permission[] = [];
  showForm = false;
  permisoForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  permisoEditando: Permission | null = null;

  constructor(
    private permissionService: PermissionService,
    private fb: FormBuilder
  ) {
    this.permisoForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.obtenerPermisos();
  }

  obtenerPermisos() {
    this.permissionService.getPermissions().subscribe((data: Permission[]) => {
      this.permisos = data;
    });
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
      this.permissionService.updatePermission(permisoActualizado).subscribe({
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
      this.permissionService.createPermission(permisoData).subscribe({
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

  editarPermiso(permiso: Permission) {
    this.permisoEditando = permiso;
    this.showForm = true;
    this.permisoForm.patchValue({
      name: permiso.name,
      description: permiso.description
    });
  }

  eliminarPermiso(permiso: Permission) {
    if (confirm('¿Seguro que deseas eliminar este permiso?')) {
      this.permissionService.deletePermission(permiso.id).subscribe({
        next: () => {
          this.successMsg = 'Permiso eliminado correctamente';
          this.obtenerPermisos();
          setTimeout(() => this.successMsg = '', 2500);
        },
        error: () => {
          this.errorMsg = 'Error al eliminar el permiso';
        }
      });
    }
  }
}
