import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-persona-card',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
  ],
  templateUrl: './persona-card.component.html',
  styleUrls: ['./persona-card.component.scss'],
})
export class PersonaCardComponent {
  @Input() persona!: Persona;
}
