import { Component } from '@angular/core';
import { Multas } from '../../../../../../../shared/models/multas.model';
import { CommonModule } from '@angular/common';
import { MultaCardComponent } from '../../contenido/multa-card/multa-card.component';
@Component({
  selector: 'app-notificacion',
  imports: [CommonModule, MultaCardComponent],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.scss'
})
export class NotificacionComponent {
   usuario = {
    nombre: 'Camilo Andres Ramirez',
    cc: '12345678',
    acuerdosPago: 1,
    nuevasNotificaciones: 3
  };

  multas: Multas[] = [
    {
      numero: 'N0124515',
      descripcion: 'Consumir bebidas alcohólicas o sustancias psicoactivas en lugares públicos',
      fecha: '19/6/2024',
      estado: 'ABIERTO',
      ubicacion: 'Carrera 8 #25-67'
    },
    {
      numero: 'N1457814',
      descripcion: 'Perturbar la tranquilidad con ruido excesivo',
      fecha: '30/6/2024',
      estado: 'PENDIENTE',
      ubicacion: 'Plaza Central'
    },
    {
      numero: 'N1245781',
      descripcion: 'Ocupación indebida del espacio público - Venta ambulante sin permiso',
      fecha: '30/6/2024',
      estado: 'PENDIENTE',
      ubicacion: 'Plaza Central'
    }
  ];
}
