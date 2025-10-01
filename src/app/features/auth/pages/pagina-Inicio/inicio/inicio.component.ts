import { Component, ViewChildren, QueryList, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { StepCardComponent } from '../../../../../shared/components/step-card/step-card.component';
import { StepCard } from '../../../../../shared/Models/StepCard';

// ⬇️ usa tu servicio genérico
import { ServiceGenericService } from '../../../../../core/services/utils/generic/service-generic.service';
import { UserInfractionService, UserInfractionDto } from '../../../../../core/services/api/user-infraction.service';
import { TypeInfractionSelectDto } from '../../../../../shared/Models/Entities/TypeInfractionSelectDto'

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
  imports: [CommonModule, ReactiveFormsModule, MatExpansionModule, MatIconModule, StepCardComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit, OnDestroy, AfterViewInit {
  idForm!: FormGroup;
  documentTypes = [
    { value: 'cc', label: 'Cédula de ciudadanía' },
    { value: 'ti', label: 'Tarjeta de identidad' },
    { value: 'ce', label: 'Cédula de extranjería' },
  ];

  constructor(
    private router: Router,
    private api: ServiceGenericService,   // ⬅️ tu servicio genérico
    private elementRef: ElementRef,
    private fb: FormBuilder
  ,
    private userInfractionService: UserInfractionService
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
    this.buildForm();
  }

  private buildForm(): void {
    this.idForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.minLength(4)]],
    });
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

  onSubmit(): void {
    if (this.idForm.invalid) return;

    const payload = this.idForm.value;
    console.log('Consulta de multas para:', payload);

    // Llamar al servicio para buscar infracciones
    this.loadingInfractions = true;
    this.infractionsError = '';
    this.infractions = [];

    const typeId = payload.documentType;
    const number = payload.documentNumber;

    this.userInfractionService.getByDocument(typeId, number).subscribe({
      next: (items: UserInfractionDto[]) => {
        this.infractions = items || [];
        console.debug('InicioComponent: infracciones recibidas:', this.infractions);
        this.loadingInfractions = false;
        if (!this.infractions.length) {
          this.infractionsError = 'No se encontraron infracciones para los datos proporcionados.';
        } else {
          this.infractionsError = '';
          // Mostrar el modal con la primera infracción por defecto
          this.openInfractionModal(this.infractions[0]);
        }
      },
      error: (err) => {
        this.infractionsError = err?.message || 'No fue posible consultar las infracciones';
        this.loadingInfractions = false;
      }
    });
  }

  // Estado de resultados
  infractions: UserInfractionDto[] = [];
  loadingInfractions = false;
  infractionsError = '';

  // Modal state
  showInfractionModal = false;
  selectedInfraction: UserInfractionDto | null = null;

  openInfractionModal(infraction: UserInfractionDto) {
    this.selectedInfraction = infraction;
    console.debug('InicioComponent: abrir modal con infracción:', infraction);
    this.showInfractionModal = true;
  }

  // Helpers para leer campos con nombres variados que pueda devolver el backend
  private getFieldValue(keys: string[]): any {
    if (!this.selectedInfraction) return null;
    for (const k of keys) {
      const v = (this.selectedInfraction as any)[k];
      if (v !== undefined && v !== null && v !== '') return v;
    }
    return null;
  }

  displayDate(keys: string[]): string {
    const val = this.getFieldValue(keys);
    if (!val) return '-';
    try {
      const d = new Date(val);
      if (!isNaN(d.getTime())) return d.toLocaleDateString();
    } catch (e) {
      // ignore
    }
    return String(val);
  }

  displayCurrency(keys: string[]): string {
    const val = this.getFieldValue(keys);
    if (val === null || val === undefined || val === '') return '-';
    const num = Number(val);
    if (isNaN(num)) return String(val);
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(num);
  }

  displayText(keys: string[]): string {
    const val = this.getFieldValue(keys);
    if (val === null || val === undefined || val === '') return '-';
    return String(val);
  }

  // Devuelve array de { key, value } formateado para renderizar dinámicamente
  getInfractionEntries(): Array<{ key: string; value: string }> {
    if (!this.selectedInfraction) return [];
    const obj = this.selectedInfraction as any;
    const entries: Array<{ key: string; value: string }> = [];
    for (const k of Object.keys(obj)) {
      // Omitir campos que representan identificadores internos
      if (k.toLowerCase() === 'id') continue;
      let raw = obj[k];
      if (raw === null || raw === undefined) raw = '';

      // Formateos básicos
      if (typeof raw === 'number') {
        entries.push({ key: k, value: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(raw) });
        continue;
      }

      // Intentar parsear fecha ISO
      const asDate = new Date(raw);
      if (raw && !isNaN(asDate.getTime())) {
        entries.push({ key: k, value: asDate.toLocaleString() });
        continue;
      }

      entries.push({ key: k, value: String(raw) });
    }

    return entries;
  }

  // Construir nombre completo a partir de campos comunes
  getFullName(): string {
    if (!this.selectedInfraction) return '-';
    const obj: any = this.selectedInfraction;
    const first = obj.firstName ?? obj.first_name ?? obj.firstname ?? obj.irstName ?? obj.first ?? '';
    const last = obj.lastName ?? obj.last_name ?? obj.lastname ?? obj.last ?? '';
    const name = `${first || ''}`.trim();
    const surname = `${last || ''}`.trim();
    const full = `${name} ${surname}`.trim();
    return full || '-';
  }

  getTypeInfractionName(): string {
    if (!this.selectedInfraction) return '-';
    const obj: any = this.selectedInfraction;
    return (obj.typeInfractionName ?? obj.typeInfraction ?? obj.typeInfraction_name ?? obj.typeName ?? obj.typeName ?? obj.type ?? obj.type_infraction_name) || '-';
  }

  getObservations(): string {
    if (!this.selectedInfraction) return '-';
    const obj: any = this.selectedInfraction;
    return (obj.observations ?? obj.observation ?? obj.observacion ?? obj.observaciones ?? obj.details ?? obj.description) || '-';
  }

  closeInfractionModal() {
    this.showInfractionModal = false;
    this.selectedInfraction = null;
  }
}
