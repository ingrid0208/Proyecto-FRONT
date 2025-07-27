// 1. app.layout.ts - REEMPLAZAR COMPLETAMENTE
import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppSidebar } from './app.sidebar';
import { LayoutService } from '../service/layout.service';
import { AppTopbar } from '../../components/topbar/topbar.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppSidebar, RouterModule, AppTopbar], // ← AGREGAR AppTopbar aquí
    template: `
    <div class="layout-wrapper" [ngClass]="containerClass">
        <app-sidebar></app-sidebar>
        <div class="layout-main-container">
            <app-topbar></app-topbar> <!-- ← AGREGAR esta línea -->
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
        </div>
        <div class="layout-mask animate-fadein" 
             *ngIf="layoutService.layoutState().overlayMenuActive || layoutService.layoutState().staticMenuMobileActive"
             (click)="hideMenu()">
        </div>
    </div>`,
    styles: [`
        :host {
            display: block;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }

        .layout-wrapper {
            display: flex;
            height: 100vh;
            width: 100vw;
            position: relative;
            overflow: hidden;
        }

        .layout-main-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
            margin-left: 0;
            transition: margin-left 0.3s ease;
        }

        .layout-main-container app-topbar {
            flex-shrink: 0;
            z-index: 997;
        }

        .layout-main {
            flex: 1;
            background: #f3f4f6;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 0;
        }

        .layout-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            z-index: 998;
            display: none;
        }

        .layout-static .layout-main-container {
            margin-left: 300px;
        }

        .layout-static-inactive .layout-main-container {
            margin-left: 0;
        }

        .layout-overlay .layout-main-container {
            margin-left: 0;
        }

        .layout-overlay-active .layout-mask,
        .layout-mobile-active .layout-mask {
            display: block;
        }

        @media (max-width: 991px) {
            .layout-static .layout-main-container,
            .layout-static-inactive .layout-main-container {
                margin-left: 0;
            }
        }

        .animate-fadein {
            animation: fadein 0.15s;
        }

        @keyframes fadein {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `]
})
export class AppLayout {
    // ← MANTENER TODO EL RESTO DEL CÓDIGO IGUAL
    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;

    @ViewChild(AppSidebar) appSidebar!: AppSidebar;
    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}