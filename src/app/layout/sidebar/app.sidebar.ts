import { Component, ElementRef, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMenu } from './app.menu';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu, CommonModule],
    template: ` <div class="layout-sidebar" [ngClass]="sidebarClass">
        <app-menu></app-menu>
    </div>`,
    styles: []
})
export class AppSidebar implements OnInit, OnDestroy {
    private stateSubscription?: Subscription;
    public isVisible = false;

    constructor(
        public el: ElementRef,
        public layoutService: LayoutService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        // Suscribirse a cambios de estado
        this.stateSubscription = this.layoutService.state$.subscribe(state => {
            const isDesktop = window.innerWidth > 991;
            const newVisibility = isDesktop ? !state.staticMenuDesktopInactive : state.staticMenuMobileActive;

            console.log('Sidebar recibió cambio de estado:', state);
            console.log('Es desktop:', isDesktop);
            console.log('Visibilidad anterior:', this.isVisible);
            console.log('Nueva visibilidad:', newVisibility);

            this.isVisible = newVisibility;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.stateSubscription?.unsubscribe();
    }

    get sidebarClass() {
        const state = this.layoutService.layoutState();
        const config = this.layoutService.layoutConfig();
        const isDesktop = window.innerWidth > 991;

        return {
            'sidebar-hidden': isDesktop ? state.staticMenuDesktopInactive : !state.staticMenuMobileActive,
            'sidebar-visible': isDesktop ? !state.staticMenuDesktopInactive : state.staticMenuMobileActive,
            'sidebar-overlay': config.menuMode === 'overlay',
            'sidebar-static': config.menuMode === 'static'
        };
    }
}
