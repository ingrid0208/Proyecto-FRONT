import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';


@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
  <div class="menu-logo">
    <img src="../../../assets/demo/logo.png" alt="Logo" />
  </div>

  <ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul>
`,
    styles: [`
        .menu-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
}

.menu-logo img {
  width: 150px;
  height: auto;
  max-width: 100%;
}

.layout-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-separator {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5rem 1rem;
}`]
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Gestión',
                items: [
                    { label: 'Generar Multa', icon: 'pi pi-fw pi-file-edit', routerLink: ['/inspectora/generar-multa'] }
                ]
            },
            {
                label: 'Inicio',
                items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/consultar-ingresar/consultar-ingresar'] }]
            },
            {
                label: 'Contenido',
                items: [
                    { label: 'Tipo De Multas', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/TipoMultas'] },
                    { label: 'Notificacion de Multas', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/NotificacionMultas'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                ]
            },
            {
                label: 'Perfil',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                ]
            },
            {
                label: 'Modulo de parametro',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'parametro',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Departamentos',
                                routerLink: ['/parameters/department']
                            },
                            {
                                label: 'Tipo de documento',
                                routerLink: ['/parameters/document-type']
                            },
                            {
                                label: 'Municipios',
                                routerLink: ['/parameters/municipality']
                            },
                            {
                                label: 'Frecuencia de pago',
                                routerLink: ['/parameters/payment-frequency']
                            }
                        ]
                    },
                ]
            }
        ];
    }

}
