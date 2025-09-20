import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

import { RecaptchaService } from '../../../../core/services/recaptcha.service';
import { ServiceGenericService } from '../../../../core/services/servicesGeneric/service-generic.service';
import { LoginDocumentoRequest } from '../../../../shared/Models/LoginDocumentoRequest';
import { SessionPingService } from '../../../../core/services/session-ping.service';
import { DocumentTypeDto } from '../../../../shared/Models/parameter/document-type.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-identification',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, ButtonModule],
  template: `
  <div [ngClass]="layout === 'embedded' ? 'block pt-0' : 'flex justify-center items-center pt-40'">
    <div [ngClass]="layout === 'embedded' ? 'bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md md:max-w-lg' : 'bg-white p-12 rounded-xl shadow-lg w-full max-w-2xl'">
      <h2 class="text-center text-3xl font-semibold mb-8 text-gray-800">Identificación ciudadana</h2>

      <div class="mb-6">
        <label class="block mb-3 font-medium text-lg text-gray-700">Tipo de documento</label>
        <div *ngIf="docTypesLoading" class="text-gray-600 mb-2">Cargando tipos...</div>
        <div *ngIf="!docTypesLoading && docTypesError" class="text-red-600 mb-2">{{ docTypesError }}</div>
        <p-dropdown
          [options]="documentTypes"
          [(ngModel)]="selectedDocType"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecciona"
          class="w-full text-lg"
          [disabled]="docTypesLoading || isSubmitting">
        </p-dropdown>
      </div>

      <div class="mb-6">
        <label class="block mb-3 font-medium text-lg text-gray-700">Número de documento</label>
        <input pInputText type="text" [(ngModel)]="documentNumber" placeholder="Ingresa tu número" class="w-full text-lg p-3" [disabled]="isSubmitting"/>
      </div>

      <button
        pButton
        type="button"
        [label]="isSubmitting ? 'Validando...' : 'Consultar Multas'"
        class="w-full bg-green-700 border-none hover:bg-green-800 text-lg py-4"
        [disabled]="isSubmitting"
        (click)="onSubmit()">
      </button>

      <small>
        Este sitio está protegido por reCAPTCHA y aplican la
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Política de privacidad</a>
        y los
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Términos de servicio</a> de Google.
      </small>
    </div>
  </div>
  `
})
export class Identificacion implements OnInit {
  @Input() layout: 'standalone' | 'embedded' = 'standalone';
  @Input() redirectTo: string = '/contenido-documento/document';
  @Output() loginSuccess = new EventEmitter<void>();

  constructor(
    private router: Router,
    private recaptcha: RecaptchaService,
    private auth: ServiceGenericService,
    private sessionPing: SessionPingService,
    private api: ServiceGenericService
  ) {}

  documentTypes: { label: string; value: number }[] = [];
  selectedDocType?: number;
  documentNumber = '';
  isSubmitting = false;

  docTypesLoading = false;
  docTypesError = '';

  ngOnInit(): void {
    this.loadDocumentTypes();
  }

  private loadDocumentTypes(): void {
    this.docTypesLoading = true;
    this.api.getAll<DocumentTypeDto>('documentType').subscribe({
      next: (items) => {
        this.documentTypes = (items ?? []).map(d => ({
          value: d.id,
          label: d.abbreviation ? `${d.name} (${d.abbreviation})` : d.name
        }));
        this.docTypesLoading = false;
      },
      error: async (err) => {
        const payload = await this.normalizeErrorPayload(err);
        this.docTypesError = payload?.message || 'No fue posible cargar los tipos de documento.';
        await this.showError(this.docTypesError);
        this.docTypesLoading = false;
      }
    });
  }

  async onSubmit() {
    this.isSubmitting = true;
    try {
      // Validaciones básicas en el frontend
      if (!this.selectedDocType || !this.documentNumber?.trim()) {
        await this.showError('Por favor selecciona el tipo de documento e ingresa el número.');
        return;
      }

      // Obtener token de recaptcha
      const action = 'documento';
      const recaptchaToken = await this.recaptcha.getToken(action);

      // 1) Consultar multas directamente (sin login previo)
      const r = await this.auth.getMultasByDocument(this.selectedDocType!, this.documentNumber!.trim()).toPromise();
      const data = r?.data ?? [];
      if (!data.length) {
        await this.showInfo('Este usuario no tiene multas registradas.', 'Sin resultados');
        return;
      }

      // 2) Mapear a la interfaz de la tabla
      const multas = data.map((x: any) => ({
        tipo:        x.typeInfractionName ?? '—',
        fecha:       x.dateInfraction ?? '',
        descripcion: x.observations ?? '',
        estado:      mapEstadoFromBool(x.stateInfraction)
      }));

      const first = data[0];
      const ciudadano = [first?.firstName, first?.lastName].filter(Boolean).join(' ');

      // 3) Guardar datos para referencia futura
      sessionStorage.setItem('docTypeId', String(this.selectedDocType));
      sessionStorage.setItem('docNumber', this.documentNumber.trim());

      // 4) Iniciar ping de sesión (idle)
      this.sessionPing.start(60000);

      // 5) Navegar con state
      if (this.redirectTo) {
        this.router.navigateByUrl(this.redirectTo, { state: { multas, ciudadano } });
      }
      this.loginSuccess.emit();

    } catch (err: any) {
      // === Aquí mostramos SOLO el primer error de las validaciones del back ===
      const payload = await this.normalizeErrorPayload(err);
      const firstMsg = this.pickFirstFluentError(payload)
        ?? payload?.message
        ?? 'Error en la solicitud.';
      await this.showError(firstMsg);
    } finally {
      this.isSubmitting = false;
    }
  }

  // =========================
  // SweetAlert2 helpers
  // =========================
  private async showInfo(text: string, title = 'Aviso') {
    await Swal.fire({ icon: 'info', title, text, confirmButtonText: 'Ok' });
  }
  private async showError(text: string, title = 'Error') {
    await Swal.fire({ icon: 'error', title, text, confirmButtonText: 'Entendido' });
  }

  /**
   * Devuelve SOLO el primer error de FluentValidation (errors:{campo:[msg,...]}).
   * Prioriza campos del DocumentLoginDto: DocumentTypeId, DocumentNumber, RecaptchaToken, RecaptchaAction.
   */
  private pickFirstFluentError(payload: any): string | null {
    const errors = payload?.errors;
    if (!errors) return null;

    const order = ['DocumentTypeId', 'DocumentNumber', 'RecaptchaToken', 'RecaptchaAction'];
    for (const f of order) {
      const list = errors[f];
      if (Array.isArray(list) && list.length) return list[0];
    }
    for (const k of Object.keys(errors)) {
      const list = errors[k];
      if (Array.isArray(list) && list.length) return list[0];
    }
    return null;
  }

  /**
   * Normaliza el error si vino como Blob (text/html) o string en vez de JSON.
   * Si no es parseable, devuelve {} para evitar romper el flujo.
   */
  private async normalizeErrorPayload(err: any): Promise<any> {
    if (err?.error instanceof Blob) {
      try { return JSON.parse(await err.error.text()); } catch { return {}; }
    }
    if (typeof err?.error === 'string') {
      try { return JSON.parse(err.error); } catch { return {}; }
    }
    return err?.error ?? {};
  }
}

function mapEstadoFromBool(v: boolean | null | undefined): 'Pendiente' | 'Pagada' | 'Vencida' {
  if (v === true) return 'Pagada';
  if (v === false) return 'Pendiente';
  return 'Pendiente';
}
