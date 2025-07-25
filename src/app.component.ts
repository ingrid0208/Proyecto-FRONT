import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContenidoInicioComponent } from './app/components/contenido-inicio/contenido-inicio.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ContenidoInicioComponent],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
