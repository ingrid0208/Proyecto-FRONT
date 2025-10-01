import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { ServiceGenericService } from '../../core/services/utils/generic/service-generic.service';
import { mapBackendMenuToPrimeNG } from '../../core/Utils/menu-mapper';


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
  `
})
export class AppMenu {
  public model: MenuItem[] = [];

  constructor(private api: ServiceGenericService) {}

ngOnInit() {
  this.api.GetMe().subscribe(user => {
    console.log("✅ Usuario cargado en sidebar:", user);
    this.model = mapBackendMenuToPrimeNG(user.menu);
  });
}
}


