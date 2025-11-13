/**
 * @fileoverview badge component
 * @see {@link ./badge.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() variant: string = 'primary';
  @Input() size: string = 'medium';
  @Input() dot: boolean = false;
  @Input() outline: boolean = false;
  @Input() pulse: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() text: string = '';
  @Input() count: number = 0;
  @Input() maxCount: number = 99;
  @Input() icon: string = '';
  @Input() closable: boolean = false;
  @Output() close = new EventEmitter<void>();

  getIconPath(): string {
    return 'M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z';
  }

  onClose() {
    this.close.emit();
  }
}
