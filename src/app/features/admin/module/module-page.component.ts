import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModuleService, Module } from '../../../core/services/module.service';
import { PaginationService, PaginationConfig } from '../../../shared/services/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ConfirmationModalComponent, ConfirmationModalConfig } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-module-page',
  templateUrl: './module-page.component.html',
  styleUrls: ['./module-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, SearchBarComponent, ConfirmationModalComponent],
  providers: [ModuleService]
})
export class ModulePageComponent implements OnInit {
  
  constructor(
    private moduleService: ModuleService,
    private cdr: ChangeDetectorRef,
    private paginationService: PaginationService
  ) {}

  modules: Module[] = [];
  filteredModules: Module[] = [];
  paginatedModules: Module[] = [];

  // Paginación
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
    totalPages: 0
  };
  
  // Modal y formulario
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  showUpdateConfirm: boolean = false;
  moduleSeleccionado: Module | null = null;
  moduleAActualizar: Module | null = null;
  
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

  // Configuración de modales de confirmación
  showDeleteModal = false;
  showUpdateConfirmModal = false;
  deleteModalConfig: ConfirmationModalConfig = {
    title: 'Eliminar Módulo',
    message: '¿Está seguro que desea eliminar este módulo? Esta acción no se puede deshacer.',
    confirmText: 'Eliminar',
    cancelText: 'Cancelar',
    type: 'delete'
  };
  updateModalConfig: ConfirmationModalConfig = {
    title: 'Confirmar Actualización',
    message: '¿Está seguro que desea actualizar este módulo?',
    confirmText: 'Actualizar',
    cancelText: 'Cancelar',
    type: 'update'
  };

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
        this.updatePagination();
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
        this.filteredModules = [...this.modules]; // Inicializar módulos filtrados
        this.updatePagination();
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
          this.filteredModules = [...this.modules];
          this.updatePagination();
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

  confirmarActualizacion(module: Module) {
    this.moduleAActualizar = module;
    this.updateModalConfig.message = `¿Está seguro que desea actualizar el módulo "${module.name}"?`;
    this.showUpdateConfirmModal = true;
  }

  cancelarActualizacion() {
    this.moduleAActualizar = null;
    this.showUpdateConfirmModal = false;
  }

  abrirModalActualizar() {
    if (this.moduleAActualizar) {
      this.moduleSeleccionado = {
        ...this.moduleAActualizar,
        // Asegurar que los campos tengan valores válidos
        name: this.moduleAActualizar.name || '',
        description: this.moduleAActualizar.description || ''
      };
      this.showUpdateModal = true;
      this.showUpdateConfirmModal = false;
      this.moduleAActualizar = null;
    }
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

    // Validar límites de longitud
    if (this.nuevoModule.name.length < 3 || this.nuevoModule.name.length > 80) {
      this.mostrarAlerta('El nombre debe tener entre 3 y 80 caracteres', 'error');
      return;
    }

    if (this.nuevoModule.description.length < 10 || this.nuevoModule.description.length > 250) {
      this.mostrarAlerta('La descripción debe tener entre 10 y 250 caracteres', 'error');
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
      // Validar límites para actualización
      if (this.moduleSeleccionado.name.length < 3 || this.moduleSeleccionado.name.length > 80) {
        this.mostrarAlerta('El nombre debe tener entre 3 y 80 caracteres', 'error');
        return;
      }

      if (this.moduleSeleccionado.description.length < 10 || this.moduleSeleccionado.description.length > 250) {
        this.mostrarAlerta('La descripción debe tener entre 10 y 250 caracteres', 'error');
        return;
      }

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
    this.deleteModalConfig.message = `¿Está seguro que desea eliminar el módulo "${module.name}"? Esta acción no se puede deshacer.`;
    this.showDeleteModal = true;
  }

  confirmarEliminar() {
    if (this.moduleAEliminar && this.moduleAEliminar.id) {
      console.log('Eliminando módulo:', this.moduleAEliminar); // Para depuración

      this.moduleService.genericService.delete(this.moduleService.endpoint, this.moduleAEliminar.id).subscribe({
        next: () => {
          console.log('Módulo eliminado exitosamente'); // Para depuración
          this.mostrarAlerta('Módulo eliminado correctamente.', 'eliminado');
          this.showDeleteModal = false;
          this.moduleAEliminar = null;
          // Recargar la lista completa desde la API para asegurar sincronización
          this.cargarModules(true);
        },
        error: (error: any) => {
          console.error('Error al eliminar módulo:', error);
          this.mostrarAlerta('Error al eliminar el módulo: ' + (error.error?.message || error.message), 'error');
          this.showDeleteModal = false;
          this.moduleAEliminar = null;
        }
      });
    } else {
      console.error('No se puede eliminar: módulo sin ID válido');
      this.mostrarAlerta('Error: No se puede eliminar el módulo', 'error');
      this.showDeleteModal = false;
      this.moduleAEliminar = null;
    }
  }

  cancelarEliminar() {
    this.showDeleteModal = false;
    this.moduleAEliminar = null;
  }

  onSearch(term: string) {
    this.filteredModules = this.modules.filter(module =>
      module.name.toLowerCase().includes(term.toLowerCase()) ||
      module.description.toLowerCase().includes(term.toLowerCase())
    );
    this.updatePagination();
  }

  // Métodos de paginación
  updatePagination(): void {
    this.paginationConfig = this.paginationService.updatePagination(this.paginationConfig, this.filteredModules.length);
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    this.paginatedModules = this.paginationService.getPaginatedItems(this.filteredModules, this.paginationConfig);
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
}