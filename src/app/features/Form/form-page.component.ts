import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormService, Form } from '../../core/services/form.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [FormService]
})
export class FormPageComponent implements OnInit {
  
  constructor(
    private formService: FormService,
    private cdr: ChangeDetectorRef
  ) {}

  forms: Form[] = [];
  
  // Modal y formulario
  showModal: boolean = false;
  showUpdateModal: boolean = false;
  formSeleccionado: Form | null = null;
  
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
      }
    }, 2000);
  }

  // Cargar formularios desde la API
  cargarForms(esDespuesDeOperacion: boolean = false): void {
    console.log('Cargando formularios desde la API...'); // Para depuración
    
    this.formService.getForms().subscribe({
      next: (forms: Form[]) => {
        console.log('Formularios cargados:', forms); // Para depuración
        this.forms = forms || []; // Asegurar que forms sea un array
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

  abrirModalActualizar(form: Form) {
    this.formSeleccionado = { 
      ...form,
      // Asegurar que los campos tengan valores válidos
      name: form.name || '',
      description: form.description || ''
    };
    this.showUpdateModal = true;
  }

  cerrarModalActualizar() {
    this.showUpdateModal = false;
    this.formSeleccionado = null;
  }

  crearForm() {
    // Validar que los campos no estén vacíos
    if (!this.nuevoForm.name || !this.nuevoForm.description) {
      this.mostrarAlerta('Por favor, complete todos los campos', 'error');
      return;
    }

    // Validar que no estén solo con espacios en blanco
    if (this.nuevoForm.name.trim() === '' || this.nuevoForm.description.trim() === '') {
      this.mostrarAlerta('Los campos no pueden estar vacíos', 'error');
      return;
    }

    // Validar longitud mínima
    if (this.nuevoForm.name.length < 3) {
      this.mostrarAlerta('El nombre debe tener al menos 3 caracteres', 'error');
      return;
    }

    if (this.nuevoForm.description.length < 10) {
      this.mostrarAlerta('La descripción debe tener al menos 10 caracteres', 'error');
      return;
    }

    console.log('Creando formulario:', this.nuevoForm); // Para depuración

    this.formService.createForm(this.nuevoForm).subscribe({
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
      console.log('Actualizando formulario:', this.formSeleccionado);
      
      this.formService.updateForm(this.formSeleccionado.id, this.formSeleccionado).subscribe({
        next: (formActualizado: Form) => {
          console.log('Formulario actualizado exitosamente:', formActualizado);
          this.cerrarModalActualizar();
          this.mostrarAlerta('Formulario actualizado exitosamente.', 'creado');
          // Recargar la lista completa desde la API para asegurar sincronización
          this.cargarForms(true);
        },
        error: (error: any) => {
          console.error('Error al actualizar formulario:', error);
          this.mostrarAlerta('Error al actualizar el formulario: ' + (error.error?.message || error.message), 'error');
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

  pedirConfirmacionEliminar(form: Form) {
    this.formAEliminar = form;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.formAEliminar && this.formAEliminar.id) {
      console.log('Eliminando formulario:', this.formAEliminar); // Para depuración
      
      this.formService.deleteForm(this.formAEliminar.id).subscribe({
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
}