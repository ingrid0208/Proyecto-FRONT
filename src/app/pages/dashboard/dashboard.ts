import { Component } from "@angular/core";
import { ContenidoInicioComponent } from "../../components/contenido-inicio/contenido-inicio.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ContenidoInicioComponent],
  template: `
    <div class="dashboard-container">
      <app-contenido-inicio
        [multas]="misMultas"
        [botonTexto]="'Crear acuerdo'"
        (generarAcuerdo)="onCrearAcuerdo()">
      </app-contenido-inicio>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }
    }
  `]
})
export class Dashboard {
  // ✅ Propiedad requerida por [multas]
  misMultas = [
    {
      tipo: 'Tipo uno',
      fecha: new Date(2025, 1, 10),
      descripcion: 'Consumir bebidas alcohólicas o sustancias psicoactivas en lugares públicos.',
      costo: 95000
    },
    {
      tipo: 'Tipo dos',
      fecha: new Date(2025, 3, 12),
      descripcion: 'Perturbar la tranquilidad con ruido excesivo',
      costo: 190000
    },
    {
      tipo: 'Tipo tres',
      fecha: new Date(2025, 4, 30),
      descripcion: 'Portar armas, elementos cortopunzantes o sustancias peligrosas sin permiso.',
      costo: 380000
    }
  ];

  // ✅ Método requerido por (generarAcuerdo)
  onCrearAcuerdo() {
    console.log('Acuerdo de pago generado 🧾🚀');
    // Aquí puedes agregar lógica para mostrar un modal, navegar, etc.
  }
}
