import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';
import { ServiceGenericService } from '../../../../core/services/utils/generic/service-generic.service';

@Component({
  selector: 'app-anexar-multas',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, InputTextModule, ButtonModule],
  templateUrl: './anexar-multas.component.html',
  styleUrls: ['./anexar-multas.component.scss']
})
export class AnexarMultasComponent implements OnInit {

  form = {
    firstName: '',
    lastName: '',
    documentTypeId: null as number | null,
    documentNumber: '',
    typeInfractionId: null as number | null,
    smldvCount: null as number | null,
    email : ''
  };

  documentTypes: { label: string; value: number }[] = [];
  infractionTypes: { label: string; value: number; smldv: number }[] = [];

  constructor(private router: Router, private api: ServiceGenericService) { }

  ngOnInit() {
    this.loadDocumentTypes();
    this.loadTypeInfractions();
  }

  // 🔹 Cargar tipos de documentos
  loadDocumentTypes() {
    this.api.getAll<any>('documentType').subscribe({
      next: (resp) => {
        this.documentTypes = (resp ?? []).map(d => ({
          value: d.id,
          label: d.abbreviation ? `${d.name} (${d.abbreviation})` : d.name
        }));
      },
      error: (err) => {
        console.error('❌ Error cargando tipos de documentos:', err);
        Swal.fire('Error', 'No se pudieron cargar los tipos de documento', 'error');
      }
    });
  }

  // 🔹 Cargar tipos de infracciones
  loadTypeInfractions() {
    this.api.getAll<any>('TypeInfraction').subscribe({
      next: (resp) => {
        this.infractionTypes = (resp ?? []).map(i => ({
          value: i.id,
          label: `${i.description} (${i.numer_smldv} smdlv)`,
          smldv: i.numer_smldv
        }));
      },
      error: (err) => {
        console.error('❌ Error cargando tipos de infracción:', err);
        Swal.fire('Error', 'No se pudieron cargar los tipos de multa', 'error');
      }
    });
  }

  // 🔹 Autollenar smldv al seleccionar infracción
  onInfractionChange(id: number) {
    const selected = this.infractionTypes.find(x => x.value === id);
    if (selected) {
      this.form.smldvCount = selected.smldv;
    }
  }

  // 🔹 Guardar infracción
  saveInfraction() {
    const payload = {
      ...this.form,
      documentTypeId: Number(this.form.documentTypeId),
      typeInfractionId: Number(this.form.typeInfractionId),
      smldvCount: Number(this.form.smldvCount)
    };

    this.api.createInfraction(payload).subscribe({
      next: (resp: any) => {
        if (resp?.isSuccess) {
          Swal.fire('✅', resp.message || 'Multa registrada exitosamente', 'success');

          // 🚀 Si hay PDF, lo abrimos en nueva pestaña
          if (resp.pdfUrl) {
            const link = document.createElement('a');
            link.href = resp.pdfUrl;
            link.download = `Multa_${resp.data.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }


          this.resetForm();
        } else {
          Swal.fire('⚠️', resp?.message || 'No se pudo registrar la multa', 'warning');
        }
      },
      error: async (err) => {
        console.error('❌ Error al crear multa:', err);

        if (err.error?.errors) {
          const errores = Object.entries(err.error.errors);
          const [campo, listaMensajes] = errores[0];
          const mensaje = (listaMensajes as string[])[0];

          await Swal.fire({
            icon: 'warning',
            title: 'Validación',
            text: `⚠️ ${mensaje}`,
            confirmButtonColor: '#d33'
          });
        } else {
          Swal.fire('❌', err.error?.message || 'Error interno del servidor', 'error');
        }
      }
    });
  }

  resetForm() {
    this.form = {
      firstName: '',
      lastName: '',
      email: '',
      documentTypeId: null as number | null,
      documentNumber: '',
      typeInfractionId: null as number | null,
      smldvCount: null as number | null
    };

  }
}
