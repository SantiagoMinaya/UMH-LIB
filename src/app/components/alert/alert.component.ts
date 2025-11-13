/**
 * @fileoverview alert component
 * @see {@link ./alert.md} Documentación completa
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {

@Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
@Input() title: string = '';
@Input() message: string = '';
@Input() dismissible: boolean = true;
@Input() autoClose: boolean = false;
@Input() duration: number = 5000;
@Input() showIcon: boolean = true;

@Output() closed = new EventEmitter<void>();
@Output() dismissed = new EventEmitter<void>();
@Output() actionClicked = new EventEmitter<string>();

onClose() {
  this.closed.emit();
}

onDismiss() {
  this.dismissed.emit();
}

onActionClick(action: string) {
  this.actionClicked.emit(action);
}

}
