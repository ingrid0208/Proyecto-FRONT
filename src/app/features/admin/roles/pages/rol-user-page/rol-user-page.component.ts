import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RolUserService } from '../../../../../core/services/ModelSecurity/rol-user.service';
import { ServiceGenericService } from '../../../../../core/services/utils/generic/service-generic.service';
import { RolUser } from '../../../../../shared/Models/modelSecurity/rol-user';

@Component({
  selector: 'app-rol-user-page',
  templateUrl: './rol-user-page.component.html',
  styleUrls: ['./rol-user-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RolUserPageComponent implements OnInit {
  rolUsers: RolUser[] = [];
  usuarios: any[] = [];
  roles: any[] = [];
  showForm = false;
  rolUserForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';
  rolUserEditando: RolUser | null = null;
  rolUserOriginal: RolUser | null = null;

  constructor(
    private rolUserService: RolUserService,
    private serviceGeneric: ServiceGenericService,
    private fb: FormBuilder
  ) {
    this.rolUserForm = this.fb.group({
      userId: [0, [Validators.required, Validators.min(1)]],
      rolId: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Cargar usuarios
    this.serviceGeneric.getAll<any>('Users').subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
      this.obtenerRolUsers();
    });

    // Cargar roles
    this.serviceGeneric.getAll<any>('Rol').subscribe((roles: any[]) => {
      this.roles = roles;
    });
  }

  // Usuarios disponibles para asignar rol
  get usuariosDisponibles(): any[] {
    if (!this.usuarios || !this.rolUsers) return [];
    // Si estamos editando, incluir al usuario actual aunque ya tenga rol
    if (this.rolUserEditando) {
      return [
        ...this.usuarios.filter(u => !this.rolUsers.some(ru => ru.userId === u.id)),
        this.usuarios.find(u => u.id === this.rolUserEditando?.userId)!
      ];
    }
    return this.usuarios.filter(u => !this.rolUsers.some(ru => ru.userId === u.id));
  }


  abrirFormulario() {
    this.showForm = true;
    this.rolUserForm.reset({ userId: 0, rolId: 0 });
    this.rolUserEditando = null;
    this.rolUserOriginal = null;
  }

  cerrarFormulario() {
    this.showForm = false;
    this.rolUserEditando = null;
    this.rolUserOriginal = null;
  }

  crearRolUser() {
  if (this.rolUserForm.invalid) {
    this.rolUserForm.markAllAsTouched();
    return;
  }

  const { userId, rolId } = this.rolUserForm.value;

  if (userId <= 0 || rolId <= 0) {
    this.errorMsg = 'Debes seleccionar un usuario y un rol válidos.';
    return;
  }

  this.loading = true;
  this.errorMsg = '';
  this.successMsg = '';

  this.rolUserService.genericService.create<RolUser>(this.rolUserService.endpoint, this.rolUserForm.value).subscribe({
    next: (nuevoRolUser: RolUser) => {
      this.successMsg = 'Rol-Usuario creado correctamente';

      // Actualizamos la lista de roles-usuarios
      this.obtenerRolUsers();

      // Cerramos el formulario
      this.cerrarFormulario();

      // Limpiamos el loading
      this.loading = false;
    },
    error: (error: any) => {
      this.errorMsg = error.error?.message || 'Error al crear Rol-Usuario';
      this.loading = false;
    }
  });
}

// Al obtener los rolUsers, mapeamos correctamente los nombres y filtramos usuarios disponibles
obtenerRolUsers() {
  this.rolUserService.genericService.getAll<RolUser>(this.rolUserService.endpoint).subscribe((data: RolUser[]) => {
    this.rolUsers = data.map(ru => ({
      ...ru,
      userName: this.usuarios.find(u => u.id === ru.userId)?.email || ru.userId.toString()
    }));

    // Esto garantiza que los usuarios con rol ya asignado desaparezcan del select
    if (!this.rolUserEditando) {
      this.rolUserForm.get('userId')?.setValue(0);
    }
  });
}


  editarRolUser(rolUser: RolUser) {
    this.rolUserEditando = { ...rolUser };
    this.rolUserOriginal = { ...rolUser };
    this.showForm = true;
    this.rolUserForm.setValue({ userId: rolUser.userId, rolId: rolUser.rolId });
  }

  actualizarRolUser() {
    if (!this.rolUserEditando || !this.rolUserOriginal) return;

    const userIdNuevo = this.rolUserForm.value.userId;
    const rolIdNuevo = this.rolUserForm.value.rolId;

    if (userIdNuevo === this.rolUserOriginal.userId && rolIdNuevo === this.rolUserOriginal.rolId) {
      this.errorMsg = 'Debe realizar al menos un cambio antes de actualizar.';
      return;
    }

    if (userIdNuevo <= 0 || rolIdNuevo <= 0) {
      this.errorMsg = 'Debes seleccionar un usuario y un rol válidos.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const rolUserData = { ...this.rolUserEditando, userId: userIdNuevo, rolId: rolIdNuevo };

    this.rolUserService.genericService.update<RolUser>(
      this.rolUserService.endpoint,
      rolUserData.id,
      rolUserData
    ).subscribe({
      next: (rolUserActualizado: RolUser) => {
        this.successMsg = 'Rol-Usuario actualizado correctamente';
        this.obtenerRolUsers();
        this.cerrarFormulario();
        this.loading = false;
      },
      error: (error: any) => {
        this.errorMsg = error.error?.message || 'Error al actualizar Rol-Usuario';
        this.loading = false;
      }
    });
  }

  eliminarRolUser(rolUser: RolUser) {
    if (!rolUser.id) return;
    this.rolUserService.genericService.delete(this.rolUserService.endpoint, rolUser.id).subscribe({
      next: () => {
        this.successMsg = 'Rol-Usuario eliminado correctamente';
        this.obtenerRolUsers();
      },
      error: (error: any) => {
        this.errorMsg = error.error?.message || 'Error al eliminar Rol-Usuario';
      }
    });
  }
}
