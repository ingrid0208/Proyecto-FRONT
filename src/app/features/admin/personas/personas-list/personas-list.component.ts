import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Persona } from '../../../../shared/models/entities/persona.model';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PersonasListComponent {
  @Input() personas: Persona[] = [];
  @Output() edit: EventEmitter<Persona> = new EventEmitter<Persona>();
  @Output() remove: EventEmitter<Persona> = new EventEmitter<Persona>();
}
