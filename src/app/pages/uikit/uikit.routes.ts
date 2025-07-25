import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FormLayoutDemo } from './formlayoutdemo';
import { InputDemo } from './inputdemo';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';

export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemo },
    { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, component: FormLayoutDemo },
    { path: 'input', data: { breadcrumb: 'Input' }, component: InputDemo },
    { path: 'list', data: { breadcrumb: 'List' }, component: ListDemo },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemo },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDemo },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemo },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },

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

    
] as Routes;


    


