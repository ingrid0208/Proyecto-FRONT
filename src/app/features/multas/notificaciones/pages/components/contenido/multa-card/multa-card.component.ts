import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Multas } from '../../../../../../../shared/models/multas.model';

@Component({
  selector: 'app-multa-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multa-card.component.html',
  styleUrls: ['./multa-card.component.scss']
})
export class MultaCardComponent {
 @Input() multa: Multas = {
  numero : '',
  descripcion : '',
  fecha : '',
  estado : 'PENDIENTE',
  ubicacion : ''
 };

  get estadoClass(): string {
    return this.multa.estado === 'ABIERTO' ? 'estado-abierto' : 'estado-pendiente';
  }
}
