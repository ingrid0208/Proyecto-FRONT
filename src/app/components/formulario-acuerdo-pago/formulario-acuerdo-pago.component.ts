import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AcuerdoPago } from '../../Models/acuerdo-pago.model';

@Component({
  selector: 'app-formulario-acuerdo-pago',
  imports: [CommonModule, FormsModule],
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

  
  onSubmit() {
    console.log('Formulario enviado:', this.form);
  }
}
