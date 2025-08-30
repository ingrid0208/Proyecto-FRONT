// identification.component.ts
import { Component, Input } from '@angular/core'; // ⬅️ añade Input
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identification',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, ButtonModule],
  template: `
    <!-- wrapper: cambia layout según el Input -->
    <div [ngClass]="layout === 'embedded'
          ? 'block pt-0'
          : 'flex justify-center items-center pt-40'">
      <div
        [ngClass]="layout === 'embedded'
          ? 'bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md md:max-w-lg'
          : 'bg-white p-12 rounded-xl shadow-lg w-full max-w-2xl'">
        <h2 class="text-center text-3xl font-semibold mb-8 text-gray-800">
          Identificación ciudadana
        </h2>

        <div class="mb-6">
          <label class="block mb-3 font-medium text-lg text-gray-700">Document Type</label>
          <p-dropdown [options]="documentTypes" [(ngModel)]="selectedDocType" placeholder="Select" class="w-full text-lg"></p-dropdown>
        </div>

        <div class="mb-6">
          <label class="block mb-3 font-medium text-lg text-gray-700">Document Number</label>
          <input pInputText type="text" [(ngModel)]="documentNumber" placeholder="Enter document number" class="w-full text-lg p-3" />
        </div>

        <button pButton type="button" label="Consultar Multas"
          class="w-full bg-green-700 border-none hover:bg-green-800 text-lg py-4"
          (click)="onConsultar()">
        </button>
      </div>
    </div>
  `,
})
export class Identificacion {
  @Input() layout: 'standalone' | 'embedded' = 'standalone'; // ⬅️ nuevo

  constructor(private router: Router) {}

  documentTypes = [
    { label: 'Cédula de Ciudadanía', value: 'CC' },
    { label: 'Tarjeta de Identidad', value: 'TI' },
    { label: 'Cédula de Extranjería', value: 'CE' },
    { label: 'Pasaporte', value: 'PA' }
  ];

  selectedDocType?: string;
  documentNumber = '';
  phone = '';
  email = '';

      onConsultar(): void {
      this.router.navigate(['/home/contenido']);
    }
}
