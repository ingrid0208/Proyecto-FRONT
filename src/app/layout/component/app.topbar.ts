import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, OverlayPanelModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <span>Control de Comparendo</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
    <div class="layout-topbar-menu-content">

        <button type="button" class="layout-topbar-action" [routerLink]="['/calendar']">
            <i class="pi pi-calendar"></i>
            <span>Calendar</span>
        </button>

        <button type="button" class="layout-topbar-action" [routerLink]="['/messages']">
            <i class="pi pi-inbox"></i>
            <span>Messages</span>
        </button>

 <!-- En la topbar -->
<p-overlayPanel #op [showCloseIcon]="true">
  <ul class="profile-menu">
    <li (click)="goToProfile()">
      <i class="pi pi-user"></i> Ver Perfil
    </li>
    <li (click)="openSettings()">
      <i class="pi pi-cog"></i> Configuración
    </li>
    <li (click)="logout()">
      <i class="pi pi-sign-out"></i> Cerrar Sesión
    </li>
  </ul>
</p-overlayPanel>

<button type="button" class="layout-topbar-action" (click)="op.toggle($event)">
  <i class="pi pi-user"></i>
  <span>Profile</span>
</button>



    </div>
</div>

        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService
        , private router: Router
    ) {}


    // 👇 Métodos que estás usando en el HTML
    goToProfile() {
        this.router.navigate(['/profile']);
    }

    openSettings() {
        alert('Aquí iría configuración');
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
