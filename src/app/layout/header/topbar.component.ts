import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LayoutService } from '../../core/services/layout.service';
import { AuthService, UserProfile } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [CommonModule, FormsModule, OverlayPanelModule]
})

export class AppTopbar implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  searchTerm = '';
  isSearchHidden = true;
  currentUser: UserProfile | null = null;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios del usuario actual
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Cargar perfil del usuario si no está cargado
    if (!this.currentUser) {
      this.authService.getCurrentUserProfile()
        .pipe(takeUntil(this.destroy$))
        .subscribe(profile => {
          this.currentUser = profile;
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Obtener nombre completo del usuario
  getUserFullName(): string {
    if (!this.currentUser) return 'Usuario';
    return `${this.currentUser.nombre} ${this.currentUser.apellido}`;
  }

  // Obtener iniciales del usuario para el avatar
  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    return `${this.currentUser.nombre.charAt(0)}${this.currentUser.apellido.charAt(0)}`.toUpperCase();
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Buscando:', this.searchTerm);
    }
  }

  toggleSearch() {
    this.isSearchHidden = !this.isSearchHidden;
  }

  goToProfile() {
    console.log('Navegando a mi-perfil desde topbar...');
    this.router.navigate(['/mi-perfil']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
