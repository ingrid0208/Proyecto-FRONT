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
  background: #2d8659;
  z-index: 999;
  transition: transform 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
}

.layout-overlay .layout-sidebar,
.layout-static-inactive .layout-sidebar {
  transform: translateX(-100%);
}

.layout-overlay-active .layout-sidebar,
.layout-mobile-active .layout-sidebar,
.layout-static .layout-sidebar {
  transform: translateX(0);
}

@media (max-width: 991px) {
  .layout-sidebar {
    transform: translateX(-100%);
  }
  
  .layout-overlay-active .layout-sidebar,
  .layout-mobile-active .layout-sidebar {
    transform: translateX(0);
  }
}`]
})
export class AppSidebar {
    constructor(public el: ElementRef) {}
}
