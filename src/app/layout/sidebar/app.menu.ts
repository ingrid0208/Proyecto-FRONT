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
              <a [routerLink]="item.routerLink" class="menu-link" [class.disabled]="item.disabled">
                <i *ngIf="item.icon" [class]="item.icon" class="menu-icon"></i>
                <span class="menu-label">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ng-container>
    </ul>
  `,
  styles: [`
    .layout-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu-section {
      margin-bottom: 0.5rem;
      border-radius: 8px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.05);
    }

    .menu-section.expanded {
      background: rgba(255, 255, 255, 0.08);
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.1);
    }

    .section-header:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    .section-icon {
      margin-right: 0.5rem;
      font-size: 1.1rem;
    }

    .section-label {
      flex: 1;
    }

    .toggle-icon {
      font-size: 0.8rem;
      transition: transform 0.3s ease;
      margin-left: auto;
    }

    .toggle-icon.rotated {
      transform: rotate(180deg);
    }

    .submenu {
      list-style: none;
      padding: 0.5rem 0;
      margin: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .menu-item {
      margin-bottom: 0.2rem;
    }

    .menu-link {
      display: flex;
      align-items: center;
      padding: 0.6rem 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: 0;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      border-left: 3px solid transparent;
    }

    .menu-link:hover:not(.disabled) {
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-left: 3px solid rgba(255, 255, 255, 0.5);
      padding-left: 1.4rem;
    }

    .menu-link.disabled {
      color: #666;
      cursor: not-allowed;
    }

    .menu-icon {
      margin-right: 0.75rem;
      font-size: 1rem;
      opacity: 0.8;
    }

    .menu-label {
      font-weight: 400;
    }

    /* Estilos para el logo */
    .menu-logo {
      text-align: center;
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1rem;
    }

    .menu-logo img {
      max-width: 120px;
      height: auto;
      transition: transform 0.3s ease;
    }

    .menu-logo img:hover {
      transform: scale(1.05);
    }
  `]
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


