/**
 * @fileoverview button component
 * @see {@link ./button.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = 'Click me';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() icon: string = '';
  @Input() loading: boolean = false;
  
  @Output() clicked = new EventEmitter<void>();
  @Output() doubleClicked = new EventEmitter<MouseEvent>();

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

  onDoubleClick(event: MouseEvent) {
    this.doubleClicked.emit(event);
  }
}
