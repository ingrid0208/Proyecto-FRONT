import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-agreement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
   <div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white border border-green-600 rounded-xl shadow-md w-full max-w-md p-8">
    <h2 class="text-2xl font-bold text-center mb-6">Acuerdo de Pago</h2>

    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-1" for="cuotas">Número de cuotas</label>
      <input
        id="cuotas"
        type="number"
        [(ngModel)]="numberOfInstallments"
        (ngModelChange)="calculateInstallment()"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
        placeholder="Digite el número de cuotas"
        min="1"
        max="12"
      />
    </div>

    <div class="flex justify-between mb-4">
      <div>
        <p class="text-gray-700 font-medium">Monto total</p>
        <p class="text-black font-bold text-lg">\${{ totalAmount }}</p>
      </div>
      <div class="text-right">
        <label class="block text-gray-700 font-medium mb-1" for="cuotaMensual">Cuota mensual</label>
        <input
          id="cuotaMensual"
          type="text"
          [value]="'$' + monthlyInstallment"
          readonly
          class="w-full px-3 py-1.5 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
        />
      </div>
    </div>

    <div class="mb-4">
      <p class="text-gray-700 font-medium">Fecha de inicio del acuerdo</p>
      <p class="text-green-700 font-semibold">{{ getCurrentDate() }}</p>
    </div>

    <div class="mb-4 flex items-start">
      <input 
        id="terminos" 
        type="checkbox" 
        [(ngModel)]="acceptedTerms"
        class="mr-2 mt-1 text-green-600 focus:ring-green-500" />
      <label for="terminos" class="text-sm text-gray-700">
        Acepto los términos y condiciones del acuerdo de pago.
      </label>
    </div>

    <button
      class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md transition-colors"
      (click)="confirmAgreement()"
      [disabled]="!canConfirm()"
    >
      Confirmar acuerdo
    </button>
  </div>
</div>
  `
})
export class GenerateAgreementComponent implements OnInit {
  selectedFines: any[] = [];
  totalAmount: number = 0;
  numberOfInstallments: number = 1;
  monthlyInstallment: number = 0;
  acceptedTerms: boolean = false;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedFines = navigation.extras.state['selectedFines'] || [];
      this.totalAmount = navigation.extras.state['totalAmount'] || 0;
    }
    this.calculateInstallment();
  }

  calculateInstallment() {
    if (this.numberOfInstallments && this.numberOfInstallments > 0) {
      this.monthlyInstallment = Math.round(this.totalAmount / this.numberOfInstallments);
    } else {
      this.monthlyInstallment = this.totalAmount;
    }
  }

  canConfirm(): boolean {
    return this.acceptedTerms && this.numberOfInstallments > 0 && this.totalAmount > 0;
  }


  getCurrentDate(): string {
    return new Date().toLocaleDateString('es-ES');
  }

  getInstallmentDates(): string[] {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= this.numberOfInstallments; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, today.getDate());
      dates.push(date.toLocaleDateString('es-ES'));
    }
    return dates;
  }

  goBack() {
    this.location.back();
  }

  confirmAgreement() {
    if (this.canConfirm()) {
      const installmentDates = this.getInstallmentDates();
      
      alert(`✅ Acuerdo de pago generado exitosamente.

Número de cuotas: ${this.numberOfInstallments}
Cuota mensual: $${this.monthlyInstallment}
Monto total: $${this.totalAmount}
Fechas de vencimiento: ${installmentDates.join(', ')}
Número de Acuerdo: AG-${Date.now()}

El acuerdo ha sido enviado a su correo electrónico.`);
      
      // Redirigir al dashboard
      this.router.navigate(['/']);
    }
  }
}