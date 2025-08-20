import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../../core/services/persona.service';
import { Persona } from '../../../shared/models/persona.model';

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

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.personaService.getPersonas().subscribe(personas => {
      this.personas = personas;
      this.filteredPersonas = personas;
    });
  }

  onSearch(term: string) {
    this.filteredPersonas = this.personas.filter(p =>
      (p.nombre + ' ' + p.apellido).toLowerCase().includes(term.toLowerCase())
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
}
