import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultaCardComponent } from '../../contenido/multa-card/multa-card.component';
import Swal from 'sweetalert2';
import { PaymentAgreementSelectDto } from '../../../../../../../shared/Models/Entities/select/PaymentAgreementSelectDto';
import { ServiceGenericService } from '../../../../../../../core/services/utils/generic/service-generic.service';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule, MultaCardComponent],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  usuario = {
    nombre: 'Camilo Andres Ramirez',
    cc: '12345678',
    acuerdosPago: 1,
    nuevasNotificaciones: 3
  };

  agreements: PaymentAgreementSelectDto[] = [];   // 👈 ahora es PaymentAgreementSelectDto[]

  cargando: boolean = false;

  constructor(
    private serviceGeneric: ServiceGenericService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarAgreements();
  }

  cargarAgreements(): void {
    this.cargando = true;

    this.serviceGeneric.getAll<PaymentAgreementSelectDto>('PaymentAgreement')
      .subscribe({
        next: (data) => {
          this.agreements = data;
          this.cargando = false;
          this.cdr.detectChanges();
          console.log('✅ Acuerdos cargados:', this.agreements);
        },
        error: (err) => {
          this.cargando = false;
          console.error('❌ Error al cargar acuerdos:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las notificaciones de acuerdos de pago.',
            confirmButtonColor: '#d33'
          });
        }
      });
  }
}
