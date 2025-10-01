import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import Swal from 'sweetalert2';
import { AppTopbar } from '../../../../../layout/header/topbar.component';
import { ServiceGenericService } from '../../../../../core/services/utils/generic/service-generic.service';
import { PaymentAgreementInitDto } from '../../../../../shared/Models/init/PaymentAgreementInitDto';

@Component({
  selector: 'app-formulario-acuerdo-pago',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    AppTopbar,
  ],
  templateUrl: './formulario-acuerdo-pago.component.html',
  styleUrls: ['./formulario-acuerdo-pago.component.scss'],
})
export class FormularioAcuerdoPagoComponent implements OnInit {
  step: number = 1;
  today: string = this.getToday();
  selectedFrequency: any = null;

  form: any = {
    address: '',
    neighborhood: '',
    agreementDescription: '',
    expeditionCedula: '',   // fecha
    phoneNumber: '',
    email: '',
    agreementStart: '',
    agreementEnd: '',
    isPaid: false,
    userInfractionId: 0,
    paymentFrequencyId: 0,
    typePaymentId: 0,
    installments: 1,
    monthlyFee: 0,
    baseAmount: 0,
  };

  initData: PaymentAgreementInitDto = {
    personName: '',
    documentNumber: '',
    documentType: '',
    infringement: '',
    typeFine: '',
    valorSMDLV: 0,
    baseAmount: 0,
    infractionId: 0,
    userId: 0,
  };

  paymentFrequencies: any[] = [];
  typePayments: any[] = [];

  totalAmount: number = 0;
  startDate: string = '';
  agreementStart: string = '';
  agreementEnd: string = '';

  constructor(
    private serviceGeneric: ServiceGenericService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const st: any = nav?.extras?.state ?? history.state;

    if (st?.userId && st?.infractionId) {
      this.form.userInfractionId = st.infractionId;

      this.serviceGeneric.getInitData(st.userId, st.infractionId).subscribe({
        next: (data: PaymentAgreementInitDto | PaymentAgreementInitDto[]) => {
          if (Array.isArray(data)) {
            this.initData = data.find(x => x.infractionId === st.infractionId) ?? data[0];
          } else {
            this.initData = data;
          }

          this.form.userInfractionId = this.initData.infractionId;
          this.totalAmount = this.initData.baseAmount;
          this.form.baseAmount = this.initData.baseAmount;

          this.form.agreementDescription = this.initData.infringement;
          this.form.isPaid = false;

          // Inicializar monthlyFee automático
          this.form.monthlyFee = this.form.baseAmount / this.form.installments;

          this.startDate = new Date().toISOString().split('T')[0];
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar datos iniciales:', err),
      });
    }

    this.serviceGeneric.getAll<any>('PaymentFrequency')
      .subscribe((data) => (this.paymentFrequencies = data));

    this.serviceGeneric.getAll<any>('TypePayment')
      .subscribe((data) => (this.typePayments = data));
  }

  // Cambia la frecuencia de pago
  onFrequencyChange(event: any) {
    const id = Number(event.value);
    this.selectedFrequency = this.paymentFrequencies.find(f => f.id === id);

    if (this.selectedFrequency?.intervalPage === 'UNICA') {
      this.form.installments = 1;
      this.updateMonthlyFee();
    }
  }

  // Actualiza monthlyFee cada vez que cambian las cuotas
  onInstallmentsChange(value: number) {
    this.form.installments = value > 0 ? value : 1;
    this.updateMonthlyFee();
  }

  updateMonthlyFee() {
    const baseAmount = this.initData.baseAmount || 0;
    const installments = this.form.installments > 0 ? this.form.installments : 1;
    this.form.monthlyFee = Math.round(baseAmount / installments);
  }

  goToStep2(formRef: NgForm) {
    if (!formRef.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Validación',
        text: '⚠️ Debes completar todos los campos correctamente antes de continuar.',
        confirmButtonColor: '#d33'
      });
      return;
    }
    this.step = 2;
  }

  goToStep1() {
    this.step = 1;
  }

  onConfirm() {
    const montoBase = this.initData.baseAmount || this.form.baseAmount;
    const totalCuotas = this.form.installments * this.form.monthlyFee;

    if (totalCuotas !== montoBase) {
      Swal.fire({
        icon: 'error',
        title: 'Monto incorrecto',
        text: `❌ El total de cuotas (${this.form.installments} x ${this.form.monthlyFee} = ${totalCuotas}) 
             no coincide con el monto base (${montoBase}).`,
        confirmButtonColor: '#d33'
      });
      return;
    }

    const payload: any = {
      address: this.form.address?.trim() || '',
      neighborhood: this.form.neighborhood?.trim() || '',
      agreementDescription: this.form.agreementDescription?.trim() || '',
      expeditionCedula: this.form.expeditionCedula
        ? new Date(this.form.expeditionCedula).toISOString()
        : null,
      phoneNumber: this.form.phoneNumber,
      email: this.form.email,
      userInfractionId: this.form.userInfractionId,
      paymentFrequencyId: Number(this.form.paymentFrequencyId),
      typePaymentId: Number(this.form.typePaymentId),
      installments: this.form.installments
    };

    delete payload.baseAmount;
    delete payload.monthlyFee;

    console.log("📤 Payload FINAL al backend:", payload);

    this.serviceGeneric.createPaymentAgreement(payload).subscribe({
      next: (res) => {
        this.form.baseAmount = res.agreement.baseAmount;
        this.form.monthlyFee = res.agreement.monthlyFee;
        this.form.installments = res.agreement.installments;
        this.agreementStart = res.agreement.agreementStart;
        this.agreementEnd = res.agreement.agreementEnd;

        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '✅ Acuerdo creado con éxito. Se abrirá el comprobante en PDF.',
          confirmButtonColor: '#006400'
        });

        if (res.pdfUrl) {
          const link = document.createElement('a');
          link.href = res.pdfUrl;
          link.download = `AcuerdoPago_${res.agreement.id}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        this.step = 3;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || '❌ Error inesperado al crear el acuerdo',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  goHome() {
    this.router.navigate(['/home/contenido']);
  }

  onMonthlyFeeChange(value: any) {
    const rawValue = String(value).replace(/\D/g, '');
    this.form.monthlyFee = rawValue ? Number(rawValue) : 0;
  }

  getToday(): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  }
}
