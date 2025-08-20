import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type Align = 'left' | 'center' | 'right';

@Component({
  selector: 'app-card-header',         
  standalone: true,
  imports: [CommonModule],            
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {     
  @Input() title = '';
  @Input() description = '';
}
