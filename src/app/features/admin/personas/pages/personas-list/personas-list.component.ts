import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Persona } from '../../../../shared/Models/Entities/persona.model';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PersonasListComponent {
  @Input() personas: Persona[] = [];
}
