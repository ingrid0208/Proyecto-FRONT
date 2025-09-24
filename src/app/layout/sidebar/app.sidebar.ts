import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu],
    template: ` <div class="layout-sidebar">
        <app-menu></app-menu>
    </div>`,
    styles: [`
        .layout-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 300px;
  background: linear-gradient(180deg, #2d8659 0%, #245a47 100%);
  color: #ffffff;
  z-index: 1000;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.layout-sidebar::-webkit-scrollbar {
  width: 6px;
}

.layout-sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.layout-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.layout-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.layout-sidebar * {
  color: #ffffff !important;
}

.layout-sidebar .layout-menu a {
  color: #ffffff !important;
  transition: all 0.3s ease;
}

.layout-sidebar .layout-menu a:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 8px;
}

.layout-sidebar .layout-menuitem-root-text {
  color: #ffffff !important;
}

.layout-sidebar .layout-menuitem-icon {
  color: #ffffff !important;
}

.layout-sidebar .layout-menuitem-text {
  color: #ffffff !important;
}

.layout-sidebar .layout-submenu-toggler {
  color: #ffffff !important;
}

/* Default state - hidden on mobile */
.layout-overlay .layout-sidebar,
.layout-static-inactive .layout-sidebar {
  transform: translateX(-100%);
}

/* Active states */
.layout-overlay-active .layout-sidebar,
.layout-mobile-active .layout-sidebar,
.layout-static .layout-sidebar {
  transform: translateX(0);
}

/* Mobile responsive */
@media (max-width: 991px) {
  .layout-sidebar {
    transform: translateX(-100%);
    width: 280px;
    box-shadow: 8px 0 32px rgba(0, 0, 0, 0.2);
  }

  .layout-overlay-active .layout-sidebar,
  .layout-mobile-active .layout-sidebar {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .layout-sidebar {
    width: 260px;
  }
}

@media (max-width: 480px) {
  .layout-sidebar {
    width: 240px;
  }
}

/* Desktop mode */
@media (min-width: 992px) {
  .layout-sidebar {
    transform: translateX(0);
    position: relative;
    box-shadow: none;
  }
}`]
})
export class AppSidebar {
    constructor(public el: ElementRef) {}
}
