import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, UserProfile } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  adminData: UserProfile | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUserProfile() {
    this.loading = true;
    this.authService.getCurrentUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profile) => {
          this.adminData = profile;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading user profile:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al cargar el perfil del usuario'
          });
          this.loading = false;
        }
      });
  }


  // Método para obtener las iniciales del usuario
  getUserInitials(): string {
    if (!this.adminData) return 'U';
    return `${this.adminData.nombre.charAt(0)}${this.adminData.apellido.charAt(0)}`.toUpperCase();
  }

}