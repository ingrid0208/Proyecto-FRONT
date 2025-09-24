import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RolUserService, RolUser } from '../../../core/services/api/rol-user.service';
import { ServiceGenericService } from '../../../core/services/utils/generic/service-generic.service';
import { PaginationService, PaginationConfig } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ConfirmationModalComponent, ConfirmationModalConfig } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-rol-user-page',
  templateUrl: './rol-user-page.component.html',
  styleUrls: ['./rol-user-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent, SearchBarComponent, ConfirmationModalComponent]
})
export class RolUserPageComponent implements OnInit {
  rolUsers: RolUser[] = [];
  filteredRolUsers: RolUser[] = [];
  paginatedRolUsers: RolUser[] = [];
  usuarios: any[] = [];
  showForm = false;
  showUpdateModal = false;
  rolUserForm: FormGroup;
  loading = false;
  rolUserEditando: RolUser | null = null;
  rolUserAActualizar: RolUser | null = null;
  rolUserAEliminar: RolUser | null = null;

  // Alertas
  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';

  // Configuración de modales de confirmación
  showDeleteModal = false;
  showUpdateConfirmModal = false;
  deleteModalConfig: ConfirmationModalConfig = {
    title: 'Eliminar Asignación',
    message: '¿Está seguro que desea eliminar esta asignación de rol? Esta acción no se puede deshacer.',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'delete'
  };
  updateModalConfig: ConfirmationModalConfig = {
    title: 'Confirmar Actualización',
    message: '¿Está seguro que desea actualizar esta asignación?',
    confirmText: 'Actualizar',
    cancelText: 'Cancelar',
    type: 'update'
  };

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
    this.mostrarAlerta('¡Bienvenido a la gestión de roles de usuario!', 'bienvenida');
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

  abrirModal() {
    this.showForm = true;
    this.rolUserForm.reset({ userId: 0, rolId: 0 });
    this.rolUserEditando = null;
  }

  cerrarModal() {
    this.showForm = false;
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
    const rolUserData = this.rolUserForm.value;
    this.rolUserService.genericService.create<RolUser>(this.rolUserService.endpoint, rolUserData).subscribe({
      next: (nuevoRolUser: RolUser) => {
        this.mostrarAlerta('Asignación de rol creada correctamente.', 'creado');
        this.obtenerRolUsers();
        this.cerrarModal();
        this.loading = false;
      },
      error: (error: any) => {
        this.mostrarAlerta('Error al crear la asignación: ' + (error.error?.message || error.message), 'error');
        this.loading = false;
      }
    });
  }

  confirmarActualizacion(rolUser: RolUser) {
    this.rolUserAActualizar = rolUser;
    this.updateModalConfig.message = `¿Está seguro que desea actualizar la asignación del usuario "${rolUser.userName}"?`;
    this.showUpdateConfirmModal = true;
  }

  cancelarActualizacion() {
    this.rolUserAActualizar = null;
    this.showUpdateConfirmModal = false;
  }

  abrirModalActualizar() {
    if (this.rolUserAActualizar) {
      this.rolUserEditando = { ...this.rolUserAActualizar };
      this.showUpdateModal = true;
      this.rolUserForm.setValue({ userId: this.rolUserEditando.userId, rolId: this.rolUserEditando.rolId });
      this.showUpdateConfirmModal = false;
      this.rolUserAActualizar = null;
    }
  }

  cerrarModalActualizar() {
    this.showUpdateModal = false;
    this.rolUserEditando = null;
  }

  actualizarRolUser() {
    if (!this.rolUserEditando) return;
    if (this.rolUserForm.invalid) {
      this.rolUserForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const rolUserData = { ...this.rolUserEditando, ...this.rolUserForm.value };
    this.rolUserService.genericService.update<RolUser>(this.rolUserService.endpoint, rolUserData.id, rolUserData).subscribe({
      next: (rolUserActualizado: RolUser) => {
        this.mostrarAlerta('Asignación actualizada correctamente.', 'creado');
        this.obtenerRolUsers();
        this.cerrarModalActualizar();
        this.loading = false;
      },
      error: (error: any) => {
        this.mostrarAlerta('Error al actualizar la asignación: ' + (error.error?.message || error.message), 'error');
        this.loading = false;
      }
    });
  }

  pedirConfirmacionEliminar(rolUser: RolUser) {
    this.rolUserAEliminar = rolUser;
    this.deleteModalConfig.message = `¿Está seguro de eliminar la asignación del usuario "${rolUser.userName}"? Esta acción no se puede deshacer.`;
    this.showDeleteModal = true;
  }

  confirmarEliminar() {
    if (this.rolUserAEliminar && this.rolUserAEliminar.id) {
      this.rolUserService.genericService.delete(this.rolUserService.endpoint, this.rolUserAEliminar.id).subscribe({
        next: () => {
          this.mostrarAlerta('Asignación eliminada correctamente.', 'eliminado');
          this.showDeleteModal = false;
          this.rolUserAEliminar = null;
          this.obtenerRolUsers();
        },
        error: (error: any) => {
          this.mostrarAlerta('Error al eliminar la asignación: ' + (error.error?.message || error.message), 'error');
          this.showDeleteModal = false;
          this.rolUserAEliminar = null;
        }
      });
    }
  }

  cancelarEliminar() {
    this.showDeleteModal = false;
    this.rolUserAEliminar = null;
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

  mostrarAlerta(msg: string, tipo: string): void {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  // Métodos auxiliares para alertas
  getAlertClass(): string {
    const classMap: { [key: string]: string } = {
      'bienvenida': 'info',
      'creado': 'success',
      'eliminado': 'success',
      'error': 'error'
    };
    return classMap[this.alertType] || 'info';
  }

  getAlertIcon(): string {
    const iconMap: { [key: string]: string } = {
      'bienvenida': 'pi-info-circle',
      'creado': 'pi-check-circle',
      'eliminado': 'pi-check-circle',
      'error': 'pi-exclamation-triangle'
    };
    return iconMap[this.alertType] || 'pi-info-circle';
  }
}
