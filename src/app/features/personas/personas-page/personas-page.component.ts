import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../core/services/persona.service';
import { MunicipioService } from '../../../core/services/municipio.service';
import { DocumentTypeService } from '../../../core/services/document-type.service';
import { Persona } from '../../../shared/Models/persona.model';
import { Municipio } from '../../../shared/Models/municipio.model';
import { DocumentType } from '../../../shared/Models/parameter/document-type.models';

@Component({
  selector: 'app-personas-page',
  templateUrl: './personas-page.component.html',
  styleUrls: ['./personas-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class PersonasPageComponent implements OnInit {
  personas: Persona[] = [];
  filteredPersonas: Persona[] = [];
  municipios: Municipio[] = [];
  documentTypes: DocumentType[] = [];
  showForm: boolean = false;
  showInfoModal: boolean = false;
  showUpdateModal: boolean = false;
  personaSeleccionada: Persona | null = null;
  
  // Formularios reactivos
  personaForm: FormGroup;
  updateForm: FormGroup;

  // Modales de alerta y confirmación
  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';
  showConfirm = false;
  personaAEliminar: Persona | null = null;

  constructor(
    private personaService: PersonaService,
    private municipioService: MunicipioService,
    private documentTypeService: DocumentTypeService,
    private fb: FormBuilder
  ) {
    this.personaForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      municipalityId: [null, [Validators.required, Validators.min(1)]],
      documentTypeId: [null, [Validators.required, Validators.min(1)]]
    });

    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      municipalityId: [null, [Validators.required, Validators.min(1)]],
      documentTypeId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    // Cargar personas
    this.personaService.personas$.subscribe((personas: any) => {
      this.personas = personas;
      this.filteredPersonas = personas;
    });

    // Cargar municipios
    this.municipioService.personas$.subscribe((municipios: any) => {
      this.municipios = municipios;
    });

    // Cargar tipos de documento
    this.documentTypeService.genericService.getAll<any>(this.documentTypeService.endpoint).subscribe((documentTypes: any) => {
      this.documentTypes = documentTypes;
    });
    
    this.mostrarAlerta('¡Bienvenido a la gestión de personas!', 'bienvenida');
  }

  onSearch(term: string) {
    this.filteredPersonas = this.personas.filter(p =>
      (p.firstName + ' ' + p.lastName).toLowerCase().includes(term.toLowerCase())
    );
  }

  abrirFormulario() {
    this.showForm = true;
  }

  cerrarFormulario() {
    this.showForm = false;
    this.personaForm.reset();
  }

  crearPersona() {
    if (this.personaForm.valid) {
      const formValue = this.personaForm.value;
      
      // Asegurar que los IDs sean números válidos
      const nuevaPersona: Persona = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        phoneNumber: formValue.phoneNumber,
        address: formValue.address,
        municipalityId: Number(formValue.municipalityId),
        documentTypeId: Number(formValue.documentTypeId)
      };
      
      // Validación adicional
      if (!nuevaPersona.municipalityId || nuevaPersona.municipalityId <= 0) {
        this.mostrarAlerta('Debe seleccionar un municipio válido.', 'eliminado');
        return;
      }
      
      if (!nuevaPersona.documentTypeId || nuevaPersona.documentTypeId <= 0) {
        this.mostrarAlerta('Debe seleccionar un tipo de documento válido.', 'eliminado');
        return;
      }
      
      // Log para debugging
      console.log('Datos a enviar:', nuevaPersona);
      
      this.personaService.genericService.create<any>(this.personaService.endpoint, nuevaPersona).subscribe({
        next: (persona: any) => {
          this.mostrarAlerta('Persona creada exitosamente.', 'creado');
          this.cerrarFormulario();
        },
        error: (error: any) => {
          console.error('Error al crear persona:', error);
          
          // Intentar extraer mensaje específico del error
          let errorMessage = 'Error al crear la persona.';
          if (error?.error) {
            if (typeof error.error === 'string') {
              errorMessage = error.error;
            } else if (error.error.message) {
              errorMessage = error.error.message;
            } else if (error.error.errors) {
              // Errores de validación del backend
              const validationErrors = Object.keys(error.error.errors).map(key => 
                `${key}: ${error.error.errors[key].join(', ')}`
              ).join('; ');
              errorMessage = `Errores de validación: ${validationErrors}`;
            }
          }
          
          console.log('Mensaje de error procesado:', errorMessage);
          this.mostrarAlerta(errorMessage, 'eliminado');
        }
      });
    } else {
      this.mostrarAlerta('Por favor completa todos los campos requeridos.', 'eliminado');
    }
  }

  abrirInfoModal(persona: Persona) {
    this.personaSeleccionada = persona;
    this.showInfoModal = true;
  }

  cerrarInfoModal() {
    this.showInfoModal = false;
    this.personaSeleccionada = null;
  }

  mostrarAlerta(msg: string, tipo: string) {
    this.alertMsg = msg;
    this.alertType = tipo;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 2500);
  }

  pedirConfirmacionEliminar(persona: Persona) {
    this.personaAEliminar = persona;
    this.showConfirm = true;
  }

  confirmarEliminar() {
    if (this.personaAEliminar && this.personaAEliminar.id) {
      this.personaService.genericService.delete(this.personaService.endpoint, this.personaAEliminar.id).subscribe({
        next: () => {
          this.mostrarAlerta('Persona eliminada correctamente.', 'eliminado');
        },
        error: (error: any) => {
          console.error('Error al eliminar persona:', error);
          this.mostrarAlerta('Error al eliminar la persona.', 'eliminado');
        }
      });
    } else {
      this.mostrarAlerta('No se puede eliminar: ID de persona no encontrado.', 'eliminado');
    }
    this.showConfirm = false;
    this.personaAEliminar = null;
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.personaAEliminar = null;
  }

  abrirModalActualizar(persona: Persona) {
    this.personaSeleccionada = { ...persona }; // Crear una copia para editar
    this.updateForm.patchValue(persona); // Cargar datos en el formulario
    this.showUpdateModal = true;
  }

  cerrarModalActualizar() {
    this.showUpdateModal = false;
    this.updateForm.reset();
    this.personaSeleccionada = null;
  }

  actualizarPersona() {
    if (this.updateForm.valid && this.personaSeleccionada) {
      const formValue = this.updateForm.value;
      
      // Asegurar que los IDs sean números válidos
      const personaActualizada: Persona = {
        id: this.personaSeleccionada.id,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        phoneNumber: formValue.phoneNumber,
        address: formValue.address,
        municipalityId: Number(formValue.municipalityId),
        documentTypeId: Number(formValue.documentTypeId)
      };
      
      // Validación adicional
      if (!personaActualizada.municipalityId || personaActualizada.municipalityId <= 0) {
        this.mostrarAlerta('Debe seleccionar un municipio válido.', 'eliminado');
        return;
      }
      
      if (!personaActualizada.documentTypeId || personaActualizada.documentTypeId <= 0) {
        this.mostrarAlerta('Debe seleccionar un tipo de documento válido.', 'eliminado');
        return;
      }
      
      // Log para debugging
      console.log('Datos a actualizar:', personaActualizada);
      
      if (personaActualizada.id) {
        this.personaService.genericService.update<any>(this.personaService.endpoint, personaActualizada.id, personaActualizada).subscribe({
          next: (persona: any) => {
            this.mostrarAlerta('Persona actualizada exitosamente.', 'creado');
            this.cerrarModalActualizar();
          },
          error: (error: any) => {
            console.error('Error al actualizar persona:', error);
            
            // Intentar extraer mensaje específico del error
            let errorMessage = 'Error al actualizar la persona.';
            if (error?.error) {
              if (typeof error.error === 'string') {
                errorMessage = error.error;
              } else if (error.error.message) {
                errorMessage = error.error.message;
              } else if (error.error.errors) {
                // Errores de validación del backend
                const validationErrors = Object.keys(error.error.errors).map(key => 
                  `${key}: ${error.error.errors[key].join(', ')}`
                ).join('; ');
                errorMessage = `Errores de validación: ${validationErrors}`;
              }
            }
            
            console.log('Mensaje de error procesado:', errorMessage);
            this.mostrarAlerta(errorMessage, 'eliminado');
          }
        });
      } else {
        this.mostrarAlerta('ID de persona no encontrado.', 'eliminado');
      }
    } else {
      this.mostrarAlerta('Por favor completa todos los campos requeridos.', 'eliminado');
    }
  }

  // Método helper para obtener el nombre del municipio por ID
  getMunicipioNombre(municipioId: number): string {
    if (this.municipios.length === 0) {
      return 'No se encuentran municipios';
    }
    const municipio = this.municipios.find(m => m.id === municipioId);
    return municipio ? municipio.name : `Municipio ID: ${municipioId}`;
  }

  // Método helper para obtener el nombre del tipo de documento por ID
  getDocumentTypeNombre(documentTypeId: number): string {
    if (this.documentTypes.length === 0) {
      return 'No se encuentran tipos de documento';
    }
    const documentType = this.documentTypes.find(dt => dt.id === documentTypeId);
    return documentType ? documentType.name : `Tipo de documento ID: ${documentTypeId}`;
  }
}
