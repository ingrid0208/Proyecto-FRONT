import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { PaymentFrequencyService } from '../../../core/services/api/payment-frequency.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ColumnDef } from '../../../shared/Models/table.Generic';
import { PaymentFrequency } from '../../../shared/Models/parameters/payment-frequency.models';

@Component({
  selector: 'app-payment-frequency',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, GenericMultasTableComponent, CardHeaderComponent, ButtonComponent],
  templateUrl: './payment-frequency.component.html',
  styleUrls: ['./payment-frequency.component.scss']
})
export class PaymentFrequencyComponent implements OnInit {
  private router = inject(Router);
  private service = inject(PaymentFrequencyService);
  private fb = inject(FormBuilder);

  frecuencias: PaymentFrequency[] = [];
  originalFrecuencias: PaymentFrequency[] = []; // Lista original sin filtros
  filteredFrecuencias: PaymentFrequency[] = []; // Lista filtrada
  searchTerm: string = ''; // Término de búsqueda
  loading = false;
  errorMsg = '';
  successMsg = '';

  // Variables para modales
  showForm = false;
  showUpdateForm = false;
  showConfirm = false;
  showUpdateConfirm = false;
  paymentFrequencyAEliminar: PaymentFrequency | null = null;
  paymentFrequencySeleccionado: PaymentFrequency | null = null;
  paymentFrequencyAActualizar: PaymentFrequency | null = null;

  // Formularios reactivos
  paymentFrequencyForm: FormGroup;
  updateForm: FormGroup;

  columns: ColumnDef[] = [
    { key: 'name',          header: 'Nombre',         type: 'text' },
    { key: 'daysInterval',  header: 'Intervalo días', type: 'text' },
    { key: 'actions',       header: 'Acciones',       type: 'actions' }
  ];

