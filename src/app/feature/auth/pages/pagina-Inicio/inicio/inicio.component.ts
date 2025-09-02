import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { Identificacion } from '../../identificacion/Identificacion';
import { StepCardComponent } from '../../../../../shared/components/step-card/step-card.component';
import { StepCard } from '../../../../../shared/Models/StepCard';

// ⬇️ usa tu servicio genérico
import { ServiceGenericService } from '../../../../../core/services/servicesGeneric/service-generic.service';
import { TypeInfractionSelectDto } from '../../../../../shared/Models/Entities/TypeInfractionSelectDto';

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

    // ⬇️ consumo directo del genérico
    this.api.getAll<TypeInfractionSelectDto>('TypeInfraction').subscribe({
      next: (items) => {
        const groups = new Map<string, SubItem[]>();

        for (const t of (items ?? [])) {
          const groupKey = (t.type_Infraction || 'Otros').trim();

          const list = groups.get(groupKey) ?? [];
          list.push({
            title: `${t.numer_smldv} SMLDV`,
            text: t.description || ''
          });
          groups.set(groupKey, list);
        }

        // (Opcional) Ordena las categorías por número de tipo si sigue el patrón "Multas de Tipo X"
        // this.categories = this.sortCategories(Array.from(groups.entries()));
        this.categories = Array.from(groups.entries()).map(([title, items]) => ({ title, items }));

        this.loadingTypes = false;
      },
      error: (err) => {
        this.loadError = err?.error?.message || 'No fue posible cargar los tipos de infracción.';
        this.loadingTypes = false;
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
