import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { Identificacion } from '../../identificacion/Identificacion';
import { StepCardComponent } from '../../../../../shared/components/step-card/step-card.component';

// ⬇️ usa tu servicio genérico
import { ServiceGenericService } from '../../../../../core/services/utils/generic/service-generic.service';
import { TypeInfraction } from '../../../../../shared/Models/Entities/TypeInfractionDto';
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
export class InicioComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ServiceGenericService   // ⬅️ tu servicio genérico
  ) {}

  @ViewChildren('subAcc') subAccordions!: QueryList<MatAccordion>;

  // estado UI
  loadingTypes = false;
  loadError = '';

  // datos renderizados
  categories: Category[] = [];

  steps: StepCard[] = [
    { number: '01', icon: 'edit_note', title: 'Ingresa tus datos', description: 'Completa el formulario con tu tipo y número de documento' },
    { number: '02', icon: 'search', title: 'Consulta instantánea', description: 'Nuestro sistema busca todas tus infracciones en tiempo real' },
    { number: '03', icon: 'assignment', title: 'Revisa los detalles', description: 'Ve fecha, lugar, valor y estado de cada multa' },
  ];

  ngOnInit(): void {
    this.loadTypeInfractions();
  }

  private loadTypeInfractions(): void {
  this.loadingTypes = true;
  this.loadError = '';

  this.api.getAll<TypeInfraction>('Infraction').subscribe({
    next: (items) => {
      this.loadingTypes = false;

      // Mapear cada tipo de infracción a un Category para el acordeón
      this.categories = items.map(i => ({
        title: i.typeInfractionName,
        items: [{ title: `Valor SMLDV: ${i.numer_smldv}`, text: i.description }]
      }));
    },
    error: (err) => {
      this.loadingTypes = false;
      if (err.status === 0) {
        this.loadError = 'El servidor no está disponible en este momento. Intenta más tarde.';
      } else {
        this.loadError = err?.error?.message || 'No fue posible cargar los tipos de infracción.';
      }
    }
  });
}


  onParentOpened(index: number): void {
    const arr = this.subAccordions?.toArray() ?? [];
    arr.forEach(acc => acc.closeAll());
    arr[index]?.closeAll();
  }

  onLogin(e?: Event): void {
    e?.preventDefault();
    this.router.navigate(['/auth/login']);
  }
}