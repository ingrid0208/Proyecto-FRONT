import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ServiceGenericService } from '../../../../../core/services/utils/generic/service-generic.service';
import { AcuerdoPago } from '../../../../../shared/models/entities/acuerdo-pago.model';
import { PaymentAgreementInitDto } from '../../../../../shared/models/PaymentAgreementInitDto';

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
  ],
  templateUrl: './formulario-acuerdo-pago.component.html',
  styleUrls: ['./formulario-acuerdo-pago.component.scss'],
})
export class FormularioAcuerdoPagoComponent implements OnInit {
  form: AcuerdoPago = {
    address: '',
    neighborhood: '',
    agreementDescription: '',
    expeditionCedula: '',
    phoneNumber: '',
    email: '',
    agreementStart: '',
    agreementEnd: '',
    baseAmount: 0,
    isPaid: false,
    userInfractionId: 0,
    paymentFrequencyId: 0,
    typePaymentId: 0,
  };

  initData: PaymentAgreementInitDto = {
    personName: '',
    documentNumber: '',
    documentType: '',
    infringement: '',
    typeFine: '',
    valorSMDLV: 0,
    infractionId: 0,
    userId: 0,
  };

  paymentFrequencies: any[] = [];
  typePayments: any[] = [];

  constructor(
    private serviceGeneric: ServiceGenericService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const st: any = nav?.extras?.state ?? history.state;

    console.log('Estado recibido en formulario:', st);

    if (st?.userId && st?.infractionId) {
      this.form.userInfractionId = st.infractionId;

      this.serviceGeneric
        .getInitData(st.userId, st.infractionId)
        .subscribe({
          next: (data: PaymentAgreementInitDto | PaymentAgreementInitDto[]) => {
            console.log('InitData cargada desde el back:', data);

            if (Array.isArray(data)) {
              this.initData = data.find(x => x.infractionId === st.infractionId) ?? data[0];
            } else {
              this.initData = data;
            }

            // Precargar form con valores reales
            this.form.userInfractionId = this.initData.infractionId;
            this.form.baseAmount = this.initData.valorSMDLV;
            this.form.expeditionCedula = this.initData.documentNumber;
            this.form.agreementDescription = this.initData.infringement;
            this.form.isPaid = false;
          },
          error: (err) => {
            console.error('Error al cargar datos iniciales:', err);
          },
        });
    }

    // Cargar catálogos
    this.serviceGeneric
      .getAll<any>('PaymentFrequency')
      .subscribe((data) => (this.paymentFrequencies = data));

    this.serviceGeneric
      .getAll<any>('TypePayment')
      .subscribe((data) => (this.typePayments = data));
  }

  onSubmit() {
    const payload = {
      ...this.form,
      // 🚀 nos aseguramos de que barrio no se vaya vacío
      neighborhood: this.form.neighborhood?.trim() || 'No especificado',
      paymentFrequencyId: Number(this.form.paymentFrequencyId),
      typePaymentId: Number(this.form.typePaymentId),
      agreementStart: this.form.agreementStart
        ? new Date(this.form.agreementStart).toISOString()
        : null,
      agreementEnd: this.form.agreementEnd
        ? new Date(this.form.agreementEnd).toISOString()
        : null,
      baseAmount: this.initData.valorSMDLV
        ? this.initData.valorSMDLV * 103448 // convertir SMDLV a pesos
        : 0
    };

    console.log('Payload final a enviar:', payload);

    this.serviceGeneric
      .create<any>('PaymentAgreement', payload)
      .subscribe({
        next: (res) => {
          console.log('Acuerdo creado:', res);
          alert('✅ Acuerdo de pago creado con éxito');
          this.router.navigate(['/uikit/list-agreements']);
        },
        error: (err) => {
          console.error('❌ Error al crear acuerdo:', err.error?.errors || err);
          alert('Error al crear acuerdo');
        }
      });
  }
}
