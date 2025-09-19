import { Component, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
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

interface CarouselImage {
  src: string;
  alt: string;
  description: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, Identificacion, StepCardComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy {
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

  // Carrusel
  currentImageIndex: number = 0;
  private intervalId: any;
  
  carouselImages: CarouselImage[] = [
    {
      src: 'assets/demo/multa-transito.svg',
      alt: 'Normas de Tránsito',
      description: 'Infracciones de tránsito: exceso de velocidad, no respetar señales, estacionamiento indebido y más.'
    },
    {
      src: 'assets/demo/multa-convivencia.svg',
      alt: 'Convivencia Ciudadana',
      description: 'Multas por alteración del orden público, ruido excesivo, consumo de alcohol en espacios públicos.'
    },
    {
      src: 'assets/demo/multa-comercio.svg',
      alt: 'Comercio y Espacio Público',
      description: 'Sanciones por comercio no autorizado, ocupación indebida del espacio público y permisos.'
    }
  ];

  steps: StepCard[] = [
    { number: '01', icon: 'edit_note', title: 'Ingresa tus datos', description: 'Completa el formulario con tu tipo y número de documento de identidad' },
    { number: '02', icon: 'search', title: 'Consulta de multas', description: 'El sistema busca automáticamente todas tus infracciones y comparendos' },
    { number: '03', icon: 'assignment', title: 'Revisa los detalles', description: 'Consulta fecha, lugar, tipo de infracción, valor y estado de cada multa' },
  ];

  ngOnInit(): void {
    this.loadTypeInfractions();
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Métodos del carrusel
  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000); // Cambia cada 5 segundos
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
  }

  previousImage(): void {
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.carouselImages.length - 1 
      : this.currentImageIndex - 1;
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex = index;
    
    // Reiniciar el interval cuando el usuario selecciona manualmente
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.startCarousel();
    }
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
