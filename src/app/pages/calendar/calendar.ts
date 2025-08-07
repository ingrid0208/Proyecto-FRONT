import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE para *ngFor y *ngIf

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule], // 👈 NECESARIO para usar *ngFor
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {}
