import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RolUserService, RolUser } from '../../../core/services/api/rol-user.service';
import { ServiceGenericService } from '../../../core/services/utils/generic/service-generic.service';
import { PaginationService, PaginationConfig } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-rol-user-page',
  templateUrl: './rol-user-page.component.html',
  styleUrls: ['./rol-user-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent, SearchBarComponent]
})
export class RolUserPageComponent implements OnInit {
  rolUsers: RolUser[] = [];
  filteredRolUsers: RolUser[] = [];
  paginatedRolUsers: RolUser[] = [];
  usuarios: any[] = [];
  showForm = false;
  rolUserForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';
  rolUserEditando: RolUser | null = null;

  // Paginación
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };

  constructor(
    private rolUserService: RolUserService,
    private serviceGeneric: ServiceGenericService,
    private fb: FormBuilder,
    private paginationService: PaginationService
  ) {
    this.rolUserForm = this.fb.group({
      userId: [0, [Validators.required, Validators.min(1)]],
      rolId: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.serviceGeneric.getAll<any>('Users').subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
      this.obtenerRolUsers();
    });
  }

  obtenerRolUsers() {
    this.rolUserService.genericService.getAll<RolUser>(this.rolUserService.endpoint).subscribe((data: RolUser[]) => {
      // Mapear el nombre/email del usuario a cada relación
      this.rolUsers = data.map(ru => ({
        ...ru,
        userName: this.usuarios.find(u => u.id === ru.userId)?.email || ru.userId.toString()
      }));
      this.filteredRolUsers = [...this.rolUsers]; // Inicializar rol-users filtrados
      this.updatePagination();
    });
  }

  abrirFormulario() {
    this.showForm = true;
    this.rolUserForm.reset({ userId: 0, rolId: 0 });
    this.rolUserEditando = null;
  }

  cerrarFormulario() {
    this.showForm = false;
    this.rolUserEditando = null;
  }

  crearRolUser() {
    if (this.rolUserForm.invalid) {
      this.rolUserForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    const rolUserData = this.rolUserForm.value;
    this.rolUserService.genericService.create<RolUser>(this.rolUserService.endpoint, rolUserData).subscribe({
      next: (nuevoRolUser: RolUser) => {
        this.successMsg = 'Rol-Usuario creado correctamente';
        this.obtenerRolUsers();
        this.cerrarFormulario();
        this.loading = false;
        setTimeout(() => this.successMsg = '', 2500);
      },
      error: (error: any) => {
        this.errorMsg = error.error?.message || 'Error al crear Rol-Usuario';
        this.loading = false;
      }
    });
  }

  editarRolUser(rolUser: RolUser) {
    this.rolUserEditando = rolUser;
    this.showForm = true;
    this.rolUserForm.setValue({ userId: rolUser.userId, rolId: rolUser.rolId });
  }

  actualizarRolUser() {
    if (!this.rolUserEditando) return;
    if (this.rolUserForm.invalid) {
      this.rolUserForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    const rolUserData = { ...this.rolUserEditando, ...this.rolUserForm.value };
    this.rolUserService.genericService.update<RolUser>(this.rolUserService.endpoint, rolUserData.id, rolUserData).subscribe({
      next: (rolUserActualizado: RolUser) => {
        this.successMsg = 'Rol-Usuario actualizado correctamente';
        this.obtenerRolUsers();
        this.cerrarFormulario();
        this.loading = false;
        setTimeout(() => this.successMsg = '', 2500);
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
        setTimeout(() => this.successMsg = '', 2500);
      },
      error: (error: any) => {
        this.errorMsg = error.error?.message || 'Error al eliminar Rol-Usuario';
      }
    });
  }

  onSearch(term: string) {
    this.filteredRolUsers = this.rolUsers.filter(rolUser =>
      (rolUser.userName || '').toLowerCase().includes(term.toLowerCase()) ||
      rolUser.userId.toString().includes(term) ||
      rolUser.rolId.toString().includes(term)
    );
    this.updatePagination();
  }

  // Métodos de paginación
  updatePagination(): void {
    this.paginationConfig = this.paginationService.updatePagination(this.paginationConfig, this.filteredRolUsers.length);
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    this.paginatedRolUsers = this.paginationService.getPaginatedItems(this.filteredRolUsers, this.paginationConfig);
  }

  onPageChange(page: number): void {
    this.paginationConfig = this.paginationService.goToPage(this.paginationConfig, page);
    this.updatePaginatedItems();
  }
}
