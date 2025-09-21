import { Component } from '@angular/core';
import { CountryService } from '../../../../../core/services/api/country.service';
import { NodeService } from '../../../../../core/services/node.service';
import { FormularioAcuerdoPagoComponent } from '../../../../multas/acuerdos-pago/pages/formulario-acuerdo-pago/formulario-acuerdo-pago.component';
// 👇 Importa el componente del formulario

@Component({
  selector: 'app-input-demo',
  standalone: true,
  imports: [
    FormularioAcuerdoPagoComponent
  ],
  template: `
    <div class="input-demo-wrapper">
     <app-formulario-acuerdo-pago/>
    </div>
  `,
  providers: [CountryService, NodeService]
})
export class FormularioAcuerdo { }
