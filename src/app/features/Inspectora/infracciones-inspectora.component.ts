import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-infracciones-inspectora',
  templateUrl: './infracciones-inspectora.component.html',
  styleUrls: ['./infracciones-inspectora.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class InfraccionesInspectoraComponent {
  busqueda: string = '';
  infracciones = [
    { tipo: 'Tipo 1', fecha: '2025-09-14', descripcion: 'Ejemplo 1', valor: 100, estado: 'Pendiente', pdf: true },
    { tipo: 'Tipo 2', fecha: '2025-09-13', descripcion: 'Ejemplo 2', valor: 200, estado: 'Pagado', pdf: false }
  ];
  get infraccionesFiltradas() {
    if (!this.busqueda) return this.infracciones;
    return this.infracciones.filter(i =>
      i.tipo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      i.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }
  trackByDescripcion(index: number, item: any) {
    return item.descripcion;
  }
}
