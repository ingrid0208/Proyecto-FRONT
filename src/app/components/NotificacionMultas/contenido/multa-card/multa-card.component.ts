import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Multas } from '../../../../Models/multas.model';

@Component({
  selector: 'app-multa-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multa-card.component.html',
  styleUrl: './multa-card.component.scss'
})
export class MultaCardComponent {
 @Input() multa!: Multas;

  get estadoClass(): string {
    return this.multa.estado === 'ABIERTO' ? 'estado-abierto' : 'estado-pendiente';
  }
}
