import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../../../shared/Models/persona.model';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss']
})
export class PersonaListComponent implements OnInit {
  personas: Persona[] = [];
  error: string | null = null;

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas()
      .pipe(
        catchError(error => {
          this.error = 'Error al cargar las personas';
          return of([]);
        })
      )
      .subscribe(personas => this.personas = personas);
  }

  getInitials(persona: Persona): string {
    return (persona.nombre?.[0] || '') + (persona.apellido?.[0] || '');
  }

  addPersona(): void {
    // TODO: Implementar
  }

  updatePersona(persona: Persona): void {
    // TODO: Implementar
  }

  deletePersona(persona: Persona): void {
    this.personaService.deletePersona(persona.id)
      .pipe(
        catchError(error => {
          this.error = 'Error al eliminar la persona';
          return of(void 0);
        })
      )
      .subscribe(() => {
        this.loadPersonas();
      });
  }
}
