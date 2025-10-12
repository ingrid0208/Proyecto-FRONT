import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { mapBackendMenuToPrimeNG } from '../../core/services/utils/menu-mapper';
import { AuthService } from '../../core/services/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./styles/app.menu.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('250ms ease-in', style({ height: '0px', opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div class="menu-logo">
      <img src="../../../assets/demo/logo.png" alt="Logo" />
    </div>

    <ul class="layout-menu">
      <ng-container *ngFor="let section of model; let i = index">
        <li class="menu-section" [class.expanded]="expandedSections[i]">
          <div class="section-header" (click)="toggleSection(i)">
            <i *ngIf="section.icon" [class]="section.icon" class="section-icon"></i>
            <span class="section-label">{{ section.label }}</span>
            <i class="pi pi-chevron-down toggle-icon" 
               [class.rotated]="expandedSections[i]"></i>
          </div>
          <ul class="submenu" 
              *ngIf="section.items && expandedSections[i]"
              [@slideDown]>
            <li *ngFor="let item of section.items" class="menu-item">
              <a [routerLink]="item.routerLink" 
                 class="menu-link" 
                 [class.disabled]="item.disabled"
                 routerLinkActive="active-route"
                 [routerLinkActiveOptions]="{exact: false}">
                <i *ngIf="item.icon" [class]="item.icon" class="menu-icon"></i>
                <span class="menu-label">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ng-container>
    </ul>
  `
})
export class AppMenu {
  public model: MenuItem[] = [];
  public expandedSections: boolean[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.GetMe().subscribe((user: any) => {
      console.log("✅ Usuario cargado en sidebar:", user);
      this.model = mapBackendMenuToPrimeNG(user.menu);
      // Inicializar el estado de expansión (primera sección expandida por defecto)
      this.expandedSections = this.model.map((_, index) => index === 0);
    });
  }

  toggleSection(index: number) {
    this.expandedSections[index] = !this.expandedSections[index];
  }
}


