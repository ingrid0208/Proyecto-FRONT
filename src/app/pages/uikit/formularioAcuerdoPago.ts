import { Component } from '@angular/core';
import { CountryService } from '../service/country.service';
import { NodeService } from '../service/node.service';
import { FormularioAcuerdoPagoComponent } from '../../components/formulario-acuerdo-pago/formulario-acuerdo-pago.component';

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
