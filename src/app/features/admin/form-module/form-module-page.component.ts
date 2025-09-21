import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModuleService, FormModule } from '../../../core/services/formmodule.service';

@Component({
  selector: 'app-form-module-page',
  templateUrl: './form-module-page.component.html',
  styleUrls: ['./form-module-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [FormModuleService]
})
export class FormModulePageComponent implements OnInit {
  formModules: FormModule[] = [];
  isLoading: boolean = false;
  
  // Modal y formulario
  showModal: boolean = false;
  isEditing: boolean = false;
  showUpdateConfirm: boolean = false;
  formModuleEditando: number | null = null;
  formModuleAActualizar: number | null = null;
  nuevoFormModule: FormModule = { 
    formid: 0, 
    moduleid: 0, 
    formName: '', 
    moduleName: '' 
  };

  // Modales de alerta y confirmación
  showAlert: boolean = false;
  alertMsg: string = '';
  alertType: string = 'bienvenida';
  showConfirm: boolean = false;
  formModuleAEliminar: number | null = null;

  constructor(private formModuleService: FormModuleService) {}

  ngOnInit() {
    this.loadFormModules();
  }

  loadFormModules() {
    this.isLoading = true;
    this.formModuleService.genericService.getAll<FormModule>(this.formModuleService.endpoint).subscribe({
      next: (formModules: FormModule[]) => {
        this.formModules = formModules;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar form-modules:', error);
        this.mostrarAlerta('Error al cargar los form-modules', 'error');
        this.isLoading = false;
      }
    });
  }

  abrirModal() {
    this.showModal = true;
    this.isEditing = false;
    this.formModuleEditando = null;
    this.nuevoFormModule = { 
      formid: 0, 
      moduleid: 0, 
      formName: '', 
      moduleName: '' 
    };
  }

  confirmarActualizacion(idx: number) {
    this.formModuleAActualizar = idx;
    this.showUpdateConfirm = true;
  }

  cancelarActualizacion() {
    this.formModuleAActualizar = null;
    this.showUpdateConfirm = false;
  }

  abrirModalEditar() {
    if (this.formModuleAActualizar !== null) {
      const formModule = this.formModules[this.formModuleAActualizar];
      this.showModal = true;
      this.isEditing = true;
      this.formModuleEditando = this.formModuleAActualizar;
      this.nuevoFormModule = {
        id: formModule.id,
        formid: formModule.formid,
        moduleid: formModule.moduleid,
        formName: formModule.formName,
        moduleName: formModule.moduleName
      };
      this.showUpdateConfirm = false;
      this.formModuleAActualizar = null;
    }
  }

  mostrarAlerta(msg: string, tipo: string) {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  pedirConfirmacionEliminar(idx: number) {
    this.formModuleAEliminar = idx;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.formModuleAEliminar !== null && this.formModules[this.formModuleAEliminar].id) {
      const formModuleId = this.formModules[this.formModuleAEliminar].id!;
      this.formModuleService.genericService.delete(this.formModuleService.endpoint, formModuleId).subscribe({
        next: () => {
          this.formModules.splice(this.formModuleAEliminar!, 1);
          this.mostrarAlerta('Form-Module eliminado correctamente.', 'eliminado');
          this.showConfirm = false;
          this.formModuleAEliminar = null;
        },
        error: (error: any) => {
          console.error('Error al eliminar form-module:', error);
          this.mostrarAlerta('Error al eliminar el form-module', 'error');
          this.showConfirm = false;
          this.formModuleAEliminar = null;
        }
      });
    }
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.formModuleAEliminar = null;
  }

  cerrarModal() {
    this.showModal = false;
    this.isEditing = false;
    this.formModuleEditando = null;
  }

  guardarFormModule() {
    // Validar que todos los campos obligatorios estén completos
    if (!this.nuevoFormModule.formid || !this.nuevoFormModule.moduleid ||
        !this.nuevoFormModule.formName || !this.nuevoFormModule.moduleName) {
      this.mostrarAlerta('Por favor complete todos los campos obligatorios', 'error');
      return;
    }

    // Validar que los campos de texto no estén vacíos
    if (this.nuevoFormModule.formName.trim() === '' || this.nuevoFormModule.moduleName.trim() === '') {
      this.mostrarAlerta('Los nombres no pueden estar vacíos', 'error');
      return;
    }

    // Validar límites de longitud
    if (this.nuevoFormModule.formName.length < 3 || this.nuevoFormModule.formName.length > 100) {
      this.mostrarAlerta('El nombre del formulario debe tener entre 3 y 100 caracteres', 'error');
      return;
    }

    if (this.nuevoFormModule.moduleName.length < 3 || this.nuevoFormModule.moduleName.length > 80) {
      this.mostrarAlerta('El nombre del módulo debe tener entre 3 y 80 caracteres', 'error');
      return;
    }

    // Validar que los IDs sean números válidos
    if (this.nuevoFormModule.formid <= 0 || this.nuevoFormModule.moduleid <= 0) {
      this.mostrarAlerta('Los IDs deben ser números válidos mayores a 0', 'error');
      return;
    }

    if (this.nuevoFormModule.formid && this.nuevoFormModule.moduleid &&
        this.nuevoFormModule.formName && this.nuevoFormModule.moduleName) {
      
      if (this.isEditing && this.formModuleEditando !== null) {
        // Actualizar form-module existente
        this.actualizarFormModule();
      } else {
        // Crear nuevo form-module
        const formModuleData: Omit<FormModule, 'id'> = {
          formid: this.nuevoFormModule.formid,
          moduleid: this.nuevoFormModule.moduleid,
          formName: this.nuevoFormModule.formName,
          moduleName: this.nuevoFormModule.moduleName
        };

        this.formModuleService.genericService.create<FormModule>(this.formModuleService.endpoint, formModuleData).subscribe({
          next: (createdFormModule: FormModule) => {
            this.formModules.push(createdFormModule);
            this.mostrarAlerta('Form-Module creado exitosamente.', 'creado');
            this.cerrarModal();
          },
          error: (error: any) => {
            console.error('Error al crear form-module:', error);
            this.mostrarAlerta('Error al crear el form-module', 'error');
          }
        });
      }
    }
  }

  actualizarFormModule() {
    if (this.nuevoFormModule.id && this.formModuleEditando !== null) {
      const formModuleData: Partial<FormModule> = {
        formid: this.nuevoFormModule.formid,
        moduleid: this.nuevoFormModule.moduleid,
        formName: this.nuevoFormModule.formName,
        moduleName: this.nuevoFormModule.moduleName
      };

      this.formModuleService.genericService.update<FormModule>(this.formModuleService.endpoint, this.nuevoFormModule.id, formModuleData).subscribe({
        next: (updatedFormModule: FormModule) => {
          this.formModules[this.formModuleEditando!] = updatedFormModule;
          this.mostrarAlerta('Form-Module actualizado exitosamente.', 'creado');
          this.cerrarModal();
        },
        error: (error: any) => {
          console.error('Error al actualizar form-module:', error);
          this.mostrarAlerta('Error al actualizar el form-module', 'error');
        }
      });
    }
  }
}