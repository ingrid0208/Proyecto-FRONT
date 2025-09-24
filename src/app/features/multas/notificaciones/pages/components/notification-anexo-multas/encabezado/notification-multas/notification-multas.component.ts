import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';
import { CardMultasComponent } from '../../contenido/card-multas/card-multas.component';
import { ServiceGenericService } from '../../../../../../../../core/services/utils/generic/service-generic.service';
import { UserInfractionSelectDto } from '../../../../../../../../shared/Models/Entities/select/UserInfractionSelectDto';

@Component({
  selector: 'app-notification-multas',
  standalone: true,
  imports: [CommonModule, CardMultasComponent],
  templateUrl: './notification-multas.component.html',
  styleUrls: ['./notification-multas.component.scss']
})
export class NotificationMultasComponent implements OnInit {

  multas: UserInfractionSelectDto[] = [];
  cargando = false;

  constructor(
    private serviceGeneric: ServiceGenericService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMultas();
  }

  cargarMultas(): void {
    this.cargando = true;

    this.serviceGeneric.getAll<UserInfractionSelectDto>('UserInfraction')
      .subscribe({
        next: (data) => {
          this.multas = data;
          this.cargando = false;
          this.cdr.detectChanges();
          console.log('✅ Multas cargadas:', this.multas);
        },
        error: (err) => {
          this.cargando = false;
          console.error('❌ Error al cargar multas:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar las notificaciones de multas.',
            confirmButtonColor: '#d33'
          });
        }
      });
  }
}
