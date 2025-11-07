import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card" [ngClass]="colorClass">
      <div class="stat-card-header">
        <i [class]="icon"></i>
      </div>
      <div class="stat-card-body">
        <h3 class="stat-value">{{ value | number }}</h3>
        <p class="stat-label">{{ label }}</p>
        <div class="stat-trend" *ngIf="trend">
          <i [class]="trend > 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'"></i>
          <span>{{ trend > 0 ? '+' : '' }}{{ trend }}%</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-left: 4px solid;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .stat-card.primary {
      border-color: #3B82F6;
    }

    .stat-card.success {
      border-color: #10B981;
    }

    .stat-card.warning {
      border-color: #F59E0B;
    }

    .stat-card.danger {
      border-color: #EF4444;
    }

    .stat-card.info {
      border-color: #06B6D4;
    }

    .stat-card.green-light {
      border-color: #86EFAC;
    }

    .stat-card.green-medium {
      border-color: #34D399;
    }

    .stat-card.green-dark {
      border-color: #10B981;
    }

    .stat-card.green-darker {
      border-color: #059669;
    }

    .stat-card-header i {
      font-size: 2rem;
      opacity: 0.8;
    }

    .stat-card.primary .stat-card-header i {
      color: #3B82F6;
    }

    .stat-card.success .stat-card-header i {
      color: #10B981;
    }

    .stat-card.warning .stat-card-header i {
      color: #F59E0B;
    }

    .stat-card.danger .stat-card-header i {
      color: #EF4444;
    }

    .stat-card.info .stat-card-header i {
      color: #06B6D4;
    }

    .stat-card.green-light .stat-card-header i {
      color: #86EFAC;
    }

    .stat-card.green-medium .stat-card-header i {
      color: #34D399;
    }

    .stat-card.green-dark .stat-card-header i {
      color: #10B981;
    }

    .stat-card.green-darker .stat-card-header i {
      color: #059669;
    }

    .stat-card-body {
      margin-top: 1rem;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      color: #1F2937;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6B7280;
      margin: 0.5rem 0 0 0;
      font-weight: 500;
    }

    .stat-trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .stat-trend i {
      font-size: 0.75rem;
    }

    .stat-trend i.pi-arrow-up {
      color: #10B981;
    }

    .stat-trend i.pi-arrow-down {
      color: #EF4444;
    }

    .stat-trend span {
      color: #6B7280;
    }
  `]
})
export class StatCardComponent {
  @Input() icon: string = 'pi pi-chart-bar';
  @Input() value: number = 0;
  @Input() label: string = '';
  @Input() colorClass: string = 'primary';
  @Input() trend?: number;
}
