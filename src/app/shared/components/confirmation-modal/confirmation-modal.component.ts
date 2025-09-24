import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmationModalConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'delete' | 'update' | 'warning' | 'info';
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="modal-overlay" (click)="onCancel()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header" [ngClass]="getHeaderClass()">
          <div class="modal-icon">
            <i class="pi" [ngClass]="getIconClass()"></i>
          </div>
          <h3>{{ config.title }}</h3>
        </div>

        <div class="modal-body">
          <p>{{ config.message }}</p>
        </div>

        <div class="modal-actions">
          <button class="btn-secondary" (click)="onCancel()">
            {{ config.cancelText || 'Cancelar' }}
          </button>
          <button class="btn-primary" [ngClass]="getButtonClass()" (click)="onConfirm()">
            {{ config.confirmText || 'Confirmar' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 400px;
      margin: 1rem;
      overflow: hidden;
      animation: modalSlideIn 0.3s ease-out;
    }

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .modal-header {
      padding: 2rem 2rem 1rem;
      text-align: center;
      border-bottom: 1px solid #e5e7eb;
    }

    .modal-header.delete {
      background: linear-gradient(135deg, #fee2e2, #fef2f2);
      border-bottom-color: #fecaca;
    }

    .modal-header.update {
      background: linear-gradient(135deg, #dbeafe, #eff6ff);
      border-bottom-color: #bfdbfe;
    }

    .modal-header.warning {
      background: linear-gradient(135deg, #fef3c7, #fffbeb);
      border-bottom-color: #fde68a;
    }

    .modal-header.info {
      background: linear-gradient(135deg, #e0f2fe, #f0f9ff);
      border-bottom-color: #b3e5fc;
    }

    .modal-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 1rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .modal-header.delete .modal-icon {
      background: #fee2e2;
      color: #dc2626;
    }

    .modal-header.update .modal-icon {
      background: #dbeafe;
      color: #2563eb;
    }

    .modal-header.warning .modal-icon {
      background: #fef3c7;
      color: #d97706;
    }

    .modal-header.info .modal-icon {
      background: #e0f2fe;
      color: #0891b2;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .modal-body {
      padding: 1.5rem 2rem;
      text-align: center;
    }

    .modal-body p {
      margin: 0;
      color: #6b7280;
      line-height: 1.6;
    }

    .modal-actions {
      padding: 1.5rem 2rem 2rem;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }

    .btn-secondary, .btn-primary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 100px;
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
      border-color: #9ca3af;
    }

    .btn-primary {
      color: white;
    }

    .btn-primary.delete {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
    }

    .btn-primary.delete:hover {
      background: linear-gradient(135deg, #b91c1c, #991b1b);
    }

    .btn-primary.update {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
    }

    .btn-primary.update:hover {
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
    }

    .btn-primary.warning {
      background: linear-gradient(135deg, #d97706, #b45309);
    }

    .btn-primary.warning:hover {
      background: linear-gradient(135deg, #b45309, #92400e);
    }

    .btn-primary.info {
      background: linear-gradient(135deg, #0891b2, #0e7490);
    }

    .btn-primary.info:hover {
      background: linear-gradient(135deg, #0e7490, #155e75);
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() show: boolean = false;
  @Input() config: ConfirmationModalConfig = {
    title: 'Confirmación',
    message: '¿Está seguro de realizar esta acción?',
    type: 'info'
  };

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
  }

  onCancel() {
    this.cancelled.emit();
  }

  getHeaderClass(): string {
    return this.config.type || 'info';
  }

  getIconClass(): string {
    const iconMap = {
      delete: 'pi-trash',
      update: 'pi-pencil',
      warning: 'pi-exclamation-triangle',
      info: 'pi-info-circle'
    };
    return iconMap[this.config.type || 'info'];
  }

  getButtonClass(): string {
    return this.config.type || 'info';
  }
}