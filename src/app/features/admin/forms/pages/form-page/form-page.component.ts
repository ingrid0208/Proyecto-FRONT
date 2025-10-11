import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form as AngularForm, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from '../../../../../shared/components/pagination/pagination.component';
import { PaginationConfig, PaginationService } from '../../../../../shared/services/pagination.service';
import { validateFormDescription, validateFormName } from '../../../../../shared/utils/validator/validator-form/form';
import { Form } from '../../../../../shared/Models/modelSecurity/form';
import { FormService } from '../../../../../core/services/ModelSecurity/form.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, PaginationComponent],
  providers: [FormService]
})
export class FormPageComponent implements OnInit {

  constructor(
    private formService: FormService,
    private cdr: ChangeDetectorRef,
    private paginationService: PaginationService
  ) { }

  forms: Form[] = [];
  paginatedForms: 
  Form[] = [];

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
  formSeleccionado: Form | null = null;
  formAActualizar: Form | null = null;

  nuevoForm: {
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
  formAEliminar: Form | null = null;

  ngOnInit() {
    this.mostrarAlerta('¡Bienvenido a la gestión de formularios!', 'bienvenida');
    this.cargarForms();

    // Datos de prueba (comentar cuando la API funcione)
    setTimeout(() => {
      if (this.forms.length === 0) {
        console.log('No se cargaron formularios de la API, agregando datos de prueba');
        this.forms = [
          {
            id: 1,
            name: 'Formulario de acuerdo de pago',
            description: 'Formulario de creación de acuerdo de pago'
          },
          {
            id: 2,
            name: 'Formulario de registro de multas',
            description: 'Formulario para registrar nuevas multas'
          }
        ];
        this.updatePagination();
      }
    }, 2000);
  }

  // Cargar formularios desde la API
  cargarForms(esDespuesDeOperacion: boolean = false): void {
    console.log('Cargando formularios desde la API...'); // Para depuración

    this.formService.genericService.getAll<Form>(this.formService.endpoint).subscribe({
      next: (forms: Form[]) => {
        console.log('Formularios cargados:', forms); // Para depuración
        this.forms = forms || []; // Asegurar que forms sea un array
        this.updatePagination();
        // Forzar detección de cambios para asegurar que la vista se actualice
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error al cargar formularios:', error);
        this.mostrarAlerta('Error al cargar los formularios: ' + (error.error?.message || error.message), 'error');

        // Solo agregar datos de prueba si no es después de una operación y no hay formularios
        if (!esDespuesDeOperacion && this.forms.length === 0) {
          console.log('Agregando datos de prueba debido a error de API');
          this.forms = [
            {
              id: 1,
              name: 'Formulario de acuerdo de pago',
              description: 'Formulario de creación de acuerdo de pago'
            },
            {
              id: 2,
              name: 'Formulario de registro de multas',
              description: 'Formulario para registrar nuevas multas'
            }
          ];
          this.updatePagination();
        }
      }
    });
  }

  abrirModal() {
    this.showModal = true;
    this.nuevoForm = {
      name: '',
      description: ''
    };
  }

  cerrarModal() {
    this.showModal = false;
    // Limpiar el formulario al cerrar
    this.nuevoForm = {
      name: '',
      description: ''
    };
  }

  confirmarActualizacion(form: Form) {
    this.formAActualizar = form;
    this.showUpdateConfirm = true;
  }

  cancelarActualizacion() {
    this.formAActualizar = null;
    this.showUpdateConfirm = false;
  }

  abrirModalActualizar() {
    if (this.formAActualizar) {
      this.formSeleccionado = {
        ...this.formAActualizar,
        // Asegurar que los campos tengan valores válidos
        name: this.formAActualizar.name || '',
        description: this.formAActualizar.description || ''
      };
      this.showUpdateModal = true;
      this.showUpdateConfirm = false;
      this.formAActualizar = null;
    }
  }

  cerrarModalActualizar() {
    this.showUpdateModal = false;
    this.formSeleccionado = null;
  }

  crearForm() {
    const nameError = validateFormName(this.nuevoForm.name);
    const descError = validateFormDescription(this.nuevoForm.description);


    if (nameError || descError) {
      this.mostrarAlerta(nameError || descError!, 'error');
      return;
    }


    console.log('Creando formulario:', this.nuevoForm); // Para depuración

    this.formService.genericService.create<Form>(this.formService.endpoint, this.nuevoForm).subscribe({
      next: (formCreado: Form) => {
        console.log('Formulario creado exitosamente:', formCreado); // Para depuración
        this.cerrarModal();
        this.mostrarAlerta('Formulario creado exitosamente.', 'creado');
        // Recargar la lista completa desde la API para asegurar sincronización
        this.cargarForms(true);
      },
      error: (error: any) => {
        console.error('Error al crear formulario:', error);
        this.mostrarAlerta('Error al crear el formulario: ' + (error.error?.message || error.message), 'error');
      }
    });
  }

  actualizarForm() {
    if (this.formSeleccionado && this.formSeleccionado.id) {
      const nameError = validateFormName(this.formSeleccionado.name);
      const descError = validateFormDescription(this.formSeleccionado.description);

      if (nameError || descError) {
        this.mostrarAlerta(nameError || descError!, 'error');
        return;
      }
      const originalName = this.formAActualizar?.name?.trim() || '';
      const originalDesc = this.formAActualizar?.description?.trim() || '';
      const newName = this.formSeleccionado.name.trim();
      const newDesc = this.formSeleccionado.description.trim();

      if (originalName === newName && originalDesc === newDesc) {
        // ⚡ Aquí ya no lanzamos "error", sino un aviso amigable
        this.mostrarAlerta('No se detectaron cambios en el formulario.', 'info');
        return;
      }

      console.log('Actualizando formulario:', this.formSeleccionado);

      this.formService.genericService.update<Form>(
        this.formService.endpoint,
        this.formSeleccionado.id,
        this.formSeleccionado
      ).subscribe({
        next: (formActualizado: Form) => {
          
          console.log('Formulario actualizado exitosamente:', formActualizado);
          this.cerrarModalActualizar();
          this.mostrarAlerta('Formulario actualizado exitosamente.', 'creado');
          this.cargarForms(true);
        },
        error: (error: any) => {
          console.error('Error al actualizar formulario:', error);
          this.mostrarAlerta(
            'No se pudo actualizar el formulario. Intenta nuevamente.',
            'error'
          );
        }
      });
    }
  }


  mostrarAlerta(msg: string, tipo: 'error' | 'creado' | 'eliminado' | 'bienvenida' | 'info') {
  this.alertMsg = msg;
  this.alertType = tipo;
  this.showAlert = true;
  setTimeout(() => this.showAlert = false, 2500);
}


  pedirConfirmacionEliminar(form: Form) {
    this.formAEliminar = form;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.formAEliminar && this.formAEliminar.id) {
      console.log('Eliminando formulario:', this.formAEliminar); // Para depuración

      this.formService.genericService.delete(this.formService.endpoint, this.formAEliminar.id).subscribe({
        next: () => {
          console.log('Formulario eliminado exitosamente'); // Para depuración
          this.mostrarAlerta('Formulario eliminado correctamente.', 'eliminado');
          this.showConfirm = false;
          this.formAEliminar = null;
          // Recargar la lista completa desde la API para asegurar sincronización
          this.cargarForms(true);
        },
        error: (error: any) => {
          console.error('Error al eliminar formulario:', error);
          this.mostrarAlerta('Error al eliminar el formulario: ' + (error.error?.message || error.message), 'error');
          this.showConfirm = false;
          this.formAEliminar = null;
        }
      });
    } else {
      console.error('No se puede eliminar: formulario sin ID válido');
      this.mostrarAlerta('Error: No se puede eliminar el formulario', 'error');
      this.showConfirm = false;
      this.formAEliminar = null;
    }
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.formAEliminar = null;
  }

  // Métodos de paginación
  updatePagination(): void {
    this.paginationConfig = this.paginationService.updatePagination(this.paginationConfig, this.forms.length);
    this.updatePaginatedItems();
  }

  updatePaginatedItems(): void {
    this.paginatedForms = this.paginationService.getPaginatedItems(this.forms, this.paginationConfig);
  }

  onPageChange(page: number): void {
    this.paginationConfig = this.paginationService.goToPage(this.paginationConfig, page);
    this.updatePaginatedItems();
  }
}