import { Component } from "@angular/core";
import { ContenidoInicioComponent } from "../../components/contenido-inicio/contenido-inicio.component";
import { AppTopbar } from "../../components/topbar/topbar.component";
// ← QUITAR la importación de AppTopbar

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ContenidoInicioComponent, AppTopbar
  ],
  template: `
    <div class="dashboard-container">
      <app-contenido-inicio/>
      <<!-- ← QUITAR <app-topbar /> de aquí -->>
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
export class Dashboard {}
