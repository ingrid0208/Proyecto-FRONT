import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE para *ngFor y *ngIf

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule], // 👈 NECESARIO para usar *ngFor
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  multas = [
    {
      tipo: 'Multa Tipo Uno',
      descripcion: 'Consumir bebidas alcohólicas o sustancias psicoactivas en lugares públicos.'
    },
    {
      tipo: 'Multa Tipo Dos',
      descripcion: 'Perturbar la tranquilidad con ruido excesivo.'
    },
    {
      tipo: 'Multa Tipo Tres',
      descripcion: 'Portar armas, elementos cortopunzantes o sustancias peligrosas sin permiso.'
    },
    {
      tipo: 'Multa Tipo Cuatro',
      descripcion: 'Poner en peligro la vida de otros, amenazas o incendios provocados.'
    }
  ];

  onMultaClick(index: number) {
    // Aquí puedes mostrar un modal, navegar o mostrar información adicional
    alert(`Seleccionaste: ${this.multas[index].tipo}`);
  }
}
