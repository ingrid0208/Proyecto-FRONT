import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AcuerdoPago } from '../../../../shared/Models/acuerdo-pago.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppTopbar } from '../../../topbar/topbar.component';


@Component({
  selector: 'app-formulario-acuerdo-pago',
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,MatSelectModule,MatDatepickerModule,
  MatNativeDateModule,MatButtonModule,CommonModule, FormsModule,AppTopbar],
  templateUrl: './formulario-acuerdo-pago.component.html',
  styleUrl: './formulario-acuerdo-pago.component.scss'
})
export class FormularioAcuerdoPagoComponent {
   form: AcuerdoPago = {
    nombre: '',
    apellido: '',
    documento: '',
    tipoDocumento: '',
    expedidoEn: '',
    telefono: '',
    direccion: '',
    correo: '',
    inicioAcuerdo: '',
    finAcuerdo: '',
    fechaInfraccion: '',
    infraccion: '',
    tipoMulta: '',
    valorSMDLV: 0,
    estadoPago: '',
    infoInfraccion: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Formulario enviado:', this.form);
  }

   onClickGenerar() {
    this.router.navigate(['/uikit/generate-agreement']);
  }
  
}
