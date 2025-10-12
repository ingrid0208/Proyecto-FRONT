import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LayoutService } from '../services/layout.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AuthService } from '../../core/services/auth/auth.service';
import { ProfileService } from '../../core/services/profile/profile.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [CommonModule, FormsModule, OverlayPanelModule]
})
export class AppTopbar implements OnInit, OnDestroy {
  @ViewChild('op') overlayPanel: any;

  searchTerm = '';
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  @Output() search = new EventEmitter<string>();

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.subscription = this.searchSubject.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(term => this.search.emit(term));
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm.trim());
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
    this.overlayPanel?.hide();
  }

  openSettings() {
    alert('Configuración próximamente');
    this.overlayPanel?.hide();
  }

  logout() {
    this.authService.logouts().subscribe({
      next: () => {
        this.profileService.clearProfile();
        this.overlayPanel?.hide();
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        this.overlayPanel?.hide();
      }
    });
  }
}
