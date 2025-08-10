import { Routes } from '@angular/router';
import { ButtonDemo } from './buttondemo';
import { ChartDemo } from './chartdemo';
import { FormularioAcuerdo } from './formularioAcuerdoPago';
import { ListDemo } from './listdemo';
import { MediaDemo } from './mediademo';
import { PanelsDemo } from './panelsdemo';
import { TimelineDemo } from './timelinedemo';
import { TableDemo } from './tabledemo';
import { TiposMultasComponent } from '../../components/tipos-multas/tipos-multas.component';
import { NotificacionComponent } from '../../components/NotificacionMultas/encabezado/notificacion/notificacion.component';


export default [
    { path: 'button', data: { breadcrumb: 'Button' }, component: ButtonDemo },
    { path: 'charts', data: { breadcrumb: 'Charts' }, component: ChartDemo },
    { path: 'TipoMultas', data: { breadcrumb: 'Tipos de multas' }, component: TiposMultasComponent },
    { path: 'AcuerdoPago', data: { breadcrumb: 'acuerdo de pago' }, component: FormularioAcuerdo },
     { path: 'NotificacionMultas', data: { breadcrumb: 'Notificación de multas' }, component: NotificacionComponent },
    { path: 'media', data: { breadcrumb: 'Media' }, component: MediaDemo },
    { path: 'panel', data: { breadcrumb: 'Panel' }, component: PanelsDemo },
    { path: 'timeline', data: { breadcrumb: 'Timeline' }, component: TimelineDemo },
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: '**', redirectTo: '/notfound' },
    

] as Routes;
