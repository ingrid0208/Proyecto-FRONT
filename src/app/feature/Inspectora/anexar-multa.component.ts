import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopbar } from '../topbar/topbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anexar-multa',
  templateUrl: './anexar-multa.component.html',
  styleUrls: ['./anexar-multa.component.scss'],
  standalone: true,
  imports: [CommonModule, AppTopbar]
})
export class AnexarMultaComponent {
  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/inspectora/generar-multa']);
  }
}
