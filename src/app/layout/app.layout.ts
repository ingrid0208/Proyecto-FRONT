// src/app/layout/shell/app.layout.ts  ← mantienes el nombre de archivo que ya tienes
import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

                // ← ojo al nombre del archivo
import { LayoutService } from './services/layout.service';
import { AppTopbar } from './header/topbar.component';
import { AppSidebar } from './sidebar/app.sidebar';
                     // ← topbar dentro de layout/nav

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AppSidebar],               // ← se importa y se USA
  template: `
  <div class="layout-wrapper" [ngClass]="containerClass">
    <!-- Hamburger Menu Button -->
    <button
      class="hamburger-menu-btn"
      (click)="toggleMenu()"
      [class.active]="isMenuOpen"
      aria-label="Toggle navigation menu"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <app-sidebar></app-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-outlet></router-outlet>
      </div>
    </div>

    <div
      class="layout-mask animate-fadein"
      *ngIf="layoutService.layoutState().overlayMenuActive || layoutService.layoutState().staticMenuMobileActive"
      (click)="hideMenu()"
    ></div>
  </div>
  `,
  styles: [`
    :host { display:block; height:100vh; width:100vw; overflow:hidden; }
    .layout-wrapper { display:flex; height:100vh; width:100vw; position:relative; overflow:hidden; }
    .layout-main-container { flex:1; display:flex; flex-direction:column; height:100vh; overflow:hidden; margin-left:0; transition: margin-left .3s ease; }
    .layout-main-container app-topbar { flex-shrink:0; z-index:997; }
    .layout-main { flex:1; background:#f3f4f6; overflow-y:auto; overflow-x:hidden; padding:0; }
    .layout-mask { position:fixed; inset:0; background:rgba(0,0,0,.4); z-index:998; display:none; }
    .layout-static .layout-main-container { margin-left:300px; }
    .layout-static-inactive .layout-main-container { margin-left:0; }
    .layout-overlay .layout-main-container { margin-left:0; }
    .layout-overlay-active .layout-mask, .layout-mobile-active .layout-mask { display:block; }

    /* Hamburger Menu Button */
    .hamburger-menu-btn {
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 1001;
      width: 50px;
      height: 50px;
      background: #2d8659;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .hamburger-menu-btn:hover {
      background: #245a47;
      transform: scale(1.05);
    }

    .hamburger-line {
      width: 24px;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    .hamburger-menu-btn.active .hamburger-line:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }

    .hamburger-menu-btn.active .hamburger-line:nth-child(2) {
      opacity: 0;
      transform: scale(0);
    }

    .hamburger-menu-btn.active .hamburger-line:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }

    /* Hide hamburger on desktop */
    @media (min-width: 992px) {
      .hamburger-menu-btn {
        display: none;
      }
    }

    @media (max-width: 991px) {
      .layout-static .layout-main-container,
      .layout-static-inactive .layout-main-container { margin-left:0; }

      .layout-main {
        padding-top: 4rem; /* Space for hamburger button */
      }
    }

    .animate-fadein { animation: fadein .15s; }
    @keyframes fadein { from{opacity:0} to{opacity:1} }
  `]
})
export class AppLayout {
  overlayMenuOpenSubscription: Subscription;
  menuOutsideClickListener: any;
  isMenuOpen = false;

  @ViewChild(AppSidebar) appSidebar!: AppSidebar;
  @ViewChild(AppTopbar)  appTopBar!: AppTopbar;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router
  ) {
    this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
      if (!this.menuOutsideClickListener) {
        this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
          if (this.isOutsideClicked(event)) this.hideMenu();
        });
      }
      if (this.layoutService.layoutState().staticMenuMobileActive) this.blockBodyScroll();
    });

    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.hideMenu());
  }

  isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl  = document.querySelector('.layout-menu-button');
    const t = event.target as Node;
    return !(sidebarEl?.isSameNode(t) || sidebarEl?.contains(t) || topbarEl?.isSameNode(t) || topbarEl?.contains(t));
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.layoutService.updateState({
        overlayMenuActive: false,
        staticMenuMobileActive: true,
        menuHoverActive: false
      });
      this.blockBodyScroll();
    } else {
      this.hideMenu();
    }
  }

  hideMenu() {
    this.isMenuOpen = false;
    this.layoutService.updateState({
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false
    });
    if (this.menuOutsideClickListener) { this.menuOutsideClickListener(); this.menuOutsideClickListener = null; }
    this.unblockBodyScroll();
  }

  blockBodyScroll() {
    if (document.body.classList) document.body.classList.add('blocked-scroll');
    else document.body.className += ' blocked-scroll';
  }

  unblockBodyScroll() {
    if (document.body.classList) document.body.classList.remove('blocked-scroll');
    else document.body.className = document.body.className.replace(/(^|\\b)blocked-scroll(\\b|$)/gi, ' ');
  }

  get containerClass() {
    return {
      'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
      'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
      'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive
                               && this.layoutService.layoutConfig().menuMode === 'static',
      'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
      'layout-mobile-active':  this.layoutService.layoutState().staticMenuMobileActive
    };
  }

  ngOnDestroy() {
    this.overlayMenuOpenSubscription?.unsubscribe();
    if (this.menuOutsideClickListener) this.menuOutsideClickListener();
  }
}
