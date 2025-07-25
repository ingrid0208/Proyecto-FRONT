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
        value="1"
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

    <!-- Infracciones seleccionadas -->
    <div class="mb-4" *ngIf="selectedFines.length > 0">
      <p class="text-gray-700 font-medium mb-2">Infracciones incluidas en el acuerdo</p>
      <div class="bg-gray-50 rounded-lg p-3">
        <div *ngFor="let fine of selectedFines" class="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
          <div>
            <span class="text-sm font-medium">{{ fine.number }}</span>
            <span class="text-xs text-gray-500 ml-2">{{ fine.date }}</span>
          </div>
          <span class="text-sm font-semibold">\${{ fine.amount }}</span>
        </div>
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
      [class.opacity-50]="!canConfirm()"
      [class.cursor-not-allowed]="!canConfirm()"
    >
      Confirmar acuerdo
    </button>
    
    
    <!-- Botón para recargar datos -->
    <button
      class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors mt-2"
      (click)="loadTestData()"
    >
      Cargar Datos de Prueba
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
      console.log('Datos recibidos:', { 
        selectedFines: this.selectedFines, 
        totalAmount: this.totalAmount 
      });
    } else {
      console.log('No se recibieron datos de navegación - usando datos de prueba');
      // Datos de prueba por defecto
      this.selectedFines = [
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
        }
      ];
      this.totalAmount = this.selectedFines.reduce((sum, fine) => sum + fine.amount, 0);
    }
    
    // Inicializar numberOfInstallments si está en 0
    if (this.numberOfInstallments === 0) {
      this.numberOfInstallments = 1;
    }
    
    this.calculateInstallment();
    
    console.log('Estado final después de ngOnInit:', {
      selectedFines: this.selectedFines,
      totalAmount: this.totalAmount,
      numberOfInstallments: this.numberOfInstallments,
      monthlyInstallment: this.monthlyInstallment
    });
  }

  calculateInstallment() {
    if (this.numberOfInstallments && this.numberOfInstallments > 0) {
      this.monthlyInstallment = Math.round(this.totalAmount / this.numberOfInstallments);
    } else {
      this.monthlyInstallment = this.totalAmount;
    }
  }

  canConfirm(): boolean {
    const result = this.acceptedTerms && this.numberOfInstallments > 0 && this.totalAmount > 0;
    console.log('canConfirm check:', {
      acceptedTerms: this.acceptedTerms,
      numberOfInstallments: this.numberOfInstallments,
      totalAmount: this.totalAmount,
      result: result
    });
    return result;
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

  testButton() {
    console.log('TEST BUTTON CLICKED!');
    console.log('Current state:', {
      selectedFines: this.selectedFines,
      totalAmount: this.totalAmount,
      numberOfInstallments: this.numberOfInstallments,
      monthlyInstallment: this.monthlyInstallment,
      acceptedTerms: this.acceptedTerms
    });
    alert('Test button works! Check console for current state.');
  }

  loadTestData() {
    this.selectedFines = [
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
    this.totalAmount = this.selectedFines.reduce((sum, fine) => sum + fine.amount, 0);
    this.numberOfInstallments = 3;
    this.calculateInstallment();
    
    console.log('Datos de prueba cargados:', {
      selectedFines: this.selectedFines,
      totalAmount: this.totalAmount,
      numberOfInstallments: this.numberOfInstallments,
      monthlyInstallment: this.monthlyInstallment
    });
    
    alert(`Datos cargados: ${this.selectedFines.length} multas, Total: $${this.totalAmount}`);
  }

  confirmAgreement() {
    console.log('Confirm button clicked');
    console.log('Can confirm:', this.canConfirm());
    console.log('Accepted terms:', this.acceptedTerms);
    console.log('Number of installments:', this.numberOfInstallments);
    console.log('Total amount:', this.totalAmount);
    
    if (this.canConfirm()) {
      
      const agreementNumber = `AG-${Date.now()}`;
      
      console.log('Navigating to success page with data:', {
        agreementNumber,
        numberOfInstallments: this.numberOfInstallments,
        monthlyInstallment: this.monthlyInstallment,
        totalAmount: this.totalAmount,
        selectedFines: this.selectedFines
      });
      
      // Navegar a la página de éxito con los datos del acuerdo
      this.router.navigate(['/uikit/acuerdo-exitoso'], { 
        state: { 
          agreementNumber: agreementNumber,
          numberOfInstallments: this.numberOfInstallments,
          monthlyInstallment: this.monthlyInstallment,
          totalAmount: this.totalAmount,
          selectedFines: this.selectedFines
        }
      });
    } else {
      console.log('Cannot confirm agreement - validation failed');
      alert('Por favor completa todos los campos requeridos y acepta los términos');
    }
  }
}