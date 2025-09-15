import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../../core/services/persona.service';
import { Persona } from '../../../shared/Models/persona.model';

@Component({
  selector: 'app-personas-page',
  templateUrl: './personas-page.component.html',
  styleUrls: ['./personas-page.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PersonasPageComponent implements OnInit {
  personas: Persona[] = [];
  filteredPersonas: Persona[] = [];
  showForm: boolean = false;
  showInfoModal: boolean = false;
  personaSeleccionada: Persona | null = null;

  // Modales de alerta y confirmación
  showAlert = false;
  alertMsg = '';
  alertType: string = 'bienvenida';
  showConfirm = false;
  personaAEliminar: Persona | null = null;

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.personaService.getPersonas().subscribe(personas => {
      this.personas = personas;
      this.filteredPersonas = personas;
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
    if (this.personaAEliminar) {
      this.personas = this.personas.filter(p => p !== this.personaAEliminar);
      this.filteredPersonas = this.filteredPersonas.filter(p => p !== this.personaAEliminar);
      this.mostrarAlerta('Persona eliminada correctamente.', 'eliminado');
    }
    this.showConfirm = false;
    this.personaAEliminar = null;
  }

  cancelarEliminar() {
    this.showConfirm = false;
    this.personaAEliminar = null;
  }
}
