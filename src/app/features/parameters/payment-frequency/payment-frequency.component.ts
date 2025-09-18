import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GenericMultasTableComponent } from '../../../shared/components/generic-multas-table/generic-multas-table.component';
import { ColumnDef } from '../../../shared/Models/table.Generic';
import { CardHeaderComponent } from '../../../shared/components/card-header/card-header.component';
import { ServiceGenericService } from '../../../core/services/servicesGeneric/service-generic.service';
import { finalize } from 'rxjs/operators';
import { AppTopbar } from '../../../feature/topbar/topbar.component';
import { PaymentFrequency } from '../../../shared/Models/parameter/payment-frequency.models';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-payment-frequency',
  standalone: true,
  imports: [CommonModule, MatCardModule, AppTopbar, GenericMultasTableComponent, CardHeaderComponent,ButtonComponent],
  templateUrl: './payment-frequency.component.html',
  styleUrls: ['./payment-frequency.component.scss']
})
export class PaymentFrequencyComponent implements OnInit {
  private router = inject(Router);
  private api = inject(ServiceGenericService);

  frecuencias: PaymentFrequency[] = [];
  loading = false;
  errorMsg = '';

  columns: ColumnDef[] = [
    { key: 'intervalPage',  header: 'Intervalo',      type: 'text' },
    { key: 'dueDayOfMonth', header: 'Día de corte',   type: 'text' },
  ];

  ngOnInit(): void {
    this.cargarAcuerdosFrecuencia();
  }

  private cargarAcuerdosFrecuencia(): void {
    this.loading = true;
    this.errorMsg = '';

    this.api.getAll<PaymentFrequency>('paymentFrequency', 'GetAll')
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: r => this.frecuencias = r,
        error: e => this.errorMsg = 'No fue posible cargar las frecuencias de pago.'
      });
  }

    onClickGenerar() {
    this.router.navigate(['/acuerdo-pago/formulario']);
  }
}
