import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModuleService, Module } from '../../core/services/module.service';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ModuleService]
})
export class ModulePageComponent implements OnInit {
  
  constructor(
    private moduleService: ModuleService,
    private cdr: ChangeDetectorRef
  ) {}

  modules: Module[] = [];
  
  // Modal y formulario
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  moduleSeleccionado: Module | null = null;
  
  nuevoModule: {
    name: string;
    description: string;
  } = {
    name: '',
    description: ''
  };

  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';
  showConfirm = false;
  moduleAEliminar: Module | null = null;

  ngOnInit() {
    this.mostrarAlerta('¡Bienvenido a la gestión de módulos!', 'bienvenida');
    this.cargarModules();
    
    // Datos de prueba (comentar cuando la API funcione)
    setTimeout(() => {
      if (this.modules.length === 0) {
        console.log('No se cargaron módulos de la API, agregando datos de prueba');
        this.modules = [
          { 
            id: 1, 
            name: 'Módulo de Usuarios',
            description: 'Módulo para gestionar usuarios del sistema'
          },
          { 
            id: 2, 
            name: 'Módulo de Reportes',
            description: 'Módulo para generar y visualizar reportes'
          },
          { 
            id: 3, 
            name: 'Módulo de Configuración',
            description: 'Módulo para configurar parámetros del sistema'
          }
        ];
      }
    }, 2000);
  }

  // Cargar módulos desde la API
  cargarModules(esDespuesDeOperacion: boolean = false): void {
    console.log('Cargando módulos desde la API...'); // Para depuración
    
    this.moduleService.genericService.getAll<Module>(this.moduleService.endpoint).subscribe({
      next: (modules: Module[]) => {
        console.log('Módulos cargados:', modules); // Para depuración
        this.modules = modules || []; // Asegurar que modules sea un array
        // Forzar detección de cambios para asegurar que la vista se actualice
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar módulos:', error);
        this.mostrarAlerta('Error al cargar los módulos: ' + (error.error?.message || error.message), 'error');
        
        // Solo agregar datos de prueba si no es después de una operación y no hay módulos
        if (!esDespuesDeOperacion && this.modules.length === 0) {
          console.log('Agregando datos de prueba debido a error de API');
          this.modules = [
            { 
              id: 1, 
              name: 'Módulo de Usuarios',
              description: 'Módulo para gestionar usuarios del sistema'
            },
            { 
              id: 2, 
              name: 'Módulo de Reportes',
              description: 'Módulo para generar y visualizar reportes'
            },
            { 
              id: 3, 
              name: 'Módulo de Configuración',
              description: 'Módulo para configurar parámetros del sistema'
            }
          ];
        }
      }
    });
  }

  abrirModal() {
    this.showModal = true;
    this.nuevoModule = {
      name: '',
      description: ''
    };
  }

  cerrarModal() {
    this.showModal = false;
    // Limpiar el formulario al cerrar
    this.nuevoModule = {
      name: '',
      description: ''
    };
  }

  abrirModalActualizar(module: Module) {
    this.moduleSeleccionado = { 
      ...module,
      // Asegurar que los campos tengan valores válidos
      name: module.name || '',
      description: module.description || ''
    };
    this.showUpdateModal = true;
  }

  cerrarModalActualizar() {
    this.showUpdateModal = false;
    this.moduleSeleccionado = null;
  }

  crearModule() {
    // Validar que los campos no estén vacíos
    if (!this.nuevoModule.name || !this.nuevoModule.description) {
      this.mostrarAlerta('Por favor, complete todos los campos', 'error');
      return;
    }

    // Validar que no estén solo con espacios en blanco
    if (this.nuevoModule.name.trim() === '' || this.nuevoModule.description.trim() === '') {
      this.mostrarAlerta('Los campos no pueden estar vacíos', 'error');
      return;
    }

    // Validar longitud mínima
    if (this.nuevoModule.name.length < 3) {
      this.mostrarAlerta('El nombre debe tener al menos 3 caracteres', 'error');
      return;
    }

    if (this.nuevoModule.description.length < 10) {
      this.mostrarAlerta('La descripción debe tener al menos 10 caracteres', 'error');
      return;
    }

    console.log('Creando módulo:', this.nuevoModule); // Para depuración

    this.moduleService.genericService.create<Module>(this.moduleService.endpoint, this.nuevoModule).subscribe({
      next: (moduleCreado: Module) => {
        console.log('Módulo creado exitosamente:', moduleCreado); // Para depuración
        this.cerrarModal();
        this.mostrarAlerta('Módulo creado exitosamente.', 'creado');
        // Recargar la lista completa desde la API para asegurar sincronización
        this.cargarModules(true);
      },
      error: (error: any) => {
        console.error('Error al crear módulo:', error);
        this.mostrarAlerta('Error al crear el módulo: ' + (error.error?.message || error.message), 'error');
      }
    });
  }

  actualizarModule() {
    if (this.moduleSeleccionado && this.moduleSeleccionado.id) {
      console.log('Actualizando módulo:', this.moduleSeleccionado);
      
      this.moduleService.genericService.update<Module>(this.moduleService.endpoint, this.moduleSeleccionado.id, this.moduleSeleccionado).subscribe({
        next: (moduleActualizado: Module) => {
          console.log('Módulo actualizado exitosamente:', moduleActualizado);
          this.cerrarModalActualizar();
          this.mostrarAlerta('Módulo actualizado exitosamente.', 'creado');
          // Recargar la lista completa desde la API para asegurar sincronización
          this.cargarModules(true);
        },
        error: (error: any) => {
          console.error('Error al actualizar módulo:', error);
          this.mostrarAlerta('Error al actualizar el módulo: ' + (error.error?.message || error.message), 'error');
        }
      });
    }
  }

  mostrarAlerta(msg: string, tipo: string) {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  pedirConfirmacionEliminar(module: Module) {
    this.moduleAEliminar = module;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.moduleAEliminar && this.moduleAEliminar.id) {
      console.log('Eliminando módulo:', this.moduleAEliminar); // Para depuración
      
      this.moduleService.genericService.delete(this.moduleService.endpoint, this.moduleAEliminar.id).subscribe({
        next: () => {
          console.log('Módulo eliminado exitosamente'); // Para depuración
          this.mostrarAlerta('Módulo eliminado correctamente.', 'eliminado');
          this.showConfirm = false;
          this.moduleAEliminar = null;
          // Recargar la lista completa desde la API para asegurar sincronización
          this.cargarModules(true);
        },
        error: (error: any) => {
          console.error('Error al eliminar módulo:', error);
          this.mostrarAlerta('Error al eliminar el módulo: ' + (error.error?.message || error.message), 'error');
          this.showConfirm = false;
          this.moduleAEliminar = null;
        }
      });
    } else {
      console.error('No se puede eliminar: módulo sin ID válido');
      this.mostrarAlerta('Error: No se puede eliminar el módulo', 'error');
      this.showConfirm = false;
      this.moduleAEliminar = null;
    }
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.moduleAEliminar = null;
  }
}