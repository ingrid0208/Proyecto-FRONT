import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-payment-agreement',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h2 class="text-2xl font-bold mb-4">Resumen del Acuerdo de Pago</h2>

      <div class="space-y-6">
        <table class="w-full text-left border-collapse rounded shadow overflow-hidden">
          <thead class="bg-green-700 text-white">
            <tr>
              <th class="py-2 px-4">Seleccionar</th>
              <th class="py-2 px-4">Número de Multa</th>
              <th class="py-2 px-4">Fecha de Infracción</th>
              <th class="py-2 px-4">Monto Total</th>
              <th class="py-2 px-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let fine of selectedFines" class="border-b hover:bg-gray-50">
              <td class="py-2 px-4 text-green-600 font-semibold">{{ fine.selected }}</td>
              <td class="py-2 px-4">{{ fine.number }}</td>
              <td class="py-2 px-4">{{ fine.date }}</td>
              <td class="py-2 px-4">\${{ fine.amount }}</td>
              <td class="py-2 px-4">
                <span class="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  {{ fine.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-right text-lg font-semibold">
          Total a pagar: <span class="text-green-700">\${{ totalAmount }}</span>
        </div>

        <div class="flex justify-between">
          <button 
            class="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
            (click)="goBack()">
            ⬅️ Regresar
          </button>

          <button 
            class="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
            (click)="confirmAgreement()">
            ✅ Confirmar Acuerdo
          </button>
        </div>
      </div>
    </div>
  `
})
export class PaymentAgreementComponent {
  selectedFines = [
    {
      selected: true,
      number: '1234567890',
      date: '2023-08-15',
      amount: 250,
      status: 'Pendiente'
    },
    {
      selected: true,
      number: '4567890123',
      date: '2023-10-10',
      amount: 300,
      status: 'Pendiente'
    },
    {
      selected: true,
      number: '6543210987',
      date: '2023-12-01',
      amount: 200,
      status: 'Pendiente'
    }
  ];

  totalAmount: number = 0;

  constructor(private location: Location) {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.selectedFines.reduce((sum, fine) => sum + fine.amount, 0);
  }

  goBack() {
    this.location.back();
  }

  confirmAgreement() {
    alert('✅ Acuerdo de pago confirmado con multas seleccionadas.');
  }
}
