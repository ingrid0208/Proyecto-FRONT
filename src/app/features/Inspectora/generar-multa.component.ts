import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generar-multa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generar-multa.component.html',
  styleUrls: ['./generar-multa.component.scss']
})
export class GenerarMultaComponent {
  form: FormGroup;

  tiposDocumento = ['Cédula de ciudadanía', 'Cédula de extranjería', 'Pasaporte'];
  tiposMulta = ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Tipo 4'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', [Validators.required, Validators.minLength(5)]],
      tipoMulta: ['', Validators.required],
      salarioMinimo: ['', Validators.required],
    });
  }

  volver() {
    this.router.navigate(['/infracciones-inspectora']);
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: Integrar con servicio para persistencia
    alert('Multa registrada correctamente');
    this.volver();
  }
}
