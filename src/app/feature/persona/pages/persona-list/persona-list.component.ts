import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '@shared/Models/persona.model';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss']
})
export class PersonaListComponent implements OnInit {
  personas: Persona[] = [];

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas()
      .subscribe(personas => this.personas = personas);
  }

  addPersona(): void {
    // Implementar lógica para agregar persona
  }

  updatePersona(persona: Persona): void {
    // Implementar lógica para actualizar persona
  }

  deletePersona(persona: Persona): void {
    // Implementar lógica para eliminar persona
  }
}
