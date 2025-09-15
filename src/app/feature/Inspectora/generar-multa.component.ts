import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-generar-multa',
  templateUrl: './generar-multa.component.html',
  styleUrls: ['./generar-multa.component.scss'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe]
})
export class GenerarMultaComponent {
  mostrarFormulario = false;

  infracciones = [
    {
      tipo: 'Tipo 1',
      fecha: '10/02/2025',
      descripcion: 'Consumir bebidas alcohólicas o sustancias psicoactivas en lugares públicos.',
      valor: 189800,
      estado: 'Enviado',
      pdf: true
    },
    {
      tipo: 'Tipo 2',
      fecha: '12/04/2025',
      descripcion: 'Perturbar la tranquilidad con ruido excesivo.',
      valor: 759200,
      estado: 'Enviado',
      pdf: true
    },
    {
      tipo: 'Tipo 2',
      fecha: '30/05/2025',
      descripcion: 'Portar armas, elementos cortopunzantes o sustancias peligrosas sin permiso.',
      valor: 759200,
      estado: 'Enviado',
      pdf: true
    },
    {
      tipo: 'Tipo 4',
      fecha: '22/08/2025',
      descripcion: 'Maltrato o abandono de animales.',
      valor: 1518400,
      estado: 'Pendiente',
      pdf: false
    },
    {
      tipo: 'Tipo 2',
      fecha: '31/12/2025',
      descripcion: 'Realizar necesidades fisiológicas en el espacio público.',
      valor: 379600,
      estado: 'Pendiente',
      pdf: false
    }
  ];

  mostrarFormNuevaMulta() {
    this.mostrarFormulario = true;
  }

  ocultarFormNuevaMulta() {
    this.mostrarFormulario = false;
  }
}
