import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Infraccion {
  tipo: string;
  fecha: string;
  descripcion: string;
  valor: string;
  estado: string;
  pdf: boolean;
}

@Component({
  selector: 'app-infracciones-inspectora',
  standalone: true,
  templateUrl: './infracciones-inspectora.component.html',
  styleUrls: ['./infracciones-inspectora.component.scss'],
  imports: [NgFor, NgIf, FormsModule, RouterLink]
})
export class InfraccionesInspectoraComponent {
  busqueda: string = '';
  infracciones: Infraccion[] = [
    {
      tipo: 'Tipo 1',
      fecha: '10/02/2025',
      descripcion: 'Consumir bebidas alcohólicas o sustancias psicoactivas en lugares públicos.',
      valor: '$189.800',
      estado: 'Enviado',
      pdf: true
    },
    {
      tipo: 'Tipo 2',
      fecha: '12/04/2025',
      descripcion: 'Perturbar la tranquilidad con ruido excesivo',
      valor: '$759.200',
      estado: 'Enviado',
      pdf: true
    },
    {
      tipo: 'Tipo 2',
      fecha: '30/05/2025',
      descripcion: 'Portar armas, elementos cortopunzantes o sustancias peligrosas sin permiso.',
      valor: '$759.200',
      estado: 'Enviado',
      pdf: true
    },
    {
      tipo: 'Tipo 4',
      fecha: '22/08/2025',
      descripcion: 'Maltrato o abandono de animales',
      valor: '$1.518.400',
      estado: 'Pendiente',
      pdf: false
    },
    {
      tipo: 'Tipo 2',
      fecha: '31/12/2025',
      descripcion: 'Realizar necesidades fisiológicas en el espacio público.',
      valor: '$379.600',
      estado: 'Pendiente',
      pdf: false
    }
  ];

  get infraccionesFiltradas(): Infraccion[] {
    if (!this.busqueda.trim()) return this.infracciones;
    return this.infracciones.filter(i =>
      i.tipo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      i.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      i.estado.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  trackByDescripcion(index: number, item: Infraccion) {
    return item.descripcion;
  }
}