  constructor() {
    // Inicializar formularios reactivos
    this.paymentFrequencyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      daysInterval: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });

    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      daysInterval: ['', [Validators.required, Validators.min(1), Validators.max(365)]],
      code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.cargarAcuerdosFrecuencia();
  }

  private cargarAcuerdosFrecuencia(): void {
    this.loading = true;
    this.errorMsg = '';

    this.service.genericService.getAll<PaymentFrequency>(this.service.endpoint, 'GetAll')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (r: PaymentFrequency[]) => {
          // Normalizar los datos del backend para consistencia en la UI
          this.frecuencias = (r || []).map(item => {
            const normalized: PaymentFrequency = {
              id: item.id,
              name: item.name || (item as any).intervalPage || item.code || '',
              code: item.code || (item as any).intervalPage || '',
              description: item.description || '',
              daysInterval: item.daysInterval || (item as any).dueDayOfMonth || 0
            };
            return normalized;
          });
          this.originalFrecuencias = [...this.frecuencias]; // Guardar copia original
          this.filteredFrecuencias = [...this.frecuencias]; // Inicializar filtrados
        },
        error: (e: any) => { this.errorMsg = 'No fue posible cargar las frecuencias de pago.'; }
      });
  }

  // Métodos para manejar formularios
  abrirFormulario(): void {
    this.showForm = true;
    this.paymentFrequencyForm.reset();
    this.errorMsg = '';
    this.successMsg = '';
  }

  cerrarFormulario(): void {
    this.showForm = false;
    this.paymentFrequencyForm.reset();
  }

  // Método para crear frecuencia de pago
  crearPaymentFrequency(): void {
    if (this.paymentFrequencyForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      const paymentFrequencyData = this.paymentFrequencyForm.value;

      // Construir payload normalizado para el backend
      const payload: any = {
        name: paymentFrequencyData.name,
        code: paymentFrequencyData.code,
        daysInterval: paymentFrequencyData.daysInterval,
        // Campos adicionales para compatibilidad con backend legacy
        intervalPage: paymentFrequencyData.code || paymentFrequencyData.name,
        dueDayOfMonth: paymentFrequencyData.daysInterval
      };

      this.service.genericService.create<PaymentFrequency>(this.service.endpoint, payload)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (nuevoPaymentFrequency: PaymentFrequency) => {
            this.successMsg = 'Frecuencia de pago creada exitosamente.';
            this.cargarAcuerdosFrecuencia(); // Recargar la lista
            this.cerrarFormulario();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al crear frecuencia de pago:', error);
            this.errorMsg = error?.error?.message || 'Error al crear la frecuencia de pago.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para editar frecuencia de pago
  confirmarActualizacion(paymentFrequency: PaymentFrequency): void {
    this.paymentFrequencyAActualizar = paymentFrequency;
    this.showUpdateConfirm = true;
  }

  cancelarActualizacion(): void {
    this.paymentFrequencyAActualizar = null;
    this.showUpdateConfirm = false;
  }

  abrirFormularioActualizar(paymentFrequency?: PaymentFrequency): void {
    const freq = paymentFrequency || this.paymentFrequencyAActualizar;
    if (freq) {
      this.paymentFrequencySeleccionado = { ...freq };
      this.updateForm.patchValue({
        name: freq.name,
        daysInterval: freq.daysInterval,
        code: freq.code
      });
      this.showUpdateForm = true;
      this.showUpdateConfirm = false;
      this.paymentFrequencyAActualizar = null;
      this.errorMsg = '';
      this.successMsg = '';
    }
  }

  cerrarFormularioActualizar(): void {
    this.showUpdateForm = false;
    this.paymentFrequencySeleccionado = null;
    this.updateForm.reset();
  }

  actualizarPaymentFrequency(): void {
    if (this.updateForm.valid && this.paymentFrequencySeleccionado && this.paymentFrequencySeleccionado.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      const formData = this.updateForm.value;
      const paymentFrequencyActualizado = {
        ...this.paymentFrequencySeleccionado,
        name: formData.name,
        code: formData.code,
        daysInterval: formData.daysInterval,
        // Campos adicionales para compatibilidad con backend legacy
        intervalPage: formData.code || formData.name,
        dueDayOfMonth: formData.daysInterval
      };

      this.service.genericService.update<PaymentFrequency>(this.service.endpoint, this.paymentFrequencySeleccionado.id, paymentFrequencyActualizado)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (paymentFrequencyActualizado: PaymentFrequency) => {
            this.successMsg = 'Frecuencia de pago actualizada exitosamente.';
            this.cargarAcuerdosFrecuencia(); // Recargar la lista
            this.cerrarFormularioActualizar();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al actualizar frecuencia de pago:', error);
            this.errorMsg = error?.error?.message || 'Error al actualizar la frecuencia de pago.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    } else {
      this.errorMsg = 'Por favor complete todos los campos requeridos.';
    }
  }

  // Métodos para eliminar frecuencia de pago
  confirmarEliminacion(paymentFrequency: PaymentFrequency): void {
    this.paymentFrequencyAEliminar = paymentFrequency;
    this.showConfirm = true;
  }

  cancelarEliminacion(): void {
    this.paymentFrequencyAEliminar = null;
    this.showConfirm = false;
  }

  eliminarPaymentFrequency(): void {
    if (this.paymentFrequencyAEliminar && this.paymentFrequencyAEliminar.id) {
      this.loading = true;
      this.errorMsg = '';
      this.successMsg = '';

      this.service.genericService.delete(this.service.endpoint, this.paymentFrequencyAEliminar.id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.successMsg = 'Frecuencia de pago eliminada exitosamente.';
            this.cargarAcuerdosFrecuencia(); // Recargar la lista
            this.cancelarEliminacion();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: (error: any) => {
            console.error('Error al eliminar frecuencia de pago:', error);
            this.errorMsg = error?.error?.message || 'Error al eliminar la frecuencia de pago.';
            setTimeout(() => this.errorMsg = '', 3000);
          }
        });
    }
  }

  // Métodos de búsqueda
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      // Si no hay término de búsqueda, mostrar todas las frecuencias
      this.filteredFrecuencias = [...this.originalFrecuencias];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      // Filtrar frecuencias por nombre, código o intervalo de días
      this.filteredFrecuencias = this.originalFrecuencias.filter(frecuencia =>
        frecuencia.name.toLowerCase().includes(searchTermLower) ||
        frecuencia.daysInterval.toString().toLowerCase().includes(searchTermLower) ||
        (frecuencia.code && frecuencia.code.toLowerCase().includes(searchTermLower))
      );
    }

    // Actualizar la lista mostrada
    this.frecuencias = [...this.filteredFrecuencias];
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  // Métodos auxiliares para validaciones
  isFieldInvalid(fieldName: string, form: FormGroup = this.paymentFrequencyForm): boolean {
    const field = form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string, form: FormGroup = this.paymentFrequencyForm): string {
    const field = form.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `El campo ${fieldName} es requerido.`;
      if (field.errors['minlength']) return `El campo ${fieldName} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres.`;
      if (field.errors['maxlength']) return `El campo ${fieldName} no puede exceder ${field.errors['maxlength'].requiredLength} caracteres.`;
      if (field.errors['min']) return `El valor mínimo es ${field.errors['min'].min}.`;
      if (field.errors['max']) return `El valor máximo es ${field.errors['max'].max}.`;
      if (field.errors['pattern']) return `El formato del ${fieldName} no es válido.`;
    }
    return '';
  }

}
