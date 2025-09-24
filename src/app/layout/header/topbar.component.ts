import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'], 
  imports: [CommonModule, FormsModule, OverlayPanelModule]
})

export class AppTopbar {
  searchTerm = '';
  isSearchHidden = true;

  constructor(
    public layoutService: LayoutService,
    private router: Router
  ) {}

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Buscando:', this.searchTerm);
    }
  }

  toggleSearch() {
    this.isSearchHidden = !this.isSearchHidden;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
