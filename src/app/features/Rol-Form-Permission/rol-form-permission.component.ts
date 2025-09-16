import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService, ConfirmationService } from 'primeng/api';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { RolFormPermissionService } from './rol-form-permission.service';
import { 
  RolFormPermission, 
  RolFormPermissionDisplay, 
  CreateRolFormPermission, 
  UpdateRolFormPermission 
} from './rol-form-permission.model';

@Component({
  selector: 'app-rol-form-permission',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    CardModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './rol-form-permission.component.html',
  styleUrls: ['./rol-form-permission.component.scss']
})
export class RolFormPermissionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data properties
  rolFormPermissions: RolFormPermission[] = [];
  displayData: RolFormPermissionDisplay[] = [];
  filteredData: RolFormPermissionDisplay[] = [];
  
  // Dialog properties
  displayDialog = false;
  dialogTitle = '';
  isEditMode = false;
  selectedItemId: number | null = null;
  
  // Form
  rolFormPermissionForm!: FormGroup;
  
  // Loading state
  loading = false;
  
  // Dropdown options
  roleOptions: { label: string; value: string }[] = [];
  formOptions: { label: string; value: string }[] = [];
  permissionOptions: { label: string; value: string }[] = [];
  
  // Search
  globalFilter = '';

  constructor(
    private rolFormPermissionService: RolFormPermissionService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData();
    this.loadDropdownOptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.rolFormPermissionForm = this.fb.group({
      rolName: ['', [Validators.required]],
      formName: ['', [Validators.required]],
      permissionName: ['', [Validators.required]]
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
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading data:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar los datos'
          });
          this.loading = false;
        }
      });
  }

  private loadDropdownOptions(): void {
    // Load roles
    this.rolFormPermissionService.getAvailableRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe(roles => {
        this.roleOptions = roles.map(role => ({ label: role, value: role }));
      });

    // Load forms
    this.rolFormPermissionService.getAvailableForms()
      .pipe(takeUntil(this.destroy$))
      .subscribe(forms => {
        this.formOptions = forms.map(form => ({ label: form, value: form }));
      });

    // Load permissions
    this.rolFormPermissionService.getAvailablePermissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe(permissions => {
        this.permissionOptions = permissions.map(permission => ({ label: permission, value: permission }));
      });
  }

  onGlobalFilter(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.globalFilter = target.value;
    this.applyGlobalFilter();
  }

  private applyGlobalFilter(): void {
    if (!this.globalFilter) {
      this.filteredData = [...this.displayData];
      return;
    }

    const filterValue = this.globalFilter.toLowerCase();
    this.filteredData = this.displayData.filter(item =>
      item.rolName.toLowerCase().includes(filterValue) ||
      item.formName.toLowerCase().includes(filterValue) ||
      item.permissionName.toLowerCase().includes(filterValue)
    );
  }

  openNew(): void {
    this.isEditMode = false;
    this.selectedItemId = null;
    this.dialogTitle = 'Nuevo Rol-Formulario-Permiso';
    this.rolFormPermissionForm.reset();
    this.displayDialog = true;
  }

  editItem(rowData: RolFormPermissionDisplay): void {
    // Find the original item with ID
    const originalItem = this.rolFormPermissions.find(item =>
      item.rolName === rowData.rolName &&
      item.formName === rowData.formName &&
      item.permissionName === rowData.permissionName
    );

    if (originalItem) {
      this.isEditMode = true;
      this.selectedItemId = originalItem.id;
      this.dialogTitle = 'Editar Rol-Formulario-Permiso';
      
      this.rolFormPermissionForm.patchValue({
        rolName: originalItem.rolName,
        formName: originalItem.formName,
        permissionName: originalItem.permissionName
      });
      
      this.displayDialog = true;
    }
  }

  deleteItem(rowData: RolFormPermissionDisplay): void {
    // Find the original item with ID
    const originalItem = this.rolFormPermissions.find(item =>
      item.rolName === rowData.rolName &&
      item.formName === rowData.formName &&
      item.permissionName === rowData.permissionName
    );

    if (originalItem) {
      this.confirmationService.confirm({
        message: `¿Está seguro de eliminar el permiso "${rowData.permissionName}" para el rol "${rowData.rolName}" en el formulario "${rowData.formName}"?`,
        header: 'Confirmar Eliminación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.performDelete(originalItem.id);
        }
      });
    }
  }

  private performDelete(id: number): void {
    this.rolFormPermissionService.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Registro eliminado correctamente'
          });
          this.loadData();
        },
        error: (error) => {
          console.error('Error deleting item:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al eliminar el registro'
          });
        }
      });
  }

  saveItem(): void {
    if (this.rolFormPermissionForm.valid) {
      const formValue = this.rolFormPermissionForm.value;
      
      if (this.isEditMode && this.selectedItemId) {
        const updateData: UpdateRolFormPermission = {
          id: this.selectedItemId,
          ...formValue
        };
        
        this.rolFormPermissionService.update(updateData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Registro actualizado correctamente'
              });
              this.closeDialog();
              this.loadData();
            },
            error: (error) => {
              console.error('Error updating item:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al actualizar el registro'
              });
            }
          });
      } else {
        const createData: CreateRolFormPermission = formValue;
        
        this.rolFormPermissionService.create(createData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Registro creado correctamente'
              });
              this.closeDialog();
              this.loadData();
            },
            error: (error) => {
              console.error('Error creating item:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al crear el registro'
              });
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

  closeDialog(): void {
    this.displayDialog = false;
    this.rolFormPermissionForm.reset();
    this.isEditMode = false;
    this.selectedItemId = null;
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