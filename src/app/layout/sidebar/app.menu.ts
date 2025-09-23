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
  color: #ffffff;
}

.layout-menu * {
  color: #ffffff !important;
}

.layout-menu a {
  color: #ffffff !important;
}

.layout-menu .layout-menuitem-root-text {
  color: #ffffff !important;
}

.layout-menu .layout-menuitem-icon {
  color: #ffffff !important;
}

.layout-menu .layout-menuitem-text {
  color: #ffffff !important;
}

.layout-menu .layout-submenu-toggler {
  color: #ffffff !important;
}

.menu-separator {
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0.5rem 1rem;
}`]
})
export class AppMenu {
    public model: MenuItem[] = [];
    ngOnInit() {
        this.model = [
      {
        items: [
      // La ruta de generar multa está comentada en app.routes.ts; mantener el ítem deshabilitado evita enlaces rotos
      // { label: 'Generar Multa', icon: 'pi pi-fw pi-file-edit', routerLink: ['/inspectora/generar-multa'] }
        ]
      },
            {
                label: 'Inicio',
                items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/consultar-ingresar'] }]
            },
            {
                label: 'Contenido',
        items: [
          { label: 'Tipo De Multas', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/tipomultas'] },
          { label: 'Notificacion de Multas', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/notificacionmultas'] },
          { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
          { label: 'Anexar multas', icon: 'pi pi-fw pi-check-square', routerLink: ['/anexar-multas/multas'] },
          
        ]
            },
            {
                label: 'Gestión Avanzada',
                icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'Formularios', icon: 'pi pi-fw pi-file', routerLink: ['/formularios'] },
                    { label: 'Form Modules', icon: 'pi pi-fw pi-clone', routerLink: ['/form-modules'] },
                    { label: 'Módulos', icon: 'pi pi-fw pi-th-large', routerLink: ['/modulos'] },
                    { label: 'Personas', icon: 'pi pi-fw pi-users', routerLink: ['/personas'] },
                    { label: 'Permisos', icon: 'pi pi-fw pi-lock-open', routerLink: ['/permisos'] },
                    { label: 'Rol Form Permission', icon: 'pi pi-fw pi-key', routerLink: ['/rol-form-permission'] },
                    { label: 'Roles', icon: 'pi pi-fw pi-users', routerLink: ['/roles'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/usuarios'] },
                    { label: 'Rol-Usuario', icon: 'pi pi-fw pi-user-plus', routerLink: ['/rol-user'] }
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
