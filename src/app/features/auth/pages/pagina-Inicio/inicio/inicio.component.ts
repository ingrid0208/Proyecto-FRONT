import { Component, ViewChildren, QueryList, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { StepCardComponent } from '../../../../../shared/components/step-card/step-card.component';
import { StepCard } from '../../../../../shared/models/StepCard';

// ⬇️ usa tu servicio genérico
import { ServiceGenericService } from '../../../../../core/services/utils/generic/service-generic.service';
import { TypeInfractionSelectDto } from '../../../../../shared/models/entities/TypeInfractionSelectDto';

interface SubItem { title: string; text: string; }
interface Category { title: string; items: SubItem[]; }

interface CarouselImage {
  src: string;
  alt: string;
  description: string;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, StepCardComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private router: Router,
    private api: ServiceGenericService,   // ⬅️ tu servicio genérico
    private elementRef: ElementRef
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
      src: 'https://www.segurilatam.com/wp-content/uploads/sites/5/2021/07/policia-nacional-colombia-uniforme-azul.jpg',
      alt: 'Policía de Tránsito Colombia',
      description: 'Agentes de Policía Nacional de Colombia controlando el tránsito vehicular y garantizando la seguridad vial.'
    },
    {
      src: 'https://caracoltv.brightspotcdn.com/dims4/default/98e91b0/2147483647/strip/true/crop/1280x720+0+0/resize/1000x563!/quality/75/?url=http:%2F%2Fcaracol-brightspot.s3.us-west-2.amazonaws.com%2F3e%2Ff8%2F0eb9283c444ab6a1160f53938fe8%2Fcomparendos-y-multas-de-transito-1.jpg',
      alt: 'Policía Nacional Colombia',
      description: 'Oficiales de la Policía Nacional de Colombia en patrullaje comunitario manteniendo el orden público.'
    },
  ];

  steps: StepCard[] = [
    { number: '01', icon: 'edit_note', title: 'Ingresa tus datos', description: 'Completa el formulario con tu tipo y número de documento de identidad' },
    { number: '02', icon: 'search', title: 'Consulta de multas', description: 'El sistema busca automáticamente todas tus infracciones y comparendos' },
    { number: '03', icon: 'assignment', title: 'Revisa los detalles', description: 'Consulta fecha, lugar, tipo de infracción, valor y estado de cada multa' },
  ];

  stats: StatItem[] = [
    { value: 15420, suffix: '+', label: 'Multas procesadas', icon: 'description' },
    { value: 98, suffix: '%', label: 'Satisfacción usuarios', icon: 'thumb_up' },
    { value: 847, suffix: '', label: 'Consultas diarias', icon: 'trending_up' },
    { value: 24, suffix: '/7', label: 'Disponibilidad', icon: 'schedule' }
  ];

  ngOnInit(): void {
    this.loadTypeInfractions();
    this.startCarousel();
  }

  ngAfterViewInit(): void {
    // Configurar Intersection Observer para animar contadores cuando estén visibles
    this.setupStatsAnimation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private setupStatsAnimation(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = this.elementRef.nativeElement.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  private animateStats(): void {
    const statNumbers = this.elementRef.nativeElement.querySelectorAll('.stat-number');

    statNumbers.forEach((element: HTMLElement, index: number) => {
      const target = parseInt(element.getAttribute('data-target') || '0');
      const duration = 2000; // 2 segundos
      const startTime = performance.now() + (index * 100); // Stagger animation

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress > 0) {
          // Easing function for smooth animation
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * easeOut);
          element.textContent = current.toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
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
