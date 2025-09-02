import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

type Align = 'left' | 'center' | 'right';

@Component({
  selector: 'app-card-header',         
  standalone: true,
  imports: [CommonModule, MatIcon],            
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {     
  @Input() title = '';
  @Input() description = '';
  @Input() showBack = false;              // 👈 flecha opcional
  @Output() back = new EventEmitter<void>(); // 👈 evento

  onBack() {
    this.back.emit();
  }
  
}
