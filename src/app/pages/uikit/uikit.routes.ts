import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FormularioAcuerdo } from './formularioAcuerdoPago';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';
import { TiposMultasComponent } from '../../components/tipos-multas/tipos-multas.component';
import { InputDemo } from './inputdemo';

const routes: Routes = [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemo },
    { path: 'TipoMultas', data: { breadcrumb: 'Tipos de multas' }, component: TiposMultasComponent },
    { path: 'AcuerdoPago', data: { breadcrumb: 'acuerdo de pago' }, component: FormularioAcuerdo },
    { path: 'list', data: { breadcrumb: 'List' }, component: ListDemo },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemo },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDemo },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemo },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: 'inputdemo', data: { breadcrumb: 'Identificación ciudadana' }, component: InputDemo },

    // ✅ Mueve esta ruta arriba del wildcard
    {
      path: 'acuerdo-pago',
      loadComponent: () =>
        import('./payment-agreement').then(m => m.PaymentAgreementComponent)
    },
    {
      path: 'generar-acuerdo',
      loadComponent: () =>
        import('./generate-agreement').then(m => m.GenerateAgreementComponent)
    },
    {
      path: 'acuerdo-exitoso',
      loadComponent: () =>
        import('./agreement-success').then(m => m.AgreementSuccessComponent)
    },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UikitRoutesModule {}





