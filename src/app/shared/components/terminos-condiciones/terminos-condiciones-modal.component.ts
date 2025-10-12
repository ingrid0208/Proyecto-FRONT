import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminos-condiciones-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, CheckboxModule, FormsModule],
  templateUrl: './terminos-condiciones-modal.component.html',
  styleUrls: ['./terminos-condiciones-modal.component.scss']
})
export class TerminosCondicionesModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onAcceptTerms = new EventEmitter<void>();
  @Output() onRejectTerms = new EventEmitter<void>();

  accepted = false;

  onAccept() {
    if (this.accepted) {
      this.visible = false;
      this.visibleChange.emit(false);
      this.onAcceptTerms.emit();
      this.accepted = false; // Reset para próxima vez
    }
  }

  onReject() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onRejectTerms.emit();
    this.accepted = false; // Reset
  }
}
