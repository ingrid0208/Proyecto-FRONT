import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModuleService, FormModule } from '../../core/services/formmodule.service';

@Component({
  selector: 'app-form-module-page',
  templateUrl: './form-module-page.component.html',
  styleUrls: ['./form-module-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FormModulePageComponent implements OnInit {
  formModules: FormModule[] = [];
  isLoading: boolean = false;
  
  // Modal y formulario
  showModal: boolean = false;
  isEditing: boolean = false;
  formModuleEditando: number | null = null;
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
    this.formModuleService.getFormModules().subscribe({
      next: (formModules: FormModule[]) => {
        this.formModules = formModules;
        this.isLoading = false;
      },
      error: (error) => {
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

  abrirModalEditar(idx: number) {
    const formModule = this.formModules[idx];
    this.showModal = true;
    this.isEditing = true;
    this.formModuleEditando = idx;
    this.nuevoFormModule = {
      id: formModule.id,
      formid: formModule.formid,
      moduleid: formModule.moduleid,
      formName: formModule.formName,
      moduleName: formModule.moduleName
    };
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
      this.formModuleService.deleteFormModule(formModuleId).subscribe({
        next: () => {
          this.formModules.splice(this.formModuleAEliminar!, 1);
          this.mostrarAlerta('Form-Module eliminado correctamente.', 'eliminado');
          this.showConfirm = false;
          this.formModuleAEliminar = null;
        },
        error: (error) => {
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

        this.formModuleService.createFormModule(formModuleData).subscribe({
          next: (createdFormModule: FormModule) => {
            this.formModules.push(createdFormModule);
            this.mostrarAlerta('Form-Module creado exitosamente.', 'creado');
            this.cerrarModal();
          },
          error: (error) => {
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

      this.formModuleService.updateFormModule(this.nuevoFormModule.id, formModuleData).subscribe({
        next: (updatedFormModule: FormModule) => {
          this.formModules[this.formModuleEditando!] = updatedFormModule;
          this.mostrarAlerta('Form-Module actualizado exitosamente.', 'creado');
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al actualizar form-module:', error);
          this.mostrarAlerta('Error al actualizar el form-module', 'error');
        }
      });
    }
  }
}