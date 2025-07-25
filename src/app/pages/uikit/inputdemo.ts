
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
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 class="text-center text-2xl font-semibold mb-6 text-gray-800">
          Identificación ciudadana
        </h2>

        <div class="mb-4">
          <label class="block mb-2 font-medium text-gray-700">Document Type</label>
          <p-dropdown 
            [options]="documentTypes" 
            [(ngModel)]="selectedDocType" 
            placeholder="Select"
            class="w-full"
          ></p-dropdown>
        </div>

        <div class="mb-4">
          <label class="block mb-2 font-medium text-gray-700">Document Number</label>
          <input pInputText type="text" [(ngModel)]="documentNumber" placeholder="Enter document number" class="w-full" />
        </div>

        <div class="mb-4">
          <label class="block mb-2 font-medium text-gray-700">Phone</label>
          <input pInputText type="text" [(ngModel)]="phone" placeholder="Enter phone number" class="w-full" />
        </div>

        <div class="mb-6">
          <label class="block mb-2 font-medium text-gray-700">Email (optional)</label>
          <input pInputText type="email" [(ngModel)]="email" placeholder="Enter email" class="w-full" />
        </div>

        <button 
            pButton 
            type="button" 
            label="Consultar Multas" 
            class="w-full bg-green-700 border-none hover:bg-green-800"
            (click)="goToAgreement()">
        </button>
      </div>
    </div>
  `,
})
export class InputDemo {
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
    this.router.navigate(['/acuerdo-pago']);
  }

}


