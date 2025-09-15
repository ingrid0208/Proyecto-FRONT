import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopbar } from '../topbar/topbar.component';

@Component({
  selector: 'app-anexar-multa',
  templateUrl: './anexar-multa.component.html',
  styleUrls: ['./generar-multa.component.scss'],
  standalone: true,
  imports: [CommonModule, AppTopbar]
})
export class AnexarMultaComponent {}
