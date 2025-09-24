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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-logo img {
  width: 150px;
  height: auto;
  max-width: 100%;
  filter: brightness(1.1);
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
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin: 0.25rem 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.layout-menu a:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.layout-menu a.router-link-active {
  background: rgba(255, 255, 255, 0.2) !important;
  border-left: 4px solid #ffffff;
  font-weight: 600;
}

.layout-menu .layout-menuitem-root-text {
  color: #ffffff !important;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1rem 1rem 0.5rem;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.layout-menuitem-root-text:first-child {
  margin-top: 0;
}

.layout-menu .layout-menuitem-icon {
  color: #ffffff !important;
  margin-right: 0.75rem;
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.layout-menu .layout-menuitem-text {
  color: #ffffff !important;
  flex: 1;
}

.layout-menu .layout-submenu-toggler {
  color: #ffffff !important;
}

.menu-separator {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  margin: 0.75rem 1rem;
}

/* Logout item special styling */
.layout-menu .logout-item {
  background: rgba(220, 38, 38, 0.1) !important;
  border: 1px solid rgba(220, 38, 38, 0.3);
  margin-top: 1rem;
}

.layout-menu .logout-item:hover {
  background: rgba(220, 38, 38, 0.2) !important;
  border-color: rgba(220, 38, 38, 0.5);
}

/* Mobile responsive menu items */
@media (max-width: 768px) {
  .menu-logo {
    padding: 1rem 0.75rem;
  }

  .menu-logo img {
    width: 120px;
  }

  .layout-menu a {
    padding: 0.875rem 0.75rem;
    font-size: 0.9rem;
    margin: 0.2rem 0.4rem;
  }

  .layout-menu .layout-menuitem-root-text {
    padding: 0.75rem 0.75rem 0.4rem;
    font-size: 0.8rem;
  }

  .layout-menu .layout-menuitem-icon {
    margin-right: 0.6rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .menu-logo {
    padding: 0.75rem 0.5rem;
  }

  .menu-logo img {
    width: 100px;
  }

  .layout-menu a {
    padding: 1rem 0.5rem;
    font-size: 0.85rem;
    margin: 0.15rem 0.3rem;
  }

  .layout-menu .layout-menuitem-root-text {
    padding: 0.5rem 0.5rem 0.3rem;
    font-size: 0.75rem;
  }

  .layout-menu .layout-menuitem-icon {
    margin-right: 0.5rem;
    font-size: 0.9rem;
  }
}

/* Touch-friendly improvements */
@media (hover: none) and (pointer: coarse) {
  .layout-menu a {
    min-height: 48px;
    display: flex;
    align-items: center;
  }

  .layout-menu a:hover {
    transform: none;
    background: rgba(255, 255, 255, 0.1) !important;
  }
}`]
})
export class AppMenu {
    public model: MenuItem[] = [];
    ngOnInit() {
        this.model = [
            {
                label: '🏠 Navegación Principal',
                items: [
                    {
                        label: 'Inicio',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/consultar-ingresar/consultar-ingresar'],
                        title: 'Ir a la página principal'
                    }
                ]
            },
            { separator: true },
            {
                label: '📋 Gestión de Multas',
                items: [
                    {
                        label: 'Tipo De Multas',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/uikit/TipoMultas'],
                        title: 'Gestionar tipos de multas'
                    },
                    {
                        label: 'Notificación de Multas',
                        icon: 'pi pi-fw pi-bell',
                        routerLink: ['/uikit/NotificacionMultas'],
                        title: 'Ver notificaciones de multas'
                    },
                    {
                        label: 'Anexar Multas',
                        icon: 'pi pi-fw pi-paperclip',
                        routerLink: ['/anexar-multas/multas'],
                        title: 'Anexar documentos a multas'
                    }
                ]
            },
            { separator: true },
            {
                label: '⚙️ Administración',
                items: [
                    {
                        label: 'Formularios',
                        icon: 'pi pi-fw pi-file-edit',
                        routerLink: ['/formularios'],
                        title: 'Gestionar formularios'
                    },
                    {
                        label: 'Módulos',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['/modulos'],
                        title: 'Configurar módulos del sistema'
                    },
                    {
                        label: 'Personas',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/personas'],
                        title: 'Gestión de personas'
                    },
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/usuarios'],
                        title: 'Administrar usuarios'
                    }
                ]
            },
            { separator: true },
            {
                label: '🔐 Seguridad',
                items: [
                    {
                        label: 'Roles',
                        icon: 'pi pi-fw pi-shield',
                        routerLink: ['/roles'],
                        title: 'Gestionar roles de usuario'
                    },
                    {
                        label: 'Permisos',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['/permisos'],
                        title: 'Configurar permisos'
                    },
                    {
                        label: 'Rol-Usuario',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/rol-user'],
                        title: 'Asignar roles a usuarios'
                    }
                ]
            },
            { separator: true },
            {
                label: '📊 Parámetros',
                items: [
                    {
                        label: 'Departamentos',
                        icon: 'pi pi-fw pi-map-marker',
                        routerLink: ['/parameters/department'],
                        title: 'Gestionar departamentos'
                    },
                    {
                        label: 'Municipios',
                        icon: 'pi pi-fw pi-map',
                        routerLink: ['/parameters/municipality'],
                        title: 'Gestionar municipios'
                    },
                    {
                        label: 'Tipos de Documento',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/parameters/document-type'],
                        title: 'Configurar tipos de documento'
                    },
                    {
                        label: 'Frecuencia de Pago',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/parameters/payment-frequency'],
                        title: 'Configurar frecuencias de pago'
                    }
                ]
            },
            { separator: true },
            {
                label: '👤 Perfil',
                items: [
                    {
                        label: 'Mi Perfil',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/profile'],
                        title: 'Ver mi perfil'
                    },
                    {
                        label: 'Configuración',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/settings'],
                        title: 'Configuraciones de la cuenta'
                    },
                    { separator: true },
                    {
                        label: 'Cerrar Sesión',
                        icon: 'pi pi-fw pi-sign-out',
                        routerLink: ['/auth/login'],
                        title: 'Salir del sistema',
                        styleClass: 'logout-item'
                    }
                ]
            }
        ];
    }

}
