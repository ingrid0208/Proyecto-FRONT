import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../core/services/persona.service';
import { TipoDocumentoService } from '../../../core/services/tipo-documento.service';
import { Persona } from '../../../shared/Models/persona.model';
import { TipoDocumento } from '../../../shared/Models/tipo-documento.model';

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
  tiposDocumento: TipoDocumento[] = [];
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
    private tipoDocumentoService: TipoDocumentoService,
    private fb: FormBuilder
  ) {
    this.personaForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      documentTypeId: [0, [Validators.required, Validators.min(1)]],
      municipalityId: [0, [Validators.required, Validators.min(1)]]
    });

    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      documentTypeId: [0, [Validators.required, Validators.min(1)]],
      municipalityId: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    // Cargar personas
    this.personaService.getPersonas().subscribe(personas => {
      this.personas = personas;
      this.filteredPersonas = personas;
    });
    
    // Cargar tipos de documento
    this.tipoDocumentoService.getTiposDocumento().subscribe(tipos => {
      this.tiposDocumento = tipos;
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
      const nuevaPersona: Persona = this.personaForm.value;
      
      this.personaService.createPersona(nuevaPersona).subscribe({
        next: (persona) => {
          this.mostrarAlerta('Persona creada exitosamente.', 'creado');
          this.cerrarFormulario();
        },
        error: (error) => {
          console.error('Error al crear persona:', error);
          this.mostrarAlerta('Error al crear la persona.', 'eliminado');
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
      this.personaService.deletePersona(this.personaAEliminar.id).subscribe({
        next: () => {
          this.mostrarAlerta('Persona eliminada correctamente.', 'eliminado');
        },
        error: (error) => {
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
      const personaActualizada: Persona = {
        ...this.updateForm.value,
        id: this.personaSeleccionada.id  // Incluir el ID de la persona seleccionada
      };
      
      this.personaService.updatePersona(personaActualizada).subscribe({
        next: (persona) => {
          this.mostrarAlerta('Persona actualizada exitosamente.', 'creado');
          this.cerrarModalActualizar();
        },
        error: (error) => {
          console.error('Error al actualizar persona:', error);
          this.mostrarAlerta('Error al actualizar la persona.', 'eliminado');
        }
      });
    } else {
      this.mostrarAlerta('Por favor completa todos los campos requeridos.', 'eliminado');
    }
  }

  // Método helper para obtener el nombre del tipo de documento
  getTipoDocumentoName(documentTypeId: number): string {
    const tipo = this.tiposDocumento.find(t => t.id === documentTypeId);
    return tipo ? `${tipo.name} (${tipo.abbreviation})` : `Tipo ${documentTypeId}`;
  }
}
