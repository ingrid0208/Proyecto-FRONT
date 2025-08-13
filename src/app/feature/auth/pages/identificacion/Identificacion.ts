import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule
  ],
  template: `
    <div class="flex justify-center items-center pt-40">
      <div class="bg-white p-12 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 class="text-center text-3xl font-semibold mb-8 text-gray-800">
          Identificación ciudadana
        </h2>

        <div class="mb-6">
          <label class="block mb-3 font-medium text-lg text-gray-700">Document Type</label>
          <p-dropdown 
            [options]="documentTypes" 
            [(ngModel)]="selectedDocType" 
            placeholder="Select"
            class="w-full text-lg"
          ></p-dropdown>
        </div>

        <div class="mb-6">
          <label class="block mb-3 font-medium text-lg text-gray-700">Document Number</label>
          <input 
            pInputText 
            type="text" 
            [(ngModel)]="documentNumber" 
            placeholder="Enter document number" 
            class="w-full text-lg p-3" 
          />
        </div>

        <div class="mb-6">
          <label class="block mb-3 font-medium text-lg text-gray-700">Phone</label>
          <input 
            pInputText 
            type="text" 
            [(ngModel)]="phone" 
            placeholder="Enter phone number" 
            class="w-full text-lg p-3" 
          />
        </div>

        <div class="mb-8">
          <label class="block mb-3 font-medium text-lg text-gray-700">Email (optional)</label>
          <input 
            pInputText 
            type="email" 
            [(ngModel)]="email" 
            placeholder="Enter email" 
            class="w-full text-lg p-3" 
          />
        </div>

        <button 
          pButton 
          type="button" 
          label="Consultar Multas" 
          class="w-full bg-green-700 border-none hover:bg-green-800 text-lg py-4"
          (click)="goToAgreement()">
        </button>
      </div>
    </div>
  `,
})
export class Identificacion {
  constructor(private router: Router) {}
  
  documentTypes = [
    { label: 'Cédula de Ciudadanía', value: 'CC' },
    { label: 'Tarjeta de Identidad', value: 'TI' },
    { label: 'Cédula de Extranjería', value: 'CE' },
    { label: 'Pasaporte', value: 'PA' }
  ];

  selectedDocType: string | undefined;
  documentNumber: string = '';
  phone: string = '';
  email: string = '';

 goToAgreement() {
  this.router.navigateByUrl('/'); // o this.router.navigate(['/'])
}
}