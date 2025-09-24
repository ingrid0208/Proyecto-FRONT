import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationService, PaginationConfig } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ConfirmationModalComponent, ConfirmationModalConfig } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

import { RolFormPermissionService } from './rol-form-permission.service';
import { 
  RolFormPermission, 
  RolFormPermissionDisplay, 
  CreateRolFormPermission, 
  UpdateRolFormPermission,
  RoleOption,
  FormOption,
  PermissionOption
} from './rol-form-permission.model';

@Component({
  selector: 'app-rol-form-permission',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    SearchBarComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './rol-form-permission.component.html',
  styleUrls: ['./rol-form-permission.component.scss']
})
export class RolFormPermissionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data properties
  rolFormPermissions: RolFormPermission[] = [];
  displayData: RolFormPermissionDisplay[] = [];
  filteredData: RolFormPermissionDisplay[] = [];
  paginatedData: RolFormPermissionDisplay[] = [];

  // Paginación
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };
  
  // Modal properties
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  showDeleteModal = false;
  showUpdateConfirmModal = false;
  isEditMode = false;
  selectedItemId: number | null = null;
  itemAActualizar: RolFormPermission | null = null;
  itemAEliminar: RolFormPermission | null = null;
  itemSeleccionado: RolFormPermission | null = null;
  
  // Form
  rolFormPermissionForm!: FormGroup;
  
  // Loading state
  loading = false;
  
  // Dropdown options
  roleOptions: { label: string; value: number }[] = [];
  formOptions: { label: string; value: number }[] = [];
  permissionOptions: { label: string; value: number }[] = [];
  
  // Alertas
  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';

  // Configuración de modales de confirmación
  deleteModalConfig: ConfirmationModalConfig = {
    title: 'Eliminar Permiso',
    message: '¿Está seguro que desea eliminar este permiso? Esta acción no se puede deshacer.',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'delete'
  };
  updateModalConfig: ConfirmationModalConfig = {
    title: 'Confirmar Actualización',
    message: '¿Está seguro que desea actualizar este permiso?',
    confirmText: 'Actualizar',
    cancelText: 'Cancelar',
    type: 'update'
  };

  constructor(
    private rolFormPermissionService: RolFormPermissionService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private paginationService: PaginationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.mostrarAlerta('¡Bienvenido a la gestión de permisos!', 'bienvenida');
    this.loadData();
    this.loadDropdownOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.rolFormPermissionForm = this.fb.group({
      rolid: [null, [Validators.required]],
      formid: [null, [Validators.required]],
      permissionid: [null, [Validators.required]]
    });
  }

  private loadData(): void {
    this.loading = true;
    this.rolFormPermissionService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.rolFormPermissions = data;
          this.displayData = data.map(item => ({
            permissionName: item.permissionName,
            rolName: item.rolName,
            formName: item.formName
          }));
          this.filteredData = [...this.displayData];
          this.updatePagination();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading data:', error);
          this.mostrarAlerta('Error al cargar los datos: ' + (error.error?.message || error.message), 'error');
          this.loading = false;
        }
      });
  }

  private loadDropdownOptions(): void {
    // Load roles
    this.rolFormPermissionService.getAvailableRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((roles: RoleOption[]) => {
        this.roleOptions = roles.map(role => ({ label: role.name, value: role.id }));
      });

    // Load forms
    this.rolFormPermissionService.getAvailableForms()
      .pipe(takeUntil(this.destroy$))
      .subscribe((forms: FormOption[]) => {
        this.formOptions = forms.map(form => ({ label: form.name, value: form.id }));
      });

    // Load permissions
    this.rolFormPermissionService.getAvailablePermissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((permissions: PermissionOption[]) => {
        this.permissionOptions = permissions.map(permission => ({ label: permission.name, value: permission.id }));
      });
  }

  onSearch(term: string) {
    this.filteredData = this.displayData.filter(item =>
      item.rolName.toLowerCase().includes(term.toLowerCase()) ||
      item.formName.toLowerCase().includes(term.toLowerCase()) ||
      item.permissionName.toLowerCase().includes(term.toLowerCase())
    );
    this.updatePagination();
  }

  abrirModal(): void {
    this.isEditMode = false;
    this.selectedItemId = null;
    this.rolFormPermissionForm.reset();
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.rolFormPermissionForm.reset();
  }

  confirmarActualizacion(rowData: RolFormPermissionDisplay): void {
    const originalItem = this.rolFormPermissions.find(item =>
      item.rolName === rowData.rolName &&
      item.formName === rowData.formName &&
      item.permissionName === rowData.permissionName
    );

    if (originalItem) {
      this.itemAActualizar = originalItem;
      this.updateModalConfig.message = `¿Está seguro que desea actualizar el permiso "${rowData.permissionName}"?`;
      this.showUpdateConfirmModal = true;
    }
  }

  cancelarActualizacion(): void {
    this.itemAActualizar = null;
    this.showUpdateConfirmModal = false;
  }

  abrirModalActualizar(): void {
    if (this.itemAActualizar) {
      this.itemSeleccionado = { ...this.itemAActualizar };
      this.isEditMode = true;
      this.selectedItemId = this.itemAActualizar.id;
      this.rolFormPermissionForm.patchValue({
        rolid: this.itemAActualizar.rolid,
        formid: this.itemAActualizar.formid,
        permissionid: this.itemAActualizar.permissionid
      });
      this.showUpdateModal = true;
      this.showUpdateConfirmModal = false;
      this.itemAActualizar = null;
    }
  }

  cerrarModalActualizar(): void {
    this.showUpdateModal = false;
    this.itemSeleccionado = null;
    this.rolFormPermissionForm.reset();
  }

  pedirConfirmacionEliminar(rowData: RolFormPermissionDisplay): void {
    const originalItem = this.rolFormPermissions.find(item =>
      item.rolName === rowData.rolName &&
      item.formName === rowData.formName &&
      item.permissionName === rowData.permissionName
    );

    if (originalItem) {
      this.itemAEliminar = originalItem;
      this.deleteModalConfig.message = `¿Está seguro de eliminar el permiso "${rowData.permissionName}"? Esta acción no se puede deshacer.`;
      this.showDeleteModal = true;
    }
  }

  confirmarEliminar(): void {
    if (this.itemAEliminar && this.itemAEliminar.id) {
      this.rolFormPermissionService.delete(this.itemAEliminar.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.mostrarAlerta('Permiso eliminado correctamente.', 'eliminado');
            this.showDeleteModal = false;
            this.itemAEliminar = null;
            this.loadData();
          },
          error: (error) => {
            console.error('Error deleting item:', error);
            this.mostrarAlerta('Error al eliminar el permiso: ' + (error.error?.message || error.message), 'error');
            this.showDeleteModal = false;
            this.itemAEliminar = null;
          }
        });
    }
  }

  cancelarEliminar(): void {
    this.showDeleteModal = false;
    this.itemAEliminar = null;
  }

  saveItem(): void {
    if (this.rolFormPermissionForm.valid) {
      const formValue = this.rolFormPermissionForm.value;
      
      if (this.isEditMode && this.selectedItemId) {
        const updateData: UpdateRolFormPermission = {
          id: this.selectedItemId,
          rolid: formValue.rolid,
          formid: formValue.formid,
          permissionid: formValue.permissionid
        };
        
        this.rolFormPermissionService.update(updateData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.mostrarAlerta('Permiso actualizado correctamente.', 'creado');
              this.cerrarModalActualizar();
              this.loadData();
            },
            error: (error: any) => {
              console.error('Error updating item:', error);
              this.mostrarAlerta('Error al actualizar el permiso: ' + (error.error?.message || error.message), 'error');
            }
          });
      } else {
        const createData: CreateRolFormPermission = {
          rolid: formValue.rolid,
          formid: formValue.formid,
          permissionid: formValue.permissionid
        };
        
        this.rolFormPermissionService.create(createData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.mostrarAlerta('Permiso creado correctamente.', 'creado');
              this.cerrarModal();
              this.loadData();
            },
            error: (error: any) => {
              console.error('Error creating item:', error);
              this.mostrarAlerta('Error al crear el permiso: ' + (error.error?.message || error.message), 'error');
            }
          });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.rolFormPermissionForm.controls).forEach(key => {
      const control = this.rolFormPermissionForm.get(key);
      control?.markAsTouched();
    });
  }

  mostrarAlerta(msg: string, tipo: string): void {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  // Métodos de paginación
  updatePagination(): void {
    this.paginationConfig = this.paginationService.updatePagination(this.paginationConfig, this.filteredData.length);
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    this.paginatedData = this.paginationService.getPaginatedItems(this.filteredData, this.paginationConfig);
  }

  onPageChange(page: number): void {
    this.paginationConfig = this.paginationService.goToPage(this.paginationConfig, page);
    this.updatePaginatedItems();
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

  isFieldInvalid(fieldName: string): boolean {
    const field = this.rolFormPermissionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.rolFormPermissionForm.get(fieldName);
    if (field?.errors?.['required']) {
      return 'Este campo es requerido';
    }
    return '';
  }
}