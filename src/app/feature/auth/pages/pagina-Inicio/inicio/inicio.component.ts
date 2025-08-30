import { Component, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

// Tus componentes
import { Identificacion } from '../../identificacion/Identificacion';
import { StepCardComponent } from '../../../../../shared/components/step-card/step-card.component';
import { StepCard } from '../../../../../shared/Models/StepCard';

interface SubItem { title: string; text: string; }
interface Category { title: string; items: SubItem[]; }

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, Identificacion, StepCardComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  constructor(private router: Router) {}

  @ViewChildren('subAcc') subAccordions!: QueryList<MatAccordion>;

  categories: Category[] = [
    {
      title: 'Multas de Tipo Uno',
      items: [
        { title: 'Infracciones de Tránsito Menores', text: 'Incluye infracciones como estacionamiento indebido, no usar cinturón de seguridad, exceso de velocidad menor a 20 km/h sobre el límite permitido.' },
        { title: 'Documentación Vehicular', text: 'Multas por no portar documentos obligatorios del vehículo, licencia de conducir vencida, SOAT vencido.' },
        { title: 'Señalización Vial', text: 'Infracciones por no respetar semáforos, señales de pare, no ceder el paso en intersecciones.' },
      ],
    },
    {
      title: 'Multas de Tipo Dos',
      items: [
        { title: 'Exceso de Velocidad Moderado', text: 'Exceder el límite entre 20-40 km/h, conducir en carriles exclusivos sin autorización.' },
        { title: 'Maniobras Peligrosas', text: 'Adelantamientos indebidos, cambios de carril sin señalización, no mantener distancia de seguridad.' },
        { title: 'Uso de Dispositivos', text: 'Usar celular mientras conduce, no usar manos libres, distracciones al volante.' },
      ],
    },
    {
      title: 'Multas de Tipo Tres',
      items: [
        { title: 'Exceso de Velocidad Grave', text: 'Exceder el límite en más de 40 km/h, competencias ilegales en vía pública.' },
        { title: 'Conducción Bajo Influencia', text: 'Alcohol, SPA, negarse a pruebas de alcoholemia.' },
        { title: 'Infracciones Graves de Tránsito', text: 'Conducir sin licencia, transportar pasajeros sin autorización, evadir controles.' },
      ],
    },
    {
      title: 'Multas de Tipo Cuatro',
      items: [
        { title: 'Infracciones Muy Graves', text: 'Vehículo sin matrícula, alterar placas, vehículo reportado como hurtado.' },
        { title: 'Transporte Ilegal', text: 'Prestar servicio público sin autorización, alterar taxímetros, cobrar tarifas no autorizadas.' },
        { title: 'Daños a la Infraestructura', text: 'Daños a señalizaciones, semáforos, obstaculización de vías públicas.' },
      ],
    },
  ];

  steps: StepCard[] = [
    { number: '01', icon: 'edit_note', title: 'Ingresa tus datos', description: 'Completa el formulario con tu tipo y número de documento' },
    { number: '02', icon: 'search', title: 'Consulta instantánea', description: 'Nuestro sistema busca todas tus infracciones en tiempo real' },
    { number: '03', icon: 'assignment', title: 'Revisa los detalles', description: 'Ve fecha, lugar, valor y estado de cada multa' },
  ];

  /**
   * Cada vez que se abre un padre, cierro TODOS los sub-acordeones
   * para que empiecen en estado "cerrado".
   */
  onParentOpened(index: number): void {
    const arr = this.subAccordions?.toArray() ?? [];
    // Cierra todos los sub-acordeones
    arr.forEach(acc => acc.closeAll());
    // Asegura que el sub-acordeón del panel recién abierto también arranque cerrado
    arr[index]?.closeAll();
  }

  onLogin(e?: Event): void {
    e?.preventDefault();
    this.router.navigate(['/auth/login']);
  }
}
