import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-contenido-inicio',
  standalone: true,
  templateUrl: './contenido-inicio.component.html',
  styleUrls: ['./contenido-inicio.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule
  ]
})
export class ContenidoInicioComponent {
  displayedColumns = ['tipo', 'fecha', 'descripcion', 'costo', 'estado'];

  multas = [
    {
      tipo: 'Tipo uno',
      fecha: new Date(2025, 1, 10),
      descripcion: 'Consumir bebidas alcohólicas o sustancias psicoactivas en lugares públicos.',
      costo: 95000
    },
    {
      tipo: 'Tipo dos',
      fecha: new Date(2025, 3, 12),
      descripcion: 'Perturbar la tranquilidad con ruido excesivo',
      costo: 190000
    },
    {
      tipo: 'Tipo tres',
      fecha: new Date(2025, 4, 30),
      descripcion: 'Portar armas, elementos cortopunzantes o sustancias peligrosas sin permiso.',
      costo: 380000
    },
    {
      tipo: 'Tipo cuatro',
      fecha: new Date(2025, 11, 31),
      descripcion: 'Maltrato o abandono de animales',
      costo: 760000
    },
    {
      tipo: 'Tipo dos',
      fecha: new Date(2025, 11, 31),
      descripcion: 'Realizar necesidades fisiológicas en el espacio público.',
      costo: 190000
    }
  ];
}
